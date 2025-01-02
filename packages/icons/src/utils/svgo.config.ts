import type { Config } from 'svgo';

/**
 * SVGO configuration for optimizing SVG files
 * @see https://github.com/svg/svgo
 */
export const SVGO_CONFIG: Config = {
  plugins: [
    // Use default preset with custom overrides
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Keep viewBox attribute for proper scaling
          removeViewBox: false,
          // Disable conversion to currentColor, but keep other color optimizations
          convertColors: false,
        },
      },
    },
    // Remove width/height attributes (we'll use size prop)
    {
      name: 'removeDimensions'
    },
    {
      name: 'removeXMLNS'
    },
  ]
};