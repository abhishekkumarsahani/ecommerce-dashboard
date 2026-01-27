import React from "react";
import { LucideIcon } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  trend: "up" | "down";
  isLoading?: boolean;
  percentage?: number;
  subtitle?: string;
  chartData?: number[];
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  trend,
  isLoading = false,
  percentage,
  subtitle,
  chartData = [65, 78, 60, 89, 76, 82, 90, 75],
}) => {
  const renderMiniChart = () => {
    const max = Math.max(...chartData);

    return (
      <div className="flex items-end h-8 gap-1 mt-3">
        {chartData.map((v, i) => (
          <div
            key={i}
            className="w-1.5 rounded-t-sm bg-gradient-to-t from-blue-400/30 to-blue-400/60"
            style={{ height: `${(v / max) * 100}%` }}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg animate-pulse">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40" />
          </div>
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      {/* gradient glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition" />

      <div className="relative bg-white dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">
                {title}
              </p>

              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  trend === "up"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {trend === "up" ? "↑" : "↓"} {change}
              </div>
            </div>

            <div className="mt-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {value}
              </h3>
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl animate-pulse" />
            <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
              <Icon size={24} className="text-white" />
            </div>

            {percentage !== undefined && (
              <div className="absolute -bottom-2 -right-2">
                <div className="relative h-10 w-10">
                  <svg
                    className="h-10 w-10 -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <path
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                      strokeDasharray={`${percentage},100`}
                      stroke={trend === "up" ? "#10b981" : "#ef4444"}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {percentage}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {renderMiniChart()}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                trend === "up" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {trend === "up" ? "Positive" : "Negative"} trend
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
