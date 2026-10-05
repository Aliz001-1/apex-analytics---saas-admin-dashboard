import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, Code2, ChevronDown, Check } from 'lucide-react';
import { Subscription } from '../types/dashboard';

interface ExportDropdownProps {
  subscriptions: Subscription[];
}

export const ExportDropdown: React.FC<ExportDropdownProps> = ({ subscriptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // CSV Export logic
  const handleExportCSV = () => {
    const headers = ['ID', 'Customer Name', 'Email', 'Plan', 'Date', 'Status', 'Amount'];
    const rows = subscriptions.map((s) => [
      s.id,
      `"${s.customerName.replace(/"/g, '""')}"`,
      `"${(s.customerEmail || '').replace(/"/g, '""')}"`,
      s.plan,
      s.date,
      s.status,
      s.amount.toFixed(2),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_analytics_subscriptions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('CSV Exported!');
    setTimeout(() => setDownloadSuccess(null), 2000);
    setIsOpen(false);
  };

  // PDF Export logic via custom styled print preview
  const handleExportPDF = () => {
    setIsOpen(false);
    window.print();
  };

  // JSON Export logic
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(subscriptions, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `apex_analytics_subscriptions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('JSON Exported!');
    setTimeout(() => setDownloadSuccess(null), 2000);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-[#121c2d] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 rounded-lg text-xs font-semibold shadow-2xs transition-all"
      >
        <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span>{downloadSuccess || 'Export'}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#152033] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Export Options
          </div>
          <button
            onClick={handleExportCSV}
            className="w-full px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors text-left"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <div>
              <div className="font-medium">Export to CSV</div>
              <div className="text-[10px] text-slate-400">Excel / Spreadsheet</div>
            </div>
          </button>

          <button
            onClick={handleExportPDF}
            className="w-full px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors text-left"
          >
            <FileText className="w-4 h-4 text-rose-500" />
            <div>
              <div className="font-medium">Export to PDF</div>
              <div className="text-[10px] text-slate-400">Print or Save as PDF</div>
            </div>
          </button>

          <button
            onClick={handleExportJSON}
            className="w-full px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors text-left"
          >
            <Code2 className="w-4 h-4 text-blue-500" />
            <div>
              <div className="font-medium">Export to JSON</div>
              <div className="text-[10px] text-slate-400">Raw Data Format</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
