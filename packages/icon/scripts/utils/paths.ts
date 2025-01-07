import path from 'node:path';

export const PATHS = {
  /**
   * SVG source files
   * */
  ICONS_DIR: path.join(process.cwd(), 'icons'),
  /**
   * Generated files
   * */
  COMPONENTS_DIR: path.join(process.cwd(), 'src/components'),
  /**
   * Types file
   * */
  TYPES_FILE: path.join(process.cwd(), 'src/types.ts'),
  /**
   * Index file
   * */
  INDEX_FILE: path.join(process.cwd(), 'src/index.ts'),
} as const;