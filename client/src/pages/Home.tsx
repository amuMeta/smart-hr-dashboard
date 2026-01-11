import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { OrbBackground } from '@/components/OrbBackground';
import { DashboardLayout, NavItem, GridLayout, GridItem } from '@/components/DashboardLayout';
import { GlassCard, GlassCardHeader, GlassCardContent, StatCard } from '@/components/GlassCard';
import {
  Users,
  TrendingUp,
  Brain,
  Zap,
  BarChart3,
  AlertCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

/**
 * Home Page - HR Dashboard
 * Design: Deep space cyberpunk with glassmorphism
 * Displays AI-powered HR analytics and insights
 */

// Mock data for charts
const talentTrendData = [
  { month: 'Jan', hired: 45, departed: 12, risk: 8 },
  { month: 'Feb', hired: 52, departed: 15, risk: 11 },
  { month: 'Mar', hired: 48, departed: 10, risk: 9 },
  { month: 'Apr', hired: 61, departed: 18, risk: 14 },
  { month: 'May', hired: 55, departed: 12, risk: 7 },
];

const departmentData = [
  { name: 'Engineering', value: 320, color: '#00d9ff' },
  { name: 'Sales', value: 180, color: '#b026ff' },
  { name: 'HR', value: 85, color: '#ff006e' },
  { name: 'Operations', value: 145, color: '#00f5ff' },
];

const emotionData = [
  { name: 'Satisfied', value: 65, color: '#00d9ff' },
  { name: 'Neutral', value: 25, color: '#b026ff' },
  { name: 'Concerned', value: 10, color: '#ff006e' },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState('dashboard');

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <DashboardContent />;
      case 'talent':
        return <TalentAnalysisContent />;
      case 'recruitment':
        return <RecruitmentContent />;
      case 'emotion':
        return <EmotionAnalysisContent />;
      case 'organization':
        return <OrganizationContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background */}
      <OrbBackground />

      {/* Dashboard Layout */}
      <div className="relative z-10">
        <DashboardLayout
          sidebarContent={
            <nav className="space-y-2">
              <NavItem
                icon={<BarChart3 />}
                label="仪表板"
                active={activeNav === 'dashboard'}
                onClick={() => setActiveNav('dashboard')}
              />
              <NavItem
                icon={<Users />}
                label="人才画像"
                active={activeNav === 'talent'}
                onClick={() => window.location.href = '/talent'}
              />
              <NavItem
                icon={<Zap />}
                label="智能招聘"
                active={activeNav === 'recruitment'}
                onClick={() => window.location.href = '/recruitment'}
              />
              <NavItem
                icon={<Brain />}
                label="情绪分析"
                active={activeNav === 'emotion'}
                onClick={() => window.location.href = '/wellbeing'}
              />
              <NavItem
                icon={<TrendingUp />}
                label="组织效能"
                active={activeNav === 'organization'}
                onClick={() => window.location.href = '/organization'}
              />

              <div className="my-6 border-t border-border/50" />

              <NavItem icon={<Settings />} label="设置" />
              <NavItem icon={<LogOut />} label="退出登录" />
            </nav>
          }
          headerContent={
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-orbitron font-bold text-foreground">
                  智能人力资源平台
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  AI驱动的人才管理和组织效能分析
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>
          }
        >
          {renderContent()}
        </DashboardLayout>
      </div>
    </div>
  );
}

/**
 * Dashboard Content
 * Design: Overview of key metrics and AI insights
 */
function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="总员工数"
          value="730"
          unit="人"
          change={5.2}
          trend="up"
          icon={<Users />}
          variant="cyan"
        />
        <StatCard
          label="离职风险"
          value="42"
          unit="人"
          change={-3.1}
          trend="down"
          icon={<AlertCircle />}
          variant="pink"
        />
        <StatCard
          label="招聘进度"
          value="68%"
          unit=""
          change={12.5}
          trend="up"
          icon={<Zap />}
          variant="purple"
        />
        <StatCard
          label="员工满意度"
          value="7.8"
          unit="/10"
          change={2.3}
          trend="up"
          icon={<Brain />}
          variant="cyan"
        />
      </div>

      {/* Main Charts */}
      <GridLayout>
        {/* Talent Trend Chart */}
        <GridItem colSpan={2}>
          <GlassCard variant="cyan">
            <GlassCardHeader title="人才流动趋势" subtitle="过去5个月的招聘和离职数据" />
            <GlassCardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={talentTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
                  <XAxis stroke="rgba(232, 240, 255, 0.5)" />
                  <YAxis stroke="rgba(232, 240, 255, 0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 15, 58, 0.8)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hired"
                    stroke="#00d9ff"
                    strokeWidth={2}
                    dot={{ fill: '#00d9ff', r: 4 }}
                    name="新招聘"
                  />
                  <Line
                    type="monotone"
                    dataKey="departed"
                    stroke="#ff006e"
                    strokeWidth={2}
                    dot={{ fill: '#ff006e', r: 4 }}
                    name="离职"
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#b026ff"
                    strokeWidth={2}
                    dot={{ fill: '#b026ff', r: 4 }}
                    name="风险预警"
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCardContent>
          </GlassCard>
        </GridItem>

        {/* Department Distribution */}
        <GridItem colSpan={1}>
          <GlassCard variant="purple">
            <GlassCardHeader title="部门分布" subtitle="按人数统计" />
            <GlassCardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 15, 58, 0.8)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {departmentData.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-foreground">{dept.name}</span>
                    </div>
                    <span className="text-muted-foreground">{dept.value}</span>
                  </div>
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>
        </GridItem>

        {/* AI Insights */}
        <GridItem colSpan={1}>
          <GlassCard variant="pink" glowIntensity="high">
            <GlassCardHeader title="AI洞察" subtitle="实时预警" />
            <GlassCardContent className="space-y-3">
              <div className="p-3 bg-neon-pink/10 rounded-md border border-neon-pink/30">
                <p className="text-sm text-foreground">
                  <span className="font-bold text-neon-pink">⚠️ 高风险：</span>
                  工程部门3名员工离职风险高
                </p>
              </div>
              <div className="p-3 bg-neon-cyan/10 rounded-md border border-neon-cyan/30">
                <p className="text-sm text-foreground">
                  <span className="font-bold text-neon-cyan">✓ 机会：</span>
                  销售部门招聘进度超预期
                </p>
              </div>
              <div className="p-3 bg-neon-purple/10 rounded-md border border-neon-purple/30">
                <p className="text-sm text-foreground">
                  <span className="font-bold text-neon-purple">📊 趋势：</span>
                  Q2人才需求预计增长15%
                </p>
              </div>
            </GlassCardContent>
          </GlassCard>
        </GridItem>

        {/* Employee Satisfaction */}
        <GridItem colSpan={1}>
          <GlassCard variant="cyan">
            <GlassCardHeader title="员工情绪" subtitle="满意度分布" />
            <GlassCardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {emotionData.map((emotion) => (
                  <div key={emotion.name} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{emotion.name}</span>
                    <span
                      className="font-bold"
                      style={{ color: emotion.color }}
                    >
                      {emotion.value}%
                    </span>
                  </div>
                ))}
              </div>
            </GlassCardContent>
          </GlassCard>
        </GridItem>
      </GridLayout>
    </div>
  );
}

/**
 * Talent Analysis Content
 */
function TalentAnalysisContent() {
  return (
    <div className="p-6">
      <GlassCard variant="cyan" className="mb-6">
        <GlassCardHeader title="人才画像与预测分析" subtitle="AI驱动的人才洞察" />
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-sm text-muted-foreground mb-2">AI简历解析</p>
              <p className="text-2xl font-bold text-neon-cyan">245</p>
              <p className="text-xs text-muted-foreground mt-2">已分析简历</p>
            </div>
            <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-sm text-muted-foreground mb-2">离职风险预测</p>
              <p className="text-2xl font-bold text-neon-purple">42</p>
              <p className="text-xs text-muted-foreground mt-2">高风险员工</p>
            </div>
            <div className="p-4 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
              <p className="text-sm text-muted-foreground mb-2">成长路径推荐</p>
              <p className="text-2xl font-bold text-neon-pink">156</p>
              <p className="text-xs text-muted-foreground mt-2">获得建议员工</p>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard variant="purple">
          <GlassCardHeader title="离职风险预测模型" />
          <GlassCardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">工作满意度</span>
                  <span className="text-sm text-neon-cyan">65%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">薪资竞争力</span>
                  <span className="text-sm text-neon-purple">72%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-purple" style={{ width: '72%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">职业发展</span>
                  <span className="text-sm text-neon-pink">58%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-pink" style={{ width: '58%' }} />
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="cyan">
          <GlassCardHeader title="人才成长路径推荐" />
          <GlassCardContent>
            <div className="space-y-3">
              <div className="p-3 bg-neon-cyan/10 rounded-lg border-l-2 border-neon-cyan">
                <p className="text-sm font-semibold text-foreground">技能提升方向</p>
                <p className="text-xs text-muted-foreground mt-1">数据分析、项目管理</p>
              </div>
              <div className="p-3 bg-neon-purple/10 rounded-lg border-l-2 border-neon-purple">
                <p className="text-sm font-semibold text-foreground">晋升机会</p>
                <p className="text-xs text-muted-foreground mt-1">6-12个月内可晋升主管</p>
              </div>
              <div className="p-3 bg-neon-pink/10 rounded-lg border-l-2 border-neon-pink">
                <p className="text-sm font-semibold text-foreground">培训建议</p>
                <p className="text-xs text-muted-foreground mt-1">领导力发展计划</p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}

/**
 * Recruitment Content
 */
function RecruitmentContent() {
  return (
    <div className="p-6">
      <GlassCard variant="purple" className="mb-6">
        <GlassCardHeader title="智能招聘助手" subtitle="AI驱动的招聘优化" />
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-sm text-muted-foreground mb-2">简历匹配度</p>
              <p className="text-2xl font-bold text-neon-purple">89%</p>
              <p className="text-xs text-muted-foreground mt-2">平均匹配率</p>
            </div>
            <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-sm text-muted-foreground mb-2">面试分析</p>
              <p className="text-2xl font-bold text-neon-cyan">34</p>
              <p className="text-xs text-muted-foreground mt-2">已分析面试</p>
            </div>
            <div className="p-4 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
              <p className="text-sm text-muted-foreground mb-2">人才库推荐</p>
              <p className="text-2xl font-bold text-neon-pink">128</p>
              <p className="text-xs text-muted-foreground mt-2">激活候选人</p>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard variant="cyan">
          <GlassCardHeader title="简历智能匹配" />
          <GlassCardContent>
            <div className="space-y-3">
              <div className="p-3 bg-neon-cyan/10 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-foreground">张三</p>
                    <p className="text-xs text-muted-foreground">高级工程师</p>
                  </div>
                  <span className="text-lg font-bold text-neon-cyan">95%</span>
                </div>
              </div>
              <div className="p-3 bg-neon-purple/10 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-foreground">李四</p>
                    <p className="text-xs text-muted-foreground">产品经理</p>
                  </div>
                  <span className="text-lg font-bold text-neon-purple">87%</span>
                </div>
              </div>
              <div className="p-3 bg-neon-pink/10 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-foreground">王五</p>
                    <p className="text-xs text-muted-foreground">设计师</p>
                  </div>
                  <span className="text-lg font-bold text-neon-pink">76%</span>
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="purple">
          <GlassCardHeader title="面试情绪分析" />
          <GlassCardContent>
            <div className="space-y-3">
              <div className="p-3 bg-neon-purple/10 rounded-lg border-l-2 border-neon-purple">
                <p className="text-sm font-semibold text-foreground">情绪状态</p>
                <p className="text-xs text-muted-foreground mt-1">自信、专业、积极</p>
              </div>
              <div className="p-3 bg-neon-cyan/10 rounded-lg border-l-2 border-neon-cyan">
                <p className="text-sm font-semibold text-foreground">能力评估</p>
                <p className="text-xs text-muted-foreground mt-1">技术深度、沟通能力强</p>
              </div>
              <div className="p-3 bg-neon-pink/10 rounded-lg border-l-2 border-neon-pink">
                <p className="text-sm font-semibold text-foreground">文化匹配</p>
                <p className="text-xs text-muted-foreground mt-1">价值观对齐度高</p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}

/**
 * Emotion Analysis Content
 */
function EmotionAnalysisContent() {
  return (
    <div className="p-6">
      <GlassCard variant="pink" className="mb-6">
        <GlassCardHeader title="员工体验与情绪分析" subtitle="实时员工状态监测" />
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
              <p className="text-sm text-muted-foreground mb-2">情绪监测</p>
              <p className="text-2xl font-bold text-neon-pink">7.8/10</p>
              <p className="text-xs text-muted-foreground mt-2">团队平均情绪</p>
            </div>
            <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-sm text-muted-foreground mb-2">智能问答</p>
              <p className="text-2xl font-bold text-neon-cyan">1,245</p>
              <p className="text-xs text-muted-foreground mt-2">日均问题解答</p>
            </div>
            <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-sm text-muted-foreground mb-2">满意度预测</p>
              <p className="text-2xl font-bold text-neon-purple">82%</p>
              <p className="text-xs text-muted-foreground mt-2">预测满意度</p>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard variant="cyan">
          <GlassCardHeader title="员工情绪监测" />
          <GlassCardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">工作热情</span>
                  <span className="text-sm text-neon-cyan">78%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">工作压力</span>
                  <span className="text-sm text-neon-pink">35%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-pink" style={{ width: '35%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-foreground">团队凝聚力</span>
                  <span className="text-sm text-neon-purple">85%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-neon-purple" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="purple">
          <GlassCardHeader title="满意度影响因素" />
          <GlassCardContent>
            <div className="space-y-3">
              <div className="p-3 bg-neon-purple/10 rounded-lg border-l-2 border-neon-purple">
                <p className="text-sm font-semibold text-foreground">薪资福利</p>
                <p className="text-xs text-muted-foreground mt-1">影响度: 35%</p>
              </div>
              <div className="p-3 bg-neon-cyan/10 rounded-lg border-l-2 border-neon-cyan">
                <p className="text-sm font-semibold text-foreground">职业发展</p>
                <p className="text-xs text-muted-foreground mt-1">影响度: 28%</p>
              </div>
              <div className="p-3 bg-neon-pink/10 rounded-lg border-l-2 border-neon-pink">
                <p className="text-sm font-semibold text-foreground">工作环境</p>
                <p className="text-xs text-muted-foreground mt-1">影响度: 22%</p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}

/**
 * Organization Content
 */
function OrganizationContent() {
  return (
    <div className="p-6">
      <GlassCard variant="cyan" className="mb-6">
        <GlassCardHeader title="组织效能分析" subtitle="AI驱动的组织优化" />
        <GlassCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30">
              <p className="text-sm text-muted-foreground mb-2">协作网络</p>
              <p className="text-2xl font-bold text-neon-cyan">12</p>
              <p className="text-xs text-muted-foreground mt-2">核心协作团队</p>
            </div>
            <div className="p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
              <p className="text-sm text-muted-foreground mb-2">工作效率</p>
              <p className="text-2xl font-bold text-neon-purple">+18%</p>
              <p className="text-xs text-muted-foreground mt-2">环比增长</p>
            </div>
            <div className="p-4 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
              <p className="text-sm text-muted-foreground mb-2">优化建议</p>
              <p className="text-2xl font-bold text-neon-pink">5</p>
              <p className="text-xs text-muted-foreground mt-2">待实施方案</p>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard variant="purple">
          <GlassCardHeader title="团队协作网络" />
          <GlassCardContent>
            <div className="space-y-3">
              <div className="p-3 bg-neon-purple/10 rounded-lg">
                <p className="text-sm font-semibold text-foreground">工程部</p>
                <p className="text-xs text-muted-foreground mt-1">协作强度: 95% | 成员: 45人</p>
              </div>
              <div className="p-3 bg-neon-cyan/10 rounded-lg">
                <p className="text-sm font-semibold text-foreground">产品部</p>
                <p className="text-xs text-muted-foreground mt-1">协作强度: 88% | 成员: 28人</p>
              </div>
              <div className="p-3 bg-neon-pink/10 rounded-lg">
                <p className="text-sm font-semibold text-foreground">销售部</p>
                <p className="text-xs text-muted-foreground mt-1">协作强度: 72% | 成员: 35人</p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>

        <GlassCard variant="cyan">
          <GlassCardHeader title="组织结构优化建议" />
          <GlassCardContent>
            <div className="space-y-3">
              <div className="p-3 bg-neon-cyan/10 rounded-lg border-l-2 border-neon-cyan">
                <p className="text-sm font-semibold text-foreground">跨部门协作</p>
                <p className="text-xs text-muted-foreground mt-1">建议增加产品-工程沟通</p>
              </div>
              <div className="p-3 bg-neon-purple/10 rounded-lg border-l-2 border-neon-purple">
                <p className="text-sm font-semibold text-foreground">资源配置</p>
                <p className="text-xs text-muted-foreground mt-1">建议调整销售支持资源</p>
              </div>
              <div className="p-3 bg-neon-pink/10 rounded-lg border-l-2 border-neon-pink">
                <p className="text-sm font-semibold text-foreground">流程优化</p>
                <p className="text-xs text-muted-foreground mt-1">建议简化审批流程</p>
              </div>
            </div>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
}
