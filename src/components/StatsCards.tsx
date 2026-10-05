import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import avatarAlatar from '../assets/images/avatar_user_alatar_1791177264313.jpg';
import avatarMarcus from '../assets/images/avatar_user_marcus_1791177278246.jpg';
import avatarSarah from '../assets/images/avatar_user_sarah_1791177294155.jpg';

interface StatsCardsProps {
  totalRevenue: number;
  activeUsersCount: number;
  newSignupsCount: number;
  subscriptionRate: number;
  conversionRate: number;
  onSelectMetric?: (metricIndex: number) => void;
  selectedMetricIndex?: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalRevenue,
  activeUsersCount,
  newSignupsCount,
  subscriptionRate,
  conversionRate,
  onSelectMetric,
  selectedMetricIndex = 0,
}) => {
  // Format currency
  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 1. Total Revenue Card */}
      <div
        onClick={() => onSelectMetric?.(0)}
        className={`bg-white dark:bg-[#121c2d] rounded-xl p-5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
          selectedMetricIndex === 0
            ? 'border-teal-500/80 ring-2 ring-teal-500/20'
            : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>1. Total Revenue</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {formattedRevenue}
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ↗ +12%
          </span>
        </div>

        {/* Mini Sparkline Chart */}
        <div className="mt-3 h-10 w-full">
          <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="revenueSparkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,22 Q 15,10 30,18 T 60,8 T 85,15 T 100,6 L 100,30 L 0,30 Z"
              fill="url(#revenueSparkGradient)"
            />
            <path
              d="M 0,22 Q 15,10 30,18 T 60,8 T 85,15 T 100,6"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 2. Active Users Card */}
      <div
        onClick={() => onSelectMetric?.(1)}
        className={`bg-white dark:bg-[#121c2d] rounded-xl p-5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
          selectedMetricIndex === 1
            ? 'border-teal-500/80 ring-2 ring-teal-500/20'
            : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>2. Active Users</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {activeUsersCount.toLocaleString()}
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ↗ +8%
          </span>
        </div>

        {/* User Avatars Cluster matching screenshot */}
        <div className="mt-3 flex items-center pt-1">
          <div className="flex -space-x-2 overflow-hidden">
            <img
              src={avatarSarah}
              alt="Active user"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-[#121c2d] object-cover"
              referrerPolicy="no-referrer"
            />
            <img
              src={avatarMarcus}
              alt="Active user"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white dark:ring-[#121c2d] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-[#121c2d]">
              +8k
            </div>
          </div>
          <span className="ml-2.5 text-[11px] text-slate-400 font-medium">Global</span>
        </div>
      </div>

      {/* 3. New Signups Card */}
      <div
        onClick={() => onSelectMetric?.(2)}
        className={`bg-white dark:bg-[#121c2d] rounded-xl p-5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
          selectedMetricIndex === 2
            ? 'border-teal-500/80 ring-2 ring-teal-500/20'
            : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>3. New Signups</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {newSignupsCount}
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            ↗
          </span>
        </div>

        {/* Mini 6-bar Chart matching reference image */}
        <div className="mt-3.5 flex items-end gap-1.5 h-9">
          <div className="w-2.5 bg-teal-600 dark:bg-teal-500 rounded-xs h-[45%]" />
          <div className="w-2.5 bg-teal-600 dark:bg-teal-500 rounded-xs h-[65%]" />
          <div className="w-2.5 bg-teal-600 dark:bg-teal-500 rounded-xs h-[35%]" />
          <div className="w-2.5 bg-teal-600 dark:bg-teal-500 rounded-xs h-[85%]" />
          <div className="w-2.5 bg-teal-600 dark:bg-teal-500 rounded-xs h-[50%]" />
          <div className="w-2.5 bg-teal-600 dark:bg-teal-500 rounded-xs h-[100%]" />
        </div>
      </div>

      {/* 4. Subscription Rate Card */}
      <div
        onClick={() => onSelectMetric?.(3)}
        className={`bg-white dark:bg-[#121c2d] rounded-xl p-5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between ${
          selectedMetricIndex === 3
            ? 'border-teal-500/80 ring-2 ring-teal-500/20'
            : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          4. Subscription Rate
        </div>

        {/* Circular Donut Ring matching screenshot */}
        <div className="mt-2 flex items-center justify-center">
          <div className="relative w-18 h-18 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background Track */}
              <circle
                cx="18"
                cy="18"
                r="15"
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
              />
              {/* Progress Ring */}
              <circle
                cx="18"
                cy="18"
                r="15"
                className="text-teal-600 dark:text-teal-400"
                strokeWidth="2.8"
                strokeDasharray={`${(subscriptionRate / 100) * 94.2} 94.2`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                {subscriptionRate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Conversion Rate Card */}
      <div
        onClick={() => onSelectMetric?.(4)}
        className={`bg-white dark:bg-[#121c2d] rounded-xl p-5 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md ${
          selectedMetricIndex === 4
            ? 'border-teal-500/80 ring-2 ring-teal-500/20'
            : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>5. Conversion Rate</span>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono tabular-nums">
            {conversionRate}%
          </span>
          <span className="inline-flex items-center text-xs font-semibold text-rose-500 dark:text-rose-400">
            ↘ -2%
          </span>
        </div>

        {/* Conversion Trend Bar */}
        <div className="mt-4 pt-1">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full"
              style={{ width: `${Math.min(100, conversionRate * 12)}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Target: 5.0%</span>
            <span className="text-rose-500 font-medium">-0.5% gap</span>
          </div>
        </div>
      </div>
    </div>
  );
};
