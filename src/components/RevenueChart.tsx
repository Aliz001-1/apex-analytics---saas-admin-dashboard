import React, { useState } from 'react';
import { MoreHorizontal, TrendingUp, Download, Eye, Layers } from 'lucide-react';
import { ChartDataPoint } from '../types/dashboard';

interface RevenueChartProps {
  data: ChartDataPoint[];
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showTarget, setShowTarget] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // SVG Chart Dimensions
  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 25, bottom: 40, left: 55 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = 55000;

  // Scale functions
  const getX = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + chartHeight - (val / maxVal) * chartHeight;

  // Generate SVG path points
  const revenuePoints = data.map((d, i) => `${getX(i)},${getY(d.revenue)}`).join(' ');
  const targetPoints = data.map((d, i) => `${getX(i)},${getY(d.target)}`).join(' ');

  // Generate Area Path for Revenue
  const firstPoint = `${getX(0)},${getY(data[0].revenue)}`;
  const lastPoint = `${getX(data.length - 1)},${getY(data[data.length - 1].revenue)}`;
  const areaPath = `M ${firstPoint} L ${revenuePoints} L ${getX(data.length - 1)},${padding.top + chartHeight} L ${getX(0)},${padding.top + chartHeight} Z`;

  // Y-axis tick values matching the image ($0, $10k, $20k, $30k, $40k, $50k)
  const yTicks = [0, 10000, 20000, 30000, 40000, 50000];

  const activePoint = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="bg-white dark:bg-[#121c2d] rounded-xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Revenue Growth
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              Actual Revenue
            </span>
            {showTarget && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Target Benchmark
              </span>
            )}
          </div>
        </div>

        {/* Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Chart options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a2538] border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1.5 z-20 text-xs">
              <button
                onClick={() => {
                  setShowTarget(!showTarget);
                  setMenuOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between"
              >
                <span>{showTarget ? 'Hide Target Benchmark' : 'Show Target Benchmark'}</span>
                <Eye className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            {/* Teal Gradient Area Fill */}
            <linearGradient id="revenueAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines and Y-axis labels */}
          {yTicks.map((tick) => {
            const yPos = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={width - padding.right}
                  y2={yPos}
                  stroke="currentColor"
                  className="text-slate-100 dark:text-slate-800/80"
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? '' : '3 3'}
                />
                <text
                  x={padding.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="text-[11px] fill-slate-400 dark:fill-slate-500 font-mono tabular-nums"
                >
                  ${tick === 0 ? '0' : `${tick / 1000}k`}
                </text>
              </g>
            );
          })}

          {/* Area under actual revenue */}
          <path d={areaPath} fill="url(#revenueAreaGrad)" />

          {/* Target Benchmark Line (Gold/Amber) */}
          {showTarget && (
            <polyline
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={targetPoints}
            />
          )}

          {/* Actual Revenue Line (Teal/Emerald) */}
          <polyline
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={revenuePoints}
          />

          {/* Interactive Hover Guides & Circles */}
          {data.map((d, i) => {
            const x = getX(i);
            const yRevenue = getY(d.revenue);
            const yTarget = getY(d.target);
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={d.month}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* Hit area */}
                <rect
                  x={x - chartWidth / (data.length * 2)}
                  y={padding.top}
                  width={chartWidth / data.length}
                  height={chartHeight}
                  fill="transparent"
                />

                {/* X-axis tick label */}
                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  className={`text-[11px] font-medium transition-colors ${
                    isHovered
                      ? 'fill-teal-600 dark:fill-teal-400 font-bold'
                      : 'fill-slate-500 dark:fill-slate-400'
                  }`}
                >
                  {d.month}
                </text>

                {/* Vertical hover guide */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={padding.top + chartHeight}
                    stroke="#0d9488"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-70"
                  />
                )}

                {/* Data point dot for Target */}
                {showTarget && isHovered && (
                  <circle
                    cx={x}
                    cy={yTarget}
                    r="4"
                    fill="#d97706"
                    className="stroke-2 stroke-white dark:stroke-[#121c2d]"
                  />
                )}

                {/* Data point dot for Revenue */}
                <circle
                  cx={x}
                  cy={yRevenue}
                  r={isHovered ? '5' : '3'}
                  fill="#0d9488"
                  className="stroke-2 stroke-white dark:stroke-[#121c2d] transition-all"
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic Floating Tooltip */}
        {activePoint && hoveredIndex !== null && (
          <div
            className="absolute z-20 pointer-events-none bg-slate-900/95 text-white dark:bg-slate-950/95 dark:text-slate-100 p-2.5 rounded-lg shadow-xl border border-slate-700/60 text-xs backdrop-blur-xs min-w-36 transition-all duration-75"
            style={{
              left: `${Math.min(
                Math.max(10, (getX(hoveredIndex) / width) * 100 - 15),
                70
              )}%`,
              top: '15px',
            }}
          >
            <div className="font-semibold text-slate-300 pb-1 mb-1 border-b border-slate-800 flex items-center justify-between">
              <span>{activePoint.month} 2026</span>
              <span className="text-[10px] text-teal-400 font-mono">
                +{Math.round(((activePoint.revenue - activePoint.target) / activePoint.target) * 100)}%
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-teal-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  Actual:
                </span>
                <span className="font-mono font-bold">
                  ${activePoint.revenue.toLocaleString()}
                </span>
              </div>
              {showTarget && (
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-amber-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Target:
                  </span>
                  <span className="font-mono">
                    ${activePoint.target.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Metrics Summary */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1 font-medium">
          <TrendingUp className="w-3.5 h-3.5 text-teal-500" />
          YTD Growth: <strong className="text-slate-900 dark:text-white font-mono">+138.4%</strong>
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          Last updated: Oct 2026
        </span>
      </div>
    </div>
  );
};
