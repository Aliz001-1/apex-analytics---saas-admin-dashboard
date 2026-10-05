/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Calendar,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import {
  db,
  auth,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from './lib/firebase';
import { Subscription, SubscriptionStatus, NavItem } from './types/dashboard';
import { INITIAL_SUBSCRIPTIONS, REVENUE_GROWTH_DATA } from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { SubscriptionsTable } from './components/SubscriptionsTable';
import { RevenueChart } from './components/RevenueChart';
import { AddUserModal } from './components/AddUserModal';
import { ExportDropdown } from './components/ExportDropdown';
import { NotificationDrawer } from './components/NotificationDrawer';
import { OtherViews } from './components/OtherViews';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('apex_theme');
    if (saved) return saved === 'dark';
    return false; // Default light matching reference screenshot
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState<NavItem>('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Subscriptions & Dashboard Data
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<'30d' | '90d' | 'year' | 'all'>('30d');
  const [selectedMetricIndex, setSelectedMetricIndex] = useState(0);

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(1);

  // Dark mode effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('apex_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('apex_theme', 'light');
    }
  }, [isDarkMode]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Sync subscriptions from Firestore
  useEffect(() => {
    const subsPath = 'subscriptions';
    const unsub = onSnapshot(
      collection(db, subsPath),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: Subscription[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loaded.push({
              id: docSnap.id,
              customerName: data.customerName || 'Unnamed Customer',
              customerEmail: data.customerEmail,
              plan: data.plan || 'Basic',
              date: data.date || '05/13/2026',
              status: data.status || 'Active',
              amount: Number(data.amount) || 0,
              avatarUrl: data.avatarUrl,
              initials: data.initials,
              color: data.color,
            });
          });
          setSubscriptions(loaded);
        } else {
          // If Firestore is empty, keep initial data
          setSubscriptions(INITIAL_SUBSCRIPTIONS);
        }
      },
      (error) => {
        console.warn('Firestore subscription sync error (using local state):', error.message);
      }
    );

    return () => unsub();
  }, [currentUser]);

  // Handle Google Sign In
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Sign-in failed:', err);
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  // Add new subscription (Optimistic UI + Firestore)
  const handleAddSubscription = async (newSubData: Omit<Subscription, 'id'>) => {
    const tempId = `sub_${Date.now()}`;
    const newSubscription: Subscription = {
      ...newSubData,
      id: tempId,
    };

    // Optimistic state update
    setSubscriptions((prev) => [newSubscription, ...prev]);

    // Firestore persistence
    try {
      const docRef = doc(db, 'subscriptions', tempId);
      await setDoc(docRef, {
        customerName: newSubscription.customerName,
        customerEmail: newSubscription.customerEmail || '',
        plan: newSubscription.plan,
        date: newSubscription.date,
        status: newSubscription.status,
        amount: newSubscription.amount,
        initials: newSubscription.initials || '',
        color: newSubscription.color || '#0d9488',
        avatarUrl: newSubscription.avatarUrl || '',
        createdBy: currentUser?.uid || 'guest_admin',
      });
    } catch (err) {
      console.warn('Firestore write omitted or offline:', err);
    }
  };

  // Update subscription status
  const handleUpdateStatus = async (id: string, newStatus: SubscriptionStatus) => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );

    try {
      const docRef = doc(db, 'subscriptions', id);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.warn('Firestore update warning:', err);
    }
  };

  // Delete subscription
  const handleDeleteSubscription = async (id: string) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));

    try {
      const docRef = doc(db, 'subscriptions', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Firestore delete warning:', err);
    }
  };

  // Filtered subscriptions based on Global Search
  const filteredSubscriptions = useMemo(() => {
    if (!searchQuery.trim()) return subscriptions;
    const q = searchQuery.toLowerCase();
    return subscriptions.filter(
      (s) =>
        s.customerName.toLowerCase().includes(q) ||
        s.plan.toLowerCase().includes(q) ||
        s.status.toLowerCase().includes(q) ||
        (s.customerEmail && s.customerEmail.toLowerCase().includes(q))
    );
  }, [subscriptions, searchQuery]);

  // Aggregate stats dynamically
  const totalRevenue = useMemo(() => {
    return subscriptions.reduce((acc, curr) => acc + curr.amount, 0) || 48290;
  }, [subscriptions]);

  const activeUsersCount = useMemo(() => {
    return 1245 + (subscriptions.length > 10 ? subscriptions.length * 2 : 0);
  }, [subscriptions]);

  const newSignupsCount = useMemo(() => {
    return 240 + subscriptions.filter((s) => s.status === 'Active').length;
  }, [subscriptions]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b111e] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentUser={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentUser={currentUser}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={unreadNotifications}
        />

        {/* Dashboard Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-(--breakpoint-2xl) w-full mx-auto space-y-6">
          {activeTab === 'Dashboard' ? (
            <>
              {/* Stats Cards Section Header & Actions (Matching reference design) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Stats Cards
                  </h1>
                </div>

                {/* Primary Action Buttons (+ Add User, Export) */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  {/* + Add User Button */}
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-all active:scale-98"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add User</span>
                  </button>

                  {/* Export Dropdown with CSV / PDF / JSON */}
                  <ExportDropdown subscriptions={filteredSubscriptions} />
                </div>
              </div>

              {/* 5 KPI Stats Cards Row matching reference image */}
              <StatsCards
                totalRevenue={totalRevenue}
                activeUsersCount={activeUsersCount}
                newSignupsCount={newSignupsCount}
                subscriptionRate={99.8}
                conversionRate={4.5}
                selectedMetricIndex={selectedMetricIndex}
                onSelectMetric={setSelectedMetricIndex}
              />

              {/* Two Column Grid: Recent Subscriptions (Left) & Revenue Growth (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Recent Subscriptions Dynamic Data Table (Left / 7 cols) */}
                <div className="lg:col-span-7">
                  <SubscriptionsTable
                    subscriptions={filteredSubscriptions}
                    onUpdateStatus={handleUpdateStatus}
                    onDeleteSubscription={handleDeleteSubscription}
                    onOpenAddModal={() => setIsAddModalOpen(true)}
                  />
                </div>

                {/* Revenue Growth Dual-Line Area Chart (Right / 5 cols) */}
                <div className="lg:col-span-5">
                  <RevenueChart data={REVENUE_GROWTH_DATA} />
                </div>
              </div>
            </>
          ) : (
            /* Modular Secondary Views for Users, Analytics, Settings, etc. */
            <OtherViews
              currentTab={activeTab}
              subscriptions={filteredSubscriptions}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Add User / Subscription Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSubscription={handleAddSubscription}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllAsRead={() => setUnreadNotifications(0)}
        unreadCount={unreadNotifications}
      />
    </div>
  );
}
