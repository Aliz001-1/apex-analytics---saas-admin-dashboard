import React, { useState } from 'react';
import {
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Filter,
} from 'lucide-react';
import { Subscription, SubscriptionStatus } from '../types/dashboard';

interface SubscriptionsTableProps {
  subscriptions: Subscription[];
  onUpdateStatus: (id: string, newStatus: SubscriptionStatus) => void;
  onDeleteSubscription: (id: string) => void;
  onOpenAddModal: () => void;
  onSelectSubscription?: (sub: Subscription) => void;
}

type SortField = 'customerName' | 'plan' | 'date' | 'status' | 'amount';
type SortOrder = 'asc' | 'desc';

export const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({
  subscriptions,
  onUpdateStatus,
  onDeleteSubscription,
  onOpenAddModal,
  onSelectSubscription,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<'All' | SubscriptionStatus>('All');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Sorting Handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter subscriptions
  const filteredList = subscriptions.filter((sub) => {
    if (statusFilter === 'All') return true;
    return sub.status === statusFilter;
  });

  // Sort subscriptions
  const sortedList = [...filteredList].sort((a, b) => {
    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];

    if (sortField === 'amount') {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }

    if (sortField === 'date') {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
    }

    const comparison = String(aVal).localeCompare(String(bVal));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(sortedList.length / itemsPerPage));
  const validPage = Math.min(currentPage, totalPages);
  const paginatedList = sortedList.slice(
    (validPage - 1) * itemsPerPage,
    validPage * itemsPerPage
  );

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-teal-600 dark:text-teal-400" />
    ) : (
      <ArrowDown className="w-3 h-3 text-teal-600 dark:text-teal-400" />
    );
  };

  // Status badge styling matching reference image:
  // Active: subtle soft teal/cyan badge
  // Pending: subtle soft amber badge
  // Canceled: subtle soft red/rose badge
  const renderStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#ccfbf1]/80 text-[#0f766e] dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50">
            Active
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#fef3c7]/80 text-[#b45309] dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50">
            Pending
          </span>
        );
      case 'Canceled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#ffe4e6]/80 text-[#be123c] dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/50">
            Canceled
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-[#121c2d] rounded-xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
      {/* Header and Controls */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Recent Subscriptions
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ({sortedList.length} records)
            </span>
          </div>

          {/* Quick Status Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-lg text-xs">
            {(['All', 'Active', 'Pending', 'Canceled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Table */}
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-400">
                <th
                  onClick={() => handleSort('customerName')}
                  className="py-3 px-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Customer</span>
                    {getSortIcon('customerName')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('plan')}
                  className="py-3 px-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Plan</span>
                    {getSortIcon('plan')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('date')}
                  className="py-3 px-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date</span>
                    {getSortIcon('date')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3 px-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('amount')}
                  className="py-3 px-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Amount</span>
                    {getSortIcon('amount')}
                  </div>
                </th>
                <th className="py-3 px-3 text-right">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No subscriptions found matching the filter.
                  </td>
                </tr>
              ) : (
                paginatedList.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Customer Info with Avatar or Initials Badge */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {sub.avatarUrl ? (
                          <img
                            src={sub.avatarUrl}
                            alt={sub.customerName}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shadow-2xs"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-[11px] tracking-wider shadow-2xs"
                            style={{ backgroundColor: sub.color || '#0d9488' }}
                          >
                            {sub.initials || sub.customerName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {sub.customerName}
                          </div>
                          {sub.customerEmail && (
                            <div className="text-[11px] text-slate-400 truncate max-w-40">
                              {sub.customerEmail}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="py-3.5 px-3 whitespace-nowrap font-medium text-slate-600 dark:text-slate-300">
                      {sub.plan}
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                      {sub.date}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {renderStatusBadge(sub.status)}
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-3 whitespace-nowrap font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                      ${sub.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-3 whitespace-nowrap text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === sub.id ? null : sub.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Row actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === sub.id && (
                        <div
                          className="absolute right-3 top-10 w-44 bg-white dark:bg-[#182335] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-30 text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Set Status
                          </div>
                          <button
                            onClick={() => {
                              onUpdateStatus(sub.id, 'Active');
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            Mark Active
                          </button>
                          <button
                            onClick={() => {
                              onUpdateStatus(sub.id, 'Pending');
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            Mark Pending
                          </button>
                          <button
                            onClick={() => {
                              onUpdateStatus(sub.id, 'Canceled');
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <XCircle className="w-3.5 h-3.5 text-rose-500" />
                            Mark Canceled
                          </button>
                          <div className="border-t border-slate-100 dark:border-slate-700 my-1" />
                          <button
                            onClick={() => {
                              onDeleteSubscription(sub.id);
                              setActiveMenuId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete Record
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination matching reference screenshot: < 1 of 10 > */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={validPage === 1}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-medium text-slate-700 dark:text-slate-300 font-mono">
          {validPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={validPage === totalPages}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
