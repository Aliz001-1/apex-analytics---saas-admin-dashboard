import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  Shield,
  UserCheck,
  LogOut,
  LogIn,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import avatarAdminAliza from '../assets/images/avatar_admin_aliza_1791177245558.jpg';
import { User } from 'firebase/auth';

interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentUser: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode,
  searchQuery,
  onSearchChange,
  currentUser,
  onSignIn,
  onSignOut,
  onOpenNotifications,
  unreadCount,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adminName = currentUser?.displayName || 'Aliza Khan';
  const adminEmail = currentUser?.email || 'shahaliza660@gmail.com';
  const adminPhoto = currentUser?.photoURL || avatarAdminAliza;

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/90 dark:bg-[#0e1726]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile Hamburger & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60 lg:hidden transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Box matching the reference design */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search customers, reports..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-lg text-sm border border-transparent focus:border-teal-500/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-amber-300 dark:hover:bg-slate-800/60 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notification Bell matching screenshot with red '1' badge */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#0e1726]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          {/* Admin Profile Lockup */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              aria-expanded={profileDropdownOpen}
            >
              <div className="relative">
                <img
                  src={adminPhoto}
                  alt={adminName}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0e1726]" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                  {adminName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {currentUser ? 'Admin' : 'Admin'}
                </p>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  profileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#121c2d] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <Shield className="w-3 h-3" />
                      Super Administrator
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-slate-900 dark:text-white truncate">
                    {adminName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {adminEmail}
                  </p>
                </div>

                <div className="px-2 py-1.5">
                  <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Cloud Connection
                  </div>
                  <div className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                      Firestore Database
                    </span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">
                      Connected
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1 px-2">
                  {currentUser ? (
                    <button
                      onClick={() => {
                        onSignOut();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out of Firebase
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onSignIn();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded-lg transition-colors"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Sign In with Google
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
