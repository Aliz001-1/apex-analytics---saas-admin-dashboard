import React from 'react';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Layers,
  CreditCard,
  Settings,
  FileText,
  Headphones,
  X,
  ShieldCheck,
  LogOut,
  LogIn,
} from 'lucide-react';
import { NavItem } from '../types/dashboard';
import { User } from 'firebase/auth';

interface SidebarProps {
  activeTab: NavItem;
  setActiveTab: (tab: NavItem) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  currentUser: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  currentUser,
  onSignIn,
  onSignOut,
}) => {
  const navItems: { label: NavItem; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Users', icon: Users },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Subscriptions', icon: Layers },
    { label: 'Payments', icon: CreditCard },
    { label: 'Settings', icon: Settings },
    { label: 'Reports', icon: FileText },
    { label: 'Support', icon: Headphones },
  ];

  const handleNavClick = (tab: NavItem) => {
    setActiveTab(tab);
    // On mobile, auto-close sidebar after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0e1726] text-slate-300 flex flex-col border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            {/* Stylized Apex Triangle Logo matching screenshot */}
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M12 2L2 22h7l3-6 3 6h7L12 2zm0 6l3.5 7h-7L12 8z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
                Apex Analytics
              </div>
              <div className="text-[11px] font-medium tracking-widest text-slate-400 uppercase">
                Dashboard
              </div>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-[#1e293b] text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-teal-400' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
                {item.label === 'Dashboard' && isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-xs shadow-teal-400/50" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Firebase Authentication / User Info in Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/60 bg-[#090f19]/60">
          {currentUser ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-9 h-9 rounded-full ring-2 ring-teal-500/40 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-teal-600/30 text-teal-300 border border-teal-500/30 flex items-center justify-center font-semibold text-xs">
                    {(currentUser.displayName || currentUser.email || 'U').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {currentUser.displayName || 'Authenticated Admin'}
                  </p>
                  <p className="text-[11px] text-teal-400/90 truncate flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Firebase Connected
                  </p>
                </div>
              </div>
              <button
                onClick={onSignOut}
                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors border border-slate-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] text-slate-400">
                Sign in with Google to sync dashboard state to cloud Firestore.
              </div>
              <button
                onClick={onSignIn}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Connect Google Account
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
