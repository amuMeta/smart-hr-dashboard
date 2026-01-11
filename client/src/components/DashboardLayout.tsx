import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

/**
 * DashboardLayout Component
 * Design: Asymmetric sidebar layout with glassmorphism
 * Provides main navigation and responsive structure
 */

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode;
  headerContent?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarContent,
  headerContent,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-sidebar/80 backdrop-blur-md border-r border-sidebar-border',
          'transition-transform duration-300 z-40',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'md:relative md:translate-x-0'
        )}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="font-orbitron font-bold text-xl text-neon-cyan tracking-wider">
              HR AI
            </h1>
            <p className="text-xs text-muted-foreground mt-1 tracking-widest">
              INTELLIGENCE PLATFORM
            </p>
          </div>

          {/* Sidebar Content */}
          {sidebarContent}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card/50 backdrop-blur-md border-b border-border flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-accent/20 rounded-md transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-neon-cyan" />
            ) : (
              <Menu className="w-5 h-5 text-neon-cyan" />
            )}
          </button>

          {/* Header Content */}
          <div className="flex-1">{headerContent}</div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {/* Overlay for mobile when sidebar is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 md:hidden z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {children}
        </main>
      </div>
    </div>
  );
};

/**
 * NavItem Component
 * Design: Navigation items with neon highlight
 */
interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
}

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ icon, label, active = false, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300',
        'text-left text-sm font-medium',
        active
          ? 'bg-neon-cyan/20 text-neon-cyan border-l-2 border-neon-cyan'
          : 'text-foreground/70 hover:text-foreground hover:bg-accent/10',
        className
      )}
      {...props}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  )
);

NavItem.displayName = 'NavItem';

/**
 * GridLayout Component
 * Design: Asymmetric grid for dashboard cards
 */
interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ children, className }) => (
  <div
    className={cn(
      'grid gap-6 p-6',
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      'auto-rows-max',
      className
    )}
  >
    {children}
  </div>
);

/**
 * GridItem Component
 * Design: Flexible grid item with span support
 */
interface GridItemProps {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
}) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3',
    4: 'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
  };

  return (
    <div className={cn(spanClasses[colSpan], rowSpanClasses[rowSpan], className)}>
      {children}
    </div>
  );
};
