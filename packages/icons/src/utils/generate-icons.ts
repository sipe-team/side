import { performance } from 'node:perf_hooks';
import { generateComponents } from './generate-components';

async function main() {
  const startTime = performance.now();
  try {
    console.log('🎨 Generating icons...');
    const results = await generateComponents();

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.length - successCount;

    console.log(`✨ Done in ${Math.round(performance.now() - startTime)}ms`);
    console.log(`📦 Generated ${successCount} components`);

    if (failureCount > 0) {
      console.warn(`⚠️ Failed to generate ${failureCount} components`);
      const failures = results.filter(r => !r.success);
      for (const failure of failures) {
        console.error(`  ❌ ${failure.fileName}: ${failure.error}`);
      }
    }

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

main();