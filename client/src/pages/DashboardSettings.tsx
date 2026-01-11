import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from '@/components/GlassCard';
import {
  DataFilteringCard,
  AutoRefreshSettingsCard,
  DashboardCustomizationCard,
  BulkExportCard,
} from '@/components/DashboardCustomization';

/**
 * DashboardSettings Page
 * Design: Dashboard customization and global settings
 */

interface DashboardWidget {
  id: string;
  name: string;
  visible: boolean;
  position: number;
}

const mockWidgets: DashboardWidget[] = [
  { id: 'widget1', name: '关键指标卡片', visible: true, position: 1 },
  { id: 'widget2', name: '人才流动趋势', visible: true, position: 2 },
  { id: 'widget3', name: '部门分布图', visible: true, position: 3 },
  { id: 'widget4', name: 'AI洞察面板', visible: true, position: 4 },
  { id: 'widget5', name: '招聘漏斗', visible: false, position: 5 },
  { id: 'widget6', name: '员工满意度', visible: true, position: 6 },
  { id: 'widget7', name: '组织结构图', visible: false, position: 7 },
  { id: 'widget8', name: '实时预警', visible: true, position: 8 },
];

const mockFilters = [
  {
    id: 'department',
    label: '部门',
    type: 'select' as const,
    options: ['工程部', '产品部', '销售部', '运营部', 'HR部'],
  },
  {
    id: 'dateRange',
    label: '日期范围',
    type: 'date' as const,
  },
  {
    id: 'riskScore',
    label: '风险分数',
    type: 'number' as const,
  },
  {
    id: 'search',
    label: '搜索',
    type: 'text' as const,
  },
];

export default function DashboardSettings() {
  const [widgets, setWidgets] = useState(mockWidgets);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleApplyFilter = (filters: Record<string, any>) => {
    console.log('Filters applied:', filters);
  };

  const handleResetFilter = () => {
    console.log('Filters reset');
  };

  const handleIntervalChange = (interval: number) => {
    setRefreshInterval(interval);
    console.log('Refresh interval changed to:', interval);
  };

  const handleToggleAutoRefresh = (enabled: boolean) => {
    setAutoRefreshEnabled(enabled);
    console.log('Auto refresh toggled:', enabled);
  };

  const handleToggleWidget = (widgetId: string) => {
    console.log('Widget toggled:', widgetId);
  };

  const handleReorderWidgets = (reorderedWidgets: DashboardWidget[]) => {
    setWidgets(reorderedWidgets);
    console.log('Widgets reordered');
  };

  const handleSaveLayout = () => {
    console.log('Layout saved');
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true);
    setTimeout(() => {
      console.log('Data exported as:', format);
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">仪表板设置</h1>
        <p className="text-muted-foreground">
          自定义仪表板布局、配置数据筛选、管理刷新设置
        </p>
      </div>

      {/* Data Filtering */}
      <DataFilteringCard
        filters={mockFilters}
        onApplyFilter={handleApplyFilter}
        onReset={handleResetFilter}
      />

      {/* Auto Refresh Settings */}
      <AutoRefreshSettingsCard
        currentInterval={refreshInterval}
        onIntervalChange={handleIntervalChange}
        onToggleAutoRefresh={handleToggleAutoRefresh}
        isAutoRefreshEnabled={autoRefreshEnabled}
      />

      {/* Dashboard Customization */}
      <DashboardCustomizationCard
        widgets={widgets}
        onToggleWidget={handleToggleWidget}
        onReorderWidgets={handleReorderWidgets}
        onSaveLayout={handleSaveLayout}
      />

      {/* Bulk Export */}
      <BulkExportCard
        onExport={handleExport}
        isExporting={isExporting}
      />

      {/* Settings Info */}
      <GlassCard variant="cyan">
        <GlassCardHeader
          title="设置说明"
          subtitle="了解各项设置的含义"
        />
        <GlassCardContent className="space-y-3">
          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-sm font-semibold text-foreground mb-1">数据筛选</p>
            <p className="text-xs text-muted-foreground">
              使用多个筛选条件快速定位您需要的数据。支持部门、日期、数值和文本搜索。
            </p>
          </div>

          <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
            <p className="text-sm font-semibold text-foreground mb-1">自动刷新</p>
            <p className="text-xs text-muted-foreground">
              启用自动刷新以获得最新的实时数据。可以根据需要调整刷新间隔。
            </p>
          </div>

          <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
            <p className="text-sm font-semibold text-foreground mb-1">仪表板自定义</p>
            <p className="text-xs text-muted-foreground">
              拖拽重新排列组件位置，或隐藏不需要的组件以获得更清晰的视图。
            </p>
          </div>

          <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
            <p className="text-sm font-semibold text-foreground mb-1">批量导出</p>
            <p className="text-xs text-muted-foreground">
              将所有数据导出为 PDF、Excel 或 CSV 格式，便于进一步分析或分享。
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
