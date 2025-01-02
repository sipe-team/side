import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Icon color. Defaults to currentColor */
  color?: string
  /** Icon size in pixels. Defaults to 24 */
  size?: number
}

export type GenerateResult ={
  fileName: string;
  componentName: string;
  success: boolean;
  error?: string;
 }