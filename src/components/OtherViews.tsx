import React from 'react';
import {
  Users,
  BarChart3,
  Layers,
  CreditCard,
  Settings,
  FileText,
  Headphones,
  CheckCircle,
  Database,
  Shield,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { NavItem, Subscription } from '../types/dashboard';

interface OtherViewProps {
  currentTab: NavItem;
  subscriptions: Subscription[];
  onOpenAddModal: () => void;
}

export const OtherViews: React.FC<OtherViewProps> = ({
  currentTab,
  subscriptions,
  onOpenAddModal,
}) => {
  switch (currentTab) {
    case 'Users':
      return (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                User Management
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage SaaS members, team permissions, and customer account access.
              </p>
            </div>
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              + Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Total Accounts</span>
              <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-1">1,245</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Enterprise Admins</span>
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 font-mono mt-1">14</p>
            </div>
            <div className="p-4 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 font-medium">Pending Invites</span>
              <p className="text-2xl font-bold text-amber-500 font-mono mt-1">3</p>
            </div>
          </div>
        </div>
      );

    case 'Analytics':
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Advanced Analytics & Cohorts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              In-depth performance indicators, churn analysis, and revenue forecasting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Monthly Recurring Revenue (MRR)
              </h3>
              <p className="text-3xl font-bold font-mono text-teal-600 dark:text-teal-400">
                $48,290.00
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                ↗ +12% increase compared to last 30 days period
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Net Revenue Retention (NRR)
              </h3>
              <p className="text-3xl font-bold font-mono text-slate-900 dark:text-white">
                114.2%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Industry benchmark top-quartile performance
              </p>
            </div>
          </div>
        </div>
      );

    case 'Payments':
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Payments & Settlements
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gateway settlements, payouts, and automated billing records.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Stripe Enterprise Gateway
                </p>
                <p className="text-xs text-slate-500">Connected · Auto-settle daily</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Wire Transfer & ACH Processing
                </p>
                <p className="text-xs text-slate-500">B2B annual contracts</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                Active
              </span>
            </div>
          </div>
        </div>
      );

    case 'Settings':
      return (
        <div className="space-y-6 max-w-3xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              System Settings & Integration
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cloud connection, security configurations, and tenant settings.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-500" />
              Firebase Firestore Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">Project ID</span>
                <p className="font-mono font-medium text-slate-900 dark:text-white mt-1">
                  solar-entropy-0xctm
                </p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-slate-400">Database ID</span>
                <p className="font-mono font-medium text-slate-900 dark:text-white mt-1">
                  ai-studio-40ff62c5...
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'Reports':
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Compliance & Financial Reports
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generate auditable statement reports for bookkeeping and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Q3 2026 SaaS Revenue Ledger
                </h4>
                <p className="text-xs text-slate-500">PDF · 2.4 MB</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-800 dark:text-slate-200 transition-colors"
              >
                Download
              </button>
            </div>

            <div className="p-5 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Annual Subscription Audit Statement
                </h4>
                <p className="text-xs text-slate-500">CSV · 450 KB</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-800 dark:text-slate-200 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      );

    case 'Support':
      return (
        <div className="space-y-6 max-w-xl">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Enterprise Support Desk
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              24/7 dedicated support engineering team for your SaaS infrastructure.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#121c2d] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              Need assistance with subscriber billing, API keys, or custom roles? Our customer engineering team is online.
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg text-teal-800 dark:text-teal-300 font-medium">
              SLA Priority Level: Enterprise Tier 1 (Response within 15 minutes)
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
