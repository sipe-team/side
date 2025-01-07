import { optimize } from 'svgo';
import { SVGO_CONFIG } from './svgo.config';

export const optimizeSvg = async (svg: string): Promise<string> => {
  try {
    const result = optimize(svg, SVGO_CONFIG);
    if (!('data' in result)) {
      throw new Error('SVG optimization failed');
    }

    let optimizedSvg = result.data;

    // Convert kebab-case to camelCase
    optimizedSvg = optimizedSvg.replace(
      /-([a-z])/g,
      (_, letter) => letter.toUpperCase()
    );

    // Preserve fill="none" and handle other fill/stroke attributes
    optimizedSvg = optimizedSvg
      .replace(/fill="(none|[^"]+)"/g, (_, value) =>
        value === 'none'
          ? 'fill="none"'
          : value === 'currentColor'
            ? 'fill={color}'
            : `fill={color || "${value}"}`)
      .replace(/stroke="(none|[^"]+)"/g, (_, value) =>
        value === 'none'
          ? 'stroke="none"'
          : value === 'currentColor'
            ? 'stroke={color}'
            : `stroke={color || "${value}"}`)

    // Inject SVG props
    optimizedSvg = optimizedSvg.replace(
      '<svg',
      '<svg ref={ref} width={size} height={size} {...props}'
    );

    return optimizedSvg;
  } catch (error) {
    throw new Error(`Failed to transform SVG: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};