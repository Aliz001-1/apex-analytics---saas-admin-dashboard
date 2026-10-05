import React from 'react';
import { X, Check, Bell, DollarSign, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  unreadCount: number;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onMarkAllAsRead,
  unreadCount,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'High-Value Subscription',
      description: 'Alatar just renewed their annual Premium plan ($12,200).',
      time: '12m ago',
      type: 'revenue',
      unread: true,
    },
    {
      id: '2',
      title: 'Active Users Milestone',
      description: 'Total active users surpassed 1,245 (+8% this month).',
      time: '1h ago',
      type: 'users',
      unread: false,
    },
    {
      id: '3',
      title: 'Pending Invoice Reminder',
      description: 'Customer "Basic" has an invoice of $15.00 awaiting confirmation.',
      time: '4h ago',
      type: 'alert',
      unread: false,
    },
    {
      id: '4',
      title: 'Firebase Security Synced',
      description: 'ABAC security rules deployed to ai-studio-40ff62c5 database.',
      time: 'Yesterday',
      type: 'system',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white dark:bg-[#121c2d] h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  {unreadCount} new
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action */}
          {unreadCount > 0 && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-medium"
              >
                <Check className="w-3.5 h-3.5" />
                Mark all as read
              </button>
            </div>
          )}

          {/* Notification List */}
          <div className="mt-4 space-y-3 overflow-y-auto max-h-[calc(100vh-160px)]">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  n.unread
                    ? 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-200/80 dark:border-teal-900/60'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {n.time}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {n.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Real-time activity alerts powered by Apex Engine
          </p>
        </div>
      </div>
    </div>
  );
};
