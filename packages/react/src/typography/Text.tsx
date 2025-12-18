import React, { CSSProperties } from 'react';
import { useTheme } from '../ThemeProvider';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'text' | 'textSecondary' | 'textDisabled' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  style?: CSSProperties;
  className?: string;
}

export function Text({
  children,
  variant = 'base',
  weight = 'normal',
  color = 'text',
  align = 'left',
  lineHeight = 'normal',
  as: Component = 'p',
  style,
  className,
}: TextProps) {
  const { theme } = useTheme();

  const textStyle: CSSProperties = {
    fontFamily: theme.typography.fontFamily.base,
    fontSize: theme.typography.fontSize[variant],
    fontWeight: theme.typography.fontWeight[weight],
    lineHeight: theme.typography.lineHeight[lineHeight],
    color: theme.colors[color],
    textAlign: align,
    margin: 0,
    ...style,
  };

  return (
    <Component style={textStyle} className={className}>
      {children}
    </Component>
  );
}

