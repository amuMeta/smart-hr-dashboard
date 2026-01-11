import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import { Settings, Filter, RefreshCw, Layout, Download } from 'lucide-react';

/**
 * DataFilteringCard Component
 * Design: Advanced filtering and sorting for all modules
 */

interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'date' | 'number' | 'text';
  options?: string[];
}

interface DataFilteringProps {
  filters: FilterOption[];
  onApplyFilter: (filters: Record<string, any>) => void;
  onReset: () => void;
}

export const DataFilteringCard: React.FC<DataFilteringProps> = ({
  filters,
  onApplyFilter,
  onReset,
}) => {
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues({ ...filterValues, [filterId]: value });
  };

  const handleApply = () => {
    onApplyFilter(filterValues);
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="数据筛选"
        subtitle="高级筛选和排序功能"
        icon={<Filter className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {/* Filter Controls */}
        <div className="space-y-3">
          {filters.map((filter) => (
            <div key={filter.id}>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                {filter.label}
              </label>
              {filter.type === 'select' && (
                <select
                  value={filterValues[filter.id] || ''}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                >
                  <option value="">-- 全部 --</option>
                  {filter.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {filter.type === 'date' && (
                <input
                  type="date"
                  value={filterValues[filter.id] || ''}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                />
              )}
              {filter.type === 'number' && (
                <input
                  type="number"
                  value={filterValues[filter.id] || ''}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                />
              )}
              {filter.type === 'text' && (
                <input
                  type="text"
                  value={filterValues[filter.id] || ''}
                  onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                  placeholder="搜索..."
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <GlassButton
            variant="primary"
            onClick={handleApply}
            className="flex-1"
          >
            <Filter className="w-4 h-4 mr-2" />
            应用筛选
          </GlassButton>
          <GlassButton
            variant="ghost"
            onClick={onReset}
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重置
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * AutoRefreshSettingsCard Component
 * Design: Configure real-time data refresh intervals
 */

interface RefreshSettingsProps {
  currentInterval: number; // seconds
  onIntervalChange: (interval: number) => void;
  onToggleAutoRefresh: (enabled: boolean) => void;
  isAutoRefreshEnabled?: boolean;
}

export const AutoRefreshSettingsCard: React.FC<RefreshSettingsProps> = ({
  currentInterval,
  onIntervalChange,
  onToggleAutoRefresh,
  isAutoRefreshEnabled = true,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="自动刷新设置"
        subtitle="配置数据实时更新"
        icon={<RefreshCw className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Auto Refresh Toggle */}
        <div className="flex items-center justify-between p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
          <span className="text-sm font-semibold text-foreground">启用自动刷新</span>
          <button
            onClick={() => onToggleAutoRefresh(!isAutoRefreshEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAutoRefreshEnabled ? 'bg-neon-purple' : 'bg-muted'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAutoRefreshEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Refresh Interval */}
        {isAutoRefreshEnabled && (
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              刷新间隔 (秒)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="5"
                max="300"
                step="5"
                value={currentInterval}
                onChange={(e) => onIntervalChange(parseInt(e.target.value))}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-purple"
              />
              <span className="text-sm text-muted-foreground py-2">秒</span>
            </div>

            {/* Preset Intervals */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[10, 30, 60].map((interval) => (
                <GlassButton
                  key={interval}
                  variant={currentInterval === interval ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onIntervalChange(interval)}
                  className="text-xs"
                >
                  {interval}秒
                </GlassButton>
              ))}
            </div>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * DashboardCustomizationCard Component
 * Design: Customize dashboard layout and widget visibility
 */

interface DashboardWidget {
  id: string;
  name: string;
  visible: boolean;
  position: number;
}

interface DashboardCustomizationProps {
  widgets: DashboardWidget[];
  onToggleWidget: (widgetId: string) => void;
  onReorderWidgets: (widgets: DashboardWidget[]) => void;
  onSaveLayout: () => void;
}

export const DashboardCustomizationCard: React.FC<DashboardCustomizationProps> = ({
  widgets,
  onToggleWidget,
  onReorderWidgets,
  onSaveLayout,
}) => {
  const [localWidgets, setLocalWidgets] = useState(widgets);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  const handleToggle = (widgetId: string) => {
    const updated = localWidgets.map((w) =>
      w.id === widgetId ? { ...w, visible: !w.visible } : w
    );
    setLocalWidgets(updated);
    onToggleWidget(widgetId);
  };

  const handleDragStart = (widgetId: string) => {
    setDraggedWidget(widgetId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedWidget || draggedWidget === targetId) return;

    const draggedIdx = localWidgets.findIndex((w) => w.id === draggedWidget);
    const targetIdx = localWidgets.findIndex((w) => w.id === targetId);

    const updated = [...localWidgets];
    [updated[draggedIdx], updated[targetIdx]] = [updated[targetIdx], updated[draggedIdx]];

    setLocalWidgets(updated);
    onReorderWidgets(updated);
    setDraggedWidget(null);
  };

  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="仪表板自定义"
        subtitle="调整组件布局和可见性"
        icon={<Layout className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {/* Widget List */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {localWidgets.map((widget) => (
            <div
              key={widget.id}
              draggable
              onDragStart={() => handleDragStart(widget.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(widget.id)}
              className={`p-3 rounded-lg border transition-all cursor-move ${
                widget.visible
                  ? 'bg-neon-pink/10 border-neon-pink/30'
                  : 'bg-muted/20 border-muted/30 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{widget.name}</p>
                  <p className="text-xs text-muted-foreground">位置: {widget.position}</p>
                </div>
                <button
                  onClick={() => handleToggle(widget.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    widget.visible ? 'bg-neon-pink' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      widget.visible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save Layout Button */}
        <GlassButton
          variant="primary"
          onClick={onSaveLayout}
          className="w-full"
        >
          <Settings className="w-4 h-4 mr-2" />
          保存布局
        </GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * BulkExportCard Component
 * Design: Export all data in multiple formats
 */

interface BulkExportProps {
  onExport: (format: 'pdf' | 'excel' | 'csv') => void;
  isExporting?: boolean;
}

export const BulkExportCard: React.FC<BulkExportProps> = ({
  onExport,
  isExporting = false,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="批量导出"
        subtitle="导出所有数据和报告"
        icon={<Download className="w-5 h-5" />}
      />
      <GlassCardContent>
        <div className="grid grid-cols-3 gap-3">
          <GlassButton
            variant="primary"
            onClick={() => onExport('pdf')}
            disabled={isExporting}
            className="flex flex-col items-center justify-center h-24"
          >
            <Download className="w-5 h-5 mb-1" />
            <span className="text-xs">PDF</span>
          </GlassButton>
          <GlassButton
            variant="secondary"
            onClick={() => onExport('excel')}
            disabled={isExporting}
            className="flex flex-col items-center justify-center h-24"
          >
            <Download className="w-5 h-5 mb-1" />
            <span className="text-xs">Excel</span>
          </GlassButton>
          <GlassButton
            variant="ghost"
            onClick={() => onExport('csv')}
            disabled={isExporting}
            className="flex flex-col items-center justify-center h-24"
          >
            <Download className="w-5 h-5 mb-1" />
            <span className="text-xs">CSV</span>
          </GlassButton>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
