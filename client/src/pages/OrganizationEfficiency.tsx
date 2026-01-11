import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent } from '@/components/GlassCard';
import {
  OrgStructureSimulationCard,
  CollaborationNetworkEditCard,
  OptimizationPlanExportCard,
  HRPlanningScenarioCard,
} from '@/components/OrganizationInteractions';
import {
  CollaborationNetworkCard,
  WorkEfficiencyCard,
  OrganizationOptimizationCard,
  HRPlanningCard,
  TrainingAndDevelopmentCard,
} from '@/components/OrganizationAnalysis';

/**
 * OrganizationEfficiency Page
 * Design: Organization structure optimization and HR planning
 */

const mockSimulations = [
  {
    id: 'sim1',
    name: '扁平化组织结构',
    description: '减少管理层级，提高决策效率',
    expectedImpact: 78,
    complexity: 'high' as const,
  },
  {
    id: 'sim2',
    name: '矩阵式组织',
    description: '按项目和职能双重管理',
    expectedImpact: 65,
    complexity: 'high' as const,
  },
  {
    id: 'sim3',
    name: '中心化支持部门',
    description: '集中HR、财务等支持职能',
    expectedImpact: 72,
    complexity: 'medium' as const,
  },
];

const mockTeams = [
  { id: 'team1', name: '工程部', role: '技术', connections: ['team2', 'team3'] },
  { id: 'team2', name: '产品部', role: '产品', connections: ['team1', 'team4'] },
  { id: 'team3', name: '设计部', role: '设计', connections: ['team1'] },
  { id: 'team4', name: '运营部', role: '运营', connections: ['team2'] },
];

const mockOptimizationSuggestions = [
  {
    id: 'opt1',
    title: '建立跨部门协作小组',
    description: '加强产品、工程、设计之间的沟通',
    impact: 'high' as const,
    effort: 'medium' as const,
    expectedBenefit: '产品上市时间缩短20%',
  },
  {
    id: 'opt2',
    title: '优化招聘流程',
    description: '简化招聘步骤，缩短招聘周期',
    impact: 'medium' as const,
    effort: 'low' as const,
    expectedBenefit: '招聘周期缩短15%',
  },
  {
    id: 'opt3',
    title: '建立知识管理系统',
    description: '集中管理公司知识和最佳实践',
    impact: 'high' as const,
    effort: 'high' as const,
    expectedBenefit: '员工效率提升25%',
  },
];

const mockHRPlans = [
  {
    period: 'Q1 2024',
    requiredHeadcount: 350,
    currentHeadcount: 320,
    gap: 30,
    costEstimate: 500000,
  },
  {
    period: 'Q2 2024',
    requiredHeadcount: 380,
    currentHeadcount: 350,
    gap: 30,
    costEstimate: 500000,
  },
  {
    period: 'Q3 2024',
    requiredHeadcount: 420,
    currentHeadcount: 380,
    gap: 40,
    costEstimate: 650000,
  },
];

const mockSkillGaps = [
  {
    skillName: 'AI/ML技术',
    currentLevel: 35,
    requiredLevel: 75,
    affectedEmployees: 45,
    trainingRecommendation: '推荐在线课程 + 内部工作坊',
  },
  {
    skillName: '数据分析',
    currentLevel: 60,
    requiredLevel: 85,
    affectedEmployees: 32,
    trainingRecommendation: '高级数据分析培训',
  },
  {
    skillName: '项目管理',
    currentLevel: 70,
    requiredLevel: 88,
    affectedEmployees: 28,
    trainingRecommendation: 'PMP认证课程',
  },
];

const mockTeamsCollaboration = [
  {
    id: 'team1',
    name: '工程部',
    department: '技术',
    collaborationScore: 85,
    connectionCount: 12,
  },
  {
    id: 'team2',
    name: '产品部',
    department: '产品',
    collaborationScore: 78,
    connectionCount: 9,
  },
  {
    id: 'team3',
    name: '设计部',
    department: '设计',
    collaborationScore: 82,
    connectionCount: 8,
  },
];

const mockEfficiencyMetrics = [
  { name: '项目交付效率', score: 82, benchmark: 75, trend: 'up' as const },
  { name: '代码质量', score: 88, benchmark: 80, trend: 'up' as const },
  { name: '团队满意度', score: 76, benchmark: 70, trend: 'stable' as const },
  { name: '知识共享', score: 65, benchmark: 75, trend: 'down' as const },
];

export default function OrganizationEfficiency() {
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);

  const handleRunSimulation = (simulationId: string) => {
    setIsRunningSimulation(true);
    setTimeout(() => {
      console.log('Simulation completed:', simulationId);
      setIsRunningSimulation(false);
    }, 2000);
  };

  const handleCreateSimulation = () => {
    console.log('Creating new simulation');
  };

  const handleUpdateTeam = (team: any) => {
    console.log('Team updated:', team);
  };

  const handleAddConnection = (fromId: string, toId: string) => {
    console.log('Connection added:', fromId, '→', toId);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log('Exporting optimization plan as:', format);
  };

  const handleCreateScenario = (scenario: any) => {
    console.log('Scenario created:', scenario);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">组织效能分析</h1>
        <p className="text-muted-foreground">
          优化组织结构、分析协作效率、规划人力资源
        </p>
      </div>

      {/* Organization Simulation */}
      <OrgStructureSimulationCard
        simulations={mockSimulations}
        onRunSimulation={handleRunSimulation}
        onCreateSimulation={handleCreateSimulation}
        isRunning={isRunningSimulation}
      />

      {/* Collaboration Network */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CollaborationNetworkCard
          teams={mockTeamsCollaboration}
          totalCollaborationStrength={82}
        />
        <CollaborationNetworkEditCard
          teams={mockTeams}
          onUpdateTeam={handleUpdateTeam}
          onAddConnection={handleAddConnection}
        />
      </div>

      {/* Work Efficiency */}
      <WorkEfficiencyCard
        metrics={mockEfficiencyMetrics}
        overallProductivity={78}
      />

      {/* Organization Optimization */}
      <OrganizationOptimizationCard suggestions={mockOptimizationSuggestions} />

      {/* HR Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HRPlanningCard plans={mockHRPlans} />
        <HRPlanningScenarioCard onCreateScenario={handleCreateScenario} />
      </div>

      {/* Training and Development */}
      <TrainingAndDevelopmentCard skillGaps={mockSkillGaps} />

      {/* Export Optimization Plan */}
      <OptimizationPlanExportCard onExport={handleExport} />
    </div>
  );
}
