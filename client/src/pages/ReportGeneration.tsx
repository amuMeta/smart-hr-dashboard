import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from '@/components/GlassCard';
import { PredictionTrendChart, AnomalyDetectionChart, InsightCard } from '@/components/AdvancedCharts';
import { Download, RefreshCw, FileText } from 'lucide-react';

/**
 * ReportGeneration Page
 * Design: Natural language query interface for data insights
 * Displays: Auto-generated reports with key findings and anomalies
 */

interface ReportQuery {
  query: string;
  timestamp: string;
  results: string[];
}

const mockTrendData = [
  { period: 'Q1', actual: 45, predicted: 42, confidence: 85 },
  { period: 'Q2', actual: 52, predicted: 50, confidence: 88 },
  { period: 'Q3', actual: 48, predicted: 55, confidence: 82 },
  { period: 'Q4', actual: 61, predicted: 60, confidence: 90 },
];

const mockAnomalyData = [
  { x: 10, y: 20, anomaly: false, label: 'Normal' },
  { x: 15, y: 25, anomaly: false, label: 'Normal' },
  { x: 20, y: 30, anomaly: false, label: 'Normal' },
  { x: 25, y: 35, anomaly: false, label: 'Normal' },
  { x: 30, y: 80, anomaly: true, label: 'Anomaly' },
  { x: 35, y: 40, anomaly: false, label: 'Normal' },
  { x: 40, y: 45, anomaly: false, label: 'Normal' },
  { x: 45, y: 50, anomaly: false, label: 'Normal' },
];

const mockInsights = [
  {
    id: '1',
    type: 'alert' as const,
    title: '离职风险预警',
    description: '工程部门3名员工离职风险评分超过80分，建议立即跟进',
    impact: 'high' as const,
    action: '安排1对1沟通，了解职业发展需求',
  },
  {
    id: '2',
    type: 'opportunity' as const,
    title: '招聘机会',
    description: '销售部门表现突出，建议扩大招聘规模',
    impact: 'high' as const,
    action: '增加Q2招聘预算15%',
  },
  {
    id: '3',
    type: 'trend' as const,
    title: '员工满意度上升',
    description: '过去3个月员工满意度环比增长8%',
    impact: 'medium' as const,
    action: '继续推进现有HR政策',
  },
  {
    id: '4',
    type: 'recommendation' as const,
    title: '组织结构优化',
    description: '建议合并两个小团队以提高协作效率',
    impact: 'medium' as const,
    action: '制定详细的组织变更计划',
  },
];

export default function ReportGeneration() {
  const [queryInput, setQueryInput] = useState('');
  const [queries, setQueries] = useState<ReportQuery[]>([
    {
      query: '展示Q3离职率最高的部门',
      timestamp: '2024-01-11 10:30',
      results: ['工程部: 8.5%', '销售部: 5.2%', '运营部: 3.1%'],
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQuerySubmit = () => {
    if (!queryInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newQuery: ReportQuery = {
        query: queryInput,
        timestamp: new Date().toLocaleString('zh-CN'),
        results: ['数据处理中...', '生成中...'],
      };
      setQueries([newQuery, ...queries]);
      setQueryInput('');
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Natural Language Query Interface */}
      <GlassCard variant="cyan" className="mb-6">
        <GlassCardHeader
          title="自然语言数据查询"
          subtitle="使用自然语言查询HR数据和生成洞察"
          icon={<FileText className="w-5 h-5" />}
        />
        <GlassCardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuerySubmit()}
                placeholder="例如: 展示Q3离职率最高的部门"
                className="flex-1 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
              />
              <GlassButton
                variant="primary"
                onClick={handleQuerySubmit}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  '查询'
                )}
              </GlassButton>
            </div>

            {/* Query History */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground font-semibold">查询历史</p>
              {queries.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground">{q.query}</p>
                    <span className="text-xs text-muted-foreground">{q.timestamp}</span>
                  </div>
                  <div className="space-y-1">
                    {q.results.map((result, ridx) => (
                      <p key={ridx} className="text-xs text-muted-foreground">
                        • {result}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Trend Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionTrendChart
          data={mockTrendData}
          title="人员需求预测"
          subtitle="基于历史数据的未来需求预测"
          yAxisLabel="人数"
        />

        <AnomalyDetectionChart
          data={mockAnomalyData}
          title="异常检测"
          xAxisLabel="工作效率"
          yAxisLabel="工作满意度"
        />
      </div>

      {/* AI Insights */}
      <InsightCard insights={mockInsights} />

      {/* Report Export */}
      <GlassCard variant="purple">
        <GlassCardHeader title="报表导出" subtitle="生成并下载完整的HR分析报告" />
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30 hover:bg-neon-purple/20 transition-colors text-left">
              <Download className="w-5 h-5 text-neon-purple mb-2" />
              <p className="text-sm font-semibold text-foreground">月度报告</p>
              <p className="text-xs text-muted-foreground mt-1">包含所有关键指标</p>
            </button>
            <button className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30 hover:bg-neon-cyan/20 transition-colors text-left">
              <Download className="w-5 h-5 text-neon-cyan mb-2" />
              <p className="text-sm font-semibold text-foreground">人才分析报告</p>
              <p className="text-xs text-muted-foreground mt-1">人才画像和预测分析</p>
            </button>
            <button className="p-4 bg-neon-pink/10 rounded-lg border border-neon-pink/30 hover:bg-neon-pink/20 transition-colors text-left">
              <Download className="w-5 h-5 text-neon-pink mb-2" />
              <p className="text-sm font-semibold text-foreground">异常预警报告</p>
              <p className="text-xs text-muted-foreground mt-1">风险识别和建议</p>
            </button>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
