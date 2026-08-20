import React from 'react';
import { Rocket, Target, TrendingUp, Laptop, Megaphone, Settings, Award, Layers, Search, Sparkles, BarChart2, Zap, DollarSign, Code2 } from 'lucide-react';
import { Theme } from '../../types';

interface IconBadgeProps {
  iconName: string;
  theme: Theme;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: 'blue' | 'magenta' | 'cyan' | 'purple';
  floating?: boolean;
}

export const IconBadge3D: React.FC<IconBadgeProps> = ({
  iconName,
  theme,
  size = 'md',
  glowColor = 'magenta',
  floating = true
}) => {
  const isDark = theme === 'dark';

  const renderIcon = () => {
    const iconProps = { className: size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : size === 'xl' ? 'w-10 h-10' : 'w-6 h-6' };
    switch (iconName) {
      case 'rocket': return <Rocket {...iconProps} />;
      case 'target': return <Target {...iconProps} />;
      case 'chart':
      case 'trending-up': return <TrendingUp {...iconProps} />;
      case 'laptop': return <Laptop {...iconProps} />;
      case 'megaphone': return <Megaphone {...iconProps} />;
      case 'settings': return <Settings {...iconProps} />;
      case 'award': return <Award {...iconProps} />;
      case 'layers': return <Layers {...iconProps} />;
      case 'search': return <Search {...iconProps} />;
      case 'bar-chart': return <BarChart2 {...iconProps} />;
      case 'zap': return <Zap {...iconProps} />;
      case 'dollar': return <DollarSign {...iconProps} />;
      case 'code': return <Code2 {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-14 h-14 rounded-2xl',
    lg: 'w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-3xl',
    xl: 'w-20 h-20 sm:w-[88px] sm:h-[88px] rounded-3xl'
  }[size];

  const colorStyles = {
    blue: {
      bg: 'from-[#4c8dff]/25 to-[#5ce1e6]/15',
      border: 'rgba(76, 141, 255, 0.5)',
      glow: 'rgba(76, 141, 255, 0.4)',
      text: 'text-[#4c8dff]'
    },
    magenta: {
      bg: 'from-[#8b5cf6]/25 to-[#3b82f6]/15',
      border: 'rgba(139, 92, 246, 0.5)',
      glow: 'rgba(139, 92, 246, 0.4)',
      text: 'text-[#8b5cf6]'
    },
    cyan: {
      bg: 'from-[#5ce1e6]/25 to-[#4c8dff]/15',
      border: 'rgba(92, 225, 230, 0.5)',
      glow: 'rgba(92, 225, 230, 0.4)',
      text: 'text-[#5ce1e6]'
    },
    purple: {
      bg: 'from-[#9d4edd]/25 to-[#8b5cf6]/15',
      border: 'rgba(157, 78, 221, 0.5)',
      glow: 'rgba(157, 78, 221, 0.4)',
      text: 'text-[#c9b6ff]'
    }
  }[glowColor];

  return (
    <div className={`relative group ${floating ? 'animate-float' : ''}`}>
      {/* Soft isometric 3D floor shadow */}
      <div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-3 rounded-full blur-md opacity-60 transition-all group-hover:scale-125 group-hover:opacity-90"
        style={{ backgroundColor: colorStyles.glow }}
      />

      {/* Main 3D isometric rotated panel */}
      <div 
        className={`relative flex items-center justify-center bg-gradient-to-br ${colorStyles.bg} backdrop-blur-xl border transition-all duration-300 transform group-hover:-translate-y-2 group-hover:rotate-3 ${sizeClasses}`}
        style={{
          borderColor: colorStyles.border,
          boxShadow: `0 12px 30px ${colorStyles.glow}, inset 0 2px 4px rgba(255,255,255,0.3)`,
          transform: 'perspective(600px) rotateX(10deg) rotateY(-8deg) rotateZ(3deg)'
        }}
      >
        {/* Top glossy shine reflection */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />
        
        <span className={`${colorStyles.text} filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]`}>
          {renderIcon()}
        </span>
      </div>
    </div>
  );
};
