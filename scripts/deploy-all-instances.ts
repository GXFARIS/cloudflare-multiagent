#!/usr/bin/env node
/**
 * Deploy All Instances Script
 * Deploys all configured instances from the instances directory
 */

import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { deployInstance } from './deploy-instance.js';

/**
 * Deploy all instances from instances/ directory
 */
async function deployAllInstances(): Promise<void> {
  console.log('🚀 Deploying all instances...\n');

  const instancesDir = join(process.cwd(), 'instances');

  // Check if instances directory exists
  if (!existsSync(instancesDir)) {
    console.error('❌ Error: instances/ directory not found');
    console.error('Create instance config files in instances/ directory');
    process.exit(1);
  }

  // Find all JSON config files
  const configFiles = readdirSync(instancesDir).filter((f) =>
    f.endsWith('.json')
  );

  if (configFiles.length === 0) {
    console.error('❌ Error: No instance config files found');
    console.error('Add .json config files to instances/ directory');
    process.exit(1);
  }

  console.log(`📦 Found ${configFiles.length} instance config(s):\n`);
  configFiles.forEach((f, i) => console.log(`   ${i + 1}. ${f}`));
  console.log('');

  // Deploy each instance
  let successCount = 0;
  let failureCount = 0;
  const failures: string[] = [];

  for (const configFile of configFiles) {
    const configPath = join(instancesDir, configFile);

    console.log('='.repeat(60));
    console.log(`Deploying: ${configFile}`);
    console.log('='.repeat(60));
    console.log('');

    try {
      await deployInstance({
        configPath,
        cloudflareAccountId:
          process.env.CLOUDFLARE_ACCOUNT_ID || '',
        cloudflareApiToken:
          process.env.CLOUDFLARE_API_TOKEN || '',
      });

      successCount++;
      console.log(`\n✅ ${configFile} deployed successfully\n`);
    } catch (error) {
      failureCount++;
      failures.push(configFile);
      console.error(`\n❌ ${configFile} deployment failed:`, error);
      console.error('Continuing with next instance...\n');
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Deployment Summary');
  console.log('='.repeat(60));
  console.log(`Total instances: ${configFiles.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);

  if (failures.length > 0) {
    console.log('\nFailed deployments:');
    failures.forEach((f) => console.log(`   - ${f}`));
  }

  console.log('');

  // Exit with error if any failures
  if (failureCount > 0) {
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  // Check for required environment variables
  if (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN) {
    console.error('❌ Error: Missing required environment variables\n');
    console.error('Required:');
    console.error('  - CLOUDFLARE_ACCOUNT_ID');
    console.error('  - CLOUDFLARE_API_TOKEN\n');
    console.error('Set them in .env or export them:');
    console.error('  export CLOUDFLARE_ACCOUNT_ID=your-account-id');
    console.error('  export CLOUDFLARE_API_TOKEN=your-api-token\n');
    process.exit(1);
  }

  deployAllInstances().catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

export { deployAllInstances };
