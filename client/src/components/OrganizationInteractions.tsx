import React, { useState } from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassButton } from './GlassCard';
import { Plus, Play, Download, FileText, Zap } from 'lucide-react';

/**
 * OrgStructureSimulationCard Component
 * Design: Simulate different organizational structure changes
 */

interface OrgSimulation {
  id: string;
  name: string;
  description: string;
  expectedImpact: number; // 0-100
  complexity: 'low' | 'medium' | 'high';
}

interface OrgStructureSimulationProps {
  simulations: OrgSimulation[];
  onRunSimulation: (simulationId: string) => void;
  onCreateSimulation: () => void;
  isRunning?: boolean;
}

export const OrgStructureSimulationCard: React.FC<OrgStructureSimulationProps> = ({
  simulations,
  onRunSimulation,
  onCreateSimulation,
  isRunning = false,
}) => {
  const complexityColors = {
    low: 'bg-green-400/10 text-green-400 border-green-400/30',
    medium: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    high: 'bg-red-400/10 text-red-400 border-red-400/30',
  };

  const complexityLabel = {
    low: '低',
    medium: '中',
    high: '高',
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="组织结构模拟"
        subtitle="模拟不同组织架构变更的效果"
        icon={<Zap className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        {/* Simulations List */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {simulations.map((sim) => (
            <div
              key={sim.id}
              className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/30"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{sim.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sim.description}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    complexityColors[sim.complexity]
                  }`}
                >
                  {complexityLabel[sim.complexity]}复杂度
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neon-cyan"
                      style={{ width: `${sim.expectedImpact}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    预期影响: {sim.expectedImpact}%
                  </p>
                </div>
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onRunSimulation(sim.id)}
                  disabled={isRunning}
                >
                  <Play className="w-3 h-3" />
                </GlassButton>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Simulation */}
        <GlassButton
          variant="ghost"
          onClick={onCreateSimulation}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          创建新模拟方案
        </GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * CollaborationNetworkEditCard Component
 * Design: Edit and visualize team collaboration relationships
 */

interface TeamNode {
  id: string;
  name: string;
  role: string;
  connections: string[];
}

interface CollaborationEditProps {
  teams: TeamNode[];
  onUpdateTeam: (team: TeamNode) => void;
  onAddConnection: (fromId: string, toId: string) => void;
}

export const CollaborationNetworkEditCard: React.FC<CollaborationEditProps> = ({
  teams,
  onUpdateTeam,
  onAddConnection,
}) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [newConnectionTarget, setNewConnectionTarget] = useState<string>('');

  return (
    <GlassCard variant="purple">
      <GlassCardHeader
        title="协作关系编辑"
        subtitle="可视化编辑团队协作网络"
        icon={<Plus className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-4">
        {/* Team Selection */}
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            选择团队
          </label>
          <select
            value={selectedTeam || ''}
            onChange={(e) => setSelectedTeam(e.target.value || null)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-neon-purple"
          >
            <option value="">-- 选择团队 --</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name} ({team.role})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Team Details */}
        {selectedTeam && (
          <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/30">
            <p className="text-sm font-semibold text-foreground mb-3">
              {teams.find((t) => t.id === selectedTeam)?.name}
            </p>

            {/* Current Connections */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-foreground mb-2">当前协作关系</p>
              <div className="space-y-1">
                {teams
                  .find((t) => t.id === selectedTeam)
                  ?.connections.map((connId) => (
                    <div
                      key={connId}
                      className="text-xs text-muted-foreground p-1 bg-neon-purple/20 rounded"
                    >
                      → {teams.find((t) => t.id === connId)?.name}
                    </div>
                  ))}
              </div>
            </div>

            {/* Add New Connection */}
            <div>
              <p className="text-xs font-semibold text-foreground mb-2">添加协作关系</p>
              <div className="flex gap-2">
                <select
                  value={newConnectionTarget}
                  onChange={(e) => setNewConnectionTarget(e.target.value)}
                  className="flex-1 px-2 py-1 bg-input border border-border rounded text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-neon-purple"
                >
                  <option value="">-- 选择目标 --</option>
                  {teams
                    .filter((t) => t.id !== selectedTeam)
                    .map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                </select>
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (newConnectionTarget) {
                      onAddConnection(selectedTeam, newConnectionTarget);
                      setNewConnectionTarget('');
                    }
                  }}
                >
                  添加
                </GlassButton>
              </div>
            </div>
          </div>
        )}
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * OptimizationPlanExportCard Component
 * Design: Export organization optimization plans
 */

interface OptimizationExportProps {
  onExport: (format: 'pdf' | 'excel') => void;
  isExporting?: boolean;
}

export const OptimizationPlanExportCard: React.FC<OptimizationExportProps> = ({
  onExport,
  isExporting = false,
}) => {
  return (
    <GlassCard variant="pink">
      <GlassCardHeader
        title="优化方案导出"
        subtitle="生成详细的组织优化实施计划"
        icon={<Download className="w-5 h-5" />}
      />
      <GlassCardContent>
        <div className="space-y-3">
          <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/30">
            <p className="text-sm font-semibold text-foreground mb-2">方案包含</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ 详细的组织结构变更方案</li>
              <li>✓ 实施时间表和里程碑</li>
              <li>✓ 风险评估和应对措施</li>
              <li>✓ 成本效益分析</li>
              <li>✓ 员工沟通计划</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <GlassButton
              variant="primary"
              onClick={() => onExport('pdf')}
              disabled={isExporting}
              className="flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              PDF
            </GlassButton>
            <GlassButton
              variant="secondary"
              onClick={() => onExport('excel')}
              disabled={isExporting}
              className="flex items-center justify-center"
            >
              <FileText className="w-4 h-4 mr-1" />
              Excel
            </GlassButton>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

/**
 * HRPlanningScenarioCard Component
 * Design: Create HR planning scenarios
 */

interface HRPlanningScenarioProps {
  onCreateScenario: (scenario: { name: string; description: string }) => void;
  isCreating?: boolean;
}

export const HRPlanningScenarioCard: React.FC<HRPlanningScenarioProps> = ({
  onCreateScenario,
  isCreating = false,
}) => {
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDesc, setScenarioDesc] = useState('');

  const handleCreate = () => {
    if (scenarioName.trim()) {
      onCreateScenario({
        name: scenarioName,
        description: scenarioDesc,
      });
      setScenarioName('');
      setScenarioDesc('');
    }
  };

  return (
    <GlassCard variant="cyan">
      <GlassCardHeader
        title="HR规划场景"
        subtitle="创建不同的人力资源规划场景"
        icon={<Plus className="w-5 h-5" />}
      />
      <GlassCardContent className="space-y-3">
        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            场景名称
          </label>
          <input
            type="text"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            placeholder="例如: 业务扩展场景"
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground mb-2 block">
            场景描述
          </label>
          <textarea
            value={scenarioDesc}
            onChange={(e) => setScenarioDesc(e.target.value)}
            placeholder="描述该场景下的假设条件..."
            className="w-full h-20 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan resize-none"
          />
        </div>

        <GlassButton
          variant="primary"
          onClick={handleCreate}
          disabled={isCreating || !scenarioName.trim()}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          创建场景
        </GlassButton>
      </GlassCardContent>
    </GlassCard>
  );
};
