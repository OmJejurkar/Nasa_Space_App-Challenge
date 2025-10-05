const fs = require('fs');

function checkDeploymentReadiness() {
  console.log('🔍 Checking CosmicVista deployment readiness...\n');
  
  // Check if required directories exist
  const requiredDirs = ['frontend', 'backend'];
  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      console.error(`❌ Error: ${dir} directory not found`);
      process.exit(1);
    }
    console.log(`✅ ${dir} directory found`);
  }
  
  // Check if required files exist
  const requiredFiles = [
    'frontend/package.json',
    'backend/package.json',
    'frontend/src/App.tsx',
    'backend/src/server.js'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Error: ${file} not found`);
      process.exit(1);
    }
    console.log(`✅ ${file} found`);
  }
  
  // Check frontend build script
  console.log('\n🚀 Checking frontend build script...');
  try {
    const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
    if (!frontendPkg.scripts || !frontendPkg.scripts.build) {
      console.error('❌ Error: Frontend build script not found in package.json');
      process.exit(1);
    }
    console.log('✅ Frontend build script found');
  } catch (error) {
    console.error('❌ Error checking frontend build script:', error.message);
    process.exit(1);
  }
  
  // Check backend start script
  console.log('\n🔧 Checking backend start script...');
  try {
    const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
    if (!backendPkg.scripts || !backendPkg.scripts.start) {
      console.error('❌ Error: Backend start script not found in package.json');
      process.exit(1);
    }
    console.log('✅ Backend start script found');
  } catch (error) {
    console.error('❌ Error checking backend start script:', error.message);
    process.exit(1);
  }
  
  // Check deployment files
  console.log('\n📄 Checking deployment files...');
  const deploymentFiles = ['DEPLOYMENT.md', 'DEPLOYMENT_FULL.md', 'deploy.sh', 'deploy.bat'];
  for (const file of deploymentFiles) {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} found`);
    } else {
      console.warn(`⚠️  ${file} not found (optional)`);
    }
  }
  
  console.log('\n🎉 Deployment readiness check completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Get your NASA API key at https://api.nasa.gov/');
  console.log('2. Choose a deployment option from DEPLOYMENT_FULL.md');
  console.log('3. Follow the instructions for your chosen platform');
  console.log('4. Set your environment variables (especially NASA_API_KEY)');
  console.log('5. Deploy and share your CosmicVista application with the world!');
}

checkDeploymentReadiness();