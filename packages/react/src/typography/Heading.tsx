import React, { CSSProperties } from 'react';
import { useTheme } from '../ThemeProvider';

export interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'text' | 'textSecondary' | 'primary' | 'secondary';
  align?: 'left' | 'center' | 'right';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  style?: CSSProperties;
  className?: string;
}

const variantMap = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
} as const;

export function Heading({
  children,
  level = 1,
  weight = 'bold',
  color = 'text',
  align = 'left',
  lineHeight = 'tight',
  style,
  className,
}: HeadingProps) {
  const { theme } = useTheme();
  const variant = variantMap[level];
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const headingStyle: CSSProperties = {
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
    <Component style={headingStyle} className={className}>
      {children}
    </Component>
  );
}

