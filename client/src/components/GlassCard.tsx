import React from 'react';
import { cn } from '@/lib/utils';

/**
 * GlassCard Component
 * Design: Glassmorphism with neon borders and glow effects
 * Supports multiple border color variants for visual hierarchy
 */

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'purple' | 'pink' | 'default';
  glowIntensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant = 'default',
      glowIntensity = 'medium',
      interactive = true,
      children,
      ...props
    },
    ref
  ) => {
    const borderClasses = {
      cyan: 'neon-border-cyan',
      purple: 'neon-border-purple',
      pink: 'neon-border-pink',
      default: 'border-border',
    };

    const glowClasses = {
      low: 'shadow-lg',
      medium: 'shadow-xl',
      high: 'shadow-2xl pulse-glow',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'glass-card',
          borderClasses[variant],
          glowClasses[glowIntensity],
          interactive && 'hover:shadow-2xl hover:neon-border-cyan transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

/**
 * GlassCardHeader Component
 * Design: Tech-forward header with Orbitron font
 */
interface GlassCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const GlassCardHeader = React.forwardRef<
  HTMLDivElement,
  GlassCardHeaderProps
>(({ className, title, subtitle, icon, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 border-b border-border/50', className)}
    {...props}
  >
    <div className="flex items-center gap-3">
      {icon && <div className="text-neon-cyan">{icon}</div>}
      <div className="flex-1">
        {title && (
          <h3 className="font-orbitron font-bold text-lg text-foreground tracking-wider">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
    </div>
    {children}
  </div>
));

GlassCardHeader.displayName = 'GlassCardHeader';

/**
 * GlassCardContent Component
 * Design: Padding and spacing optimized for data display
 */
interface GlassCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassCardContent = React.forwardRef<
  HTMLDivElement,
  GlassCardContentProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));

GlassCardContent.displayName = 'GlassCardContent';

/**
 * GlassCardFooter Component
 * Design: Separated footer section with border
 */
interface GlassCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassCardFooter = React.forwardRef<
  HTMLDivElement,
  GlassCardFooterProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-4 border-t border-border/50 flex gap-2', className)}
    {...props}
  />
));

GlassCardFooter.displayName = 'GlassCardFooter';

/**
 * StatCard Component
 * Design: Specialized card for displaying key metrics
 */
interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'pink';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  change,
  trend = 'neutral',
  icon,
  variant = 'cyan',
}) => {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-muted-foreground',
  };

  return (
    <GlassCard variant={variant} className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="tech-label text-muted-foreground mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {change !== undefined && (
            <p className={cn('text-sm mt-2', trendColor[trend])}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && <div className="text-neon-cyan text-2xl">{icon}</div>}
      </div>
    </GlassCard>
  );
};

/**
 * GlassButton Component
 * Design: Neon-styled button with glow effect
 */
interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses =
      'font-semibold transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary:
        'bg-neon-cyan text-deep-blue hover:shadow-lg hover:shadow-neon-cyan/50 focus:ring-neon-cyan',
      secondary:
        'bg-neon-purple text-white hover:shadow-lg hover:shadow-neon-purple/50 focus:ring-neon-purple',
      ghost:
        'bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 focus:ring-neon-cyan',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

GlassButton.displayName = 'GlassButton';
