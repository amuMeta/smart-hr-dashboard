import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { GlassCard, GlassCardHeader, GlassCardContent } from './GlassCard';

/**
 * PredictionTrendChart Component
 * Design: Multi-line chart for trend prediction
 */

interface TrendData {
  period: string;
  actual: number;
  predicted: number;
  confidence: number;
}

interface PredictionTrendProps {
  data: TrendData[];
  title: string;
  subtitle?: string;
  yAxisLabel?: string;
}

export const PredictionTrendChart: React.FC<PredictionTrendProps> = ({
  data,
  title,
  subtitle,
  yAxisLabel = 'Value',
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader title={title} subtitle={subtitle} />
      <GlassCardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis stroke="rgba(232, 240, 255, 0.5)" />
            <YAxis stroke="rgba(232, 240, 255, 0.5)" label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 15, 58, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e8f0ff' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{ fill: '#00d9ff', r: 4 }}
              name="实际值"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#b026ff"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#b026ff', r: 4 }}
              name="预测值"
            />
          </LineChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * AnomalyDetectionChart Component
 * Design: Scatter plot for anomaly detection
 */

interface AnomalyData {
  x: number;
  y: number;
  anomaly: boolean;
  label: string;
}

interface AnomalyDetectionProps {
  data: AnomalyData[];
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export const AnomalyDetectionChart: React.FC<AnomalyDetectionProps> = ({
  data,
  title,
  xAxisLabel = 'X Axis',
  yAxisLabel = 'Y Axis',
}) => {
  const normalData = data.filter((d) => !d.anomaly);
  const anomalyData = data.filter((d) => d.anomaly);

  return (
    <GlassCard variant="pink">
      <GlassCardHeader title={title} subtitle="异常检测与预警" />
      <GlassCardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis
              type="number"
              dataKey="x"
              stroke="rgba(232, 240, 255, 0.5)"
              label={{ value: xAxisLabel, position: 'insideBottomRight', offset: -5 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              stroke="rgba(232, 240, 255, 0.5)"
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 15, 58, 0.9)',
                border: '1px solid rgba(255, 0, 110, 0.3)',
              }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter name="正常数据" data={normalData} fill="#00d9ff" />
            <Scatter name="异常数据" data={anomalyData} fill="#ff006e" />
          </ScatterChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * PerformanceRadarChart Component
 * Design: Multi-dimensional performance analysis
 */

interface RadarMetric {
  name: string;
  value: number; // 0-100
  fullMark: number;
}

interface PerformanceRadarProps {
  metrics: RadarMetric[];
  title: string;
  subtitle?: string;
}

export const PerformanceRadarChart: React.FC<PerformanceRadarProps> = ({
  metrics,
  title,
  subtitle,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader title={title} subtitle={subtitle} />
      <GlassCardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={metrics}>
            <PolarGrid stroke="rgba(0, 217, 255, 0.2)" />
            <PolarAngleAxis dataKey="name" stroke="rgba(232, 240, 255, 0.5)" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(232, 240, 255, 0.5)" />
            <Radar
              name="性能指标"
              dataKey="value"
              stroke="#00d9ff"
              fill="#00d9ff"
              fillOpacity={0.3}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 15, 58, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * ComparisonBarChart Component
 * Design: Department or team comparison
 */

interface ComparisonData {
  name: string;
  value1: number;
  value2: number;
  value3?: number;
}

interface ComparisonBarProps {
  data: ComparisonData[];
  title: string;
  series: Array<{ key: string; name: string; color: string }>;
}

export const ComparisonBarChart: React.FC<ComparisonBarProps> = ({
  data,
  title,
  series,
}) => {
  return (
    <GlassCard variant="cyan">
      <GlassCardHeader title={title} />
      <GlassCardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis stroke="rgba(232, 240, 255, 0.5)" />
            <YAxis stroke="rgba(232, 240, 255, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 15, 58, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
              }}
            />
            <Legend />
            {series.map((s) => (
              <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * AreaTrendChart Component
 * Design: Stacked area chart for trend analysis
 */

interface AreaTrendData {
  period: string;
  [key: string]: string | number;
}

interface AreaTrendProps {
  data: AreaTrendData[];
  title: string;
  areas: Array<{ key: string; name: string; color: string }>;
}

export const AreaTrendChart: React.FC<AreaTrendProps> = ({
  data,
  title,
  areas,
}) => {
  return (
    <GlassCard variant="purple">
      <GlassCardHeader title={title} />
      <GlassCardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
            <XAxis stroke="rgba(232, 240, 255, 0.5)" />
            <YAxis stroke="rgba(232, 240, 255, 0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 15, 58, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
              }}
            />
            <Legend />
            {areas.map((area) => (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.name}
                stackId="1"
                stroke={area.color}
                fill={area.color}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * InsightCard Component
 * Design: AI-generated insights and recommendations
 */

interface Insight {
  id: string;
  type: 'alert' | 'opportunity' | 'trend' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
}

interface InsightCardProps {
  insights: Insight[];
  title?: string;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insights,
  title = 'AI洞察与建议',
}) => {
  const typeIcons = {
    alert: '⚠️',
    opportunity: '💡',
    trend: '📈',
    recommendation: '🎯',
  };

  const typeColors = {
    alert: 'bg-red-400/10 border-red-400/30 text-red-400',
    opportunity: 'bg-green-400/10 border-green-400/30 text-green-400',
    trend: 'bg-blue-400/10 border-blue-400/30 text-blue-400',
    recommendation: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
  };

  return (
    <GlassCard variant="pink">
      <GlassCardHeader title={title} subtitle="实时AI分析" />
      <GlassCardContent className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${typeColors[insight.type]}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{typeIcons[insight.type]}</span>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{insight.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                {insight.action && (
                  <p className="text-xs text-foreground mt-2 font-semibold">
                    建议: {insight.action}
                  </p>
                )}
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-foreground/10">
                {insight.impact === 'high' ? '高' : insight.impact === 'medium' ? '中' : '低'}
              </span>
            </div>
          </div>
        ))}
      </GlassCardContent>
    </GlassCard>
  );
};
