const fs = require('fs');

console.log('🔍 Checking Vercel deployment readiness for CosmicVista...\n');

// Check required files
const requiredFiles = [
  'vercel.json',
  'frontend/package.json',
  'backend/package.json',
  'frontend/src/App.tsx',
  'backend/src/server.js',
  'api/proxy.js'
];

console.log('📄 Checking required files...');
let allFilesFound = true;
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} found`);
  } else {
    console.error(`❌ ${file} not found`);
    allFilesFound = false;
  }
}

if (!allFilesFound) {
  console.error('\n❌ Missing required files for Vercel deployment');
  process.exit(1);
}

// Check vercel.json configuration
console.log('\n🔧 Checking vercel.json configuration...');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  
  if (!vercelConfig.builds || vercelConfig.builds.length === 0) {
    console.error('❌ No builds configuration found in vercel.json');
    process.exit(1);
  }
  
  const frontendBuild = vercelConfig.builds.find(build => build.src === 'frontend/package.json');
  if (!frontendBuild) {
    console.error('❌ Frontend build configuration not found in vercel.json');
    process.exit(1);
  }
  
  console.log('✅ vercel.json configuration looks good');
} catch (error) {
  console.error('❌ Error parsing vercel.json:', error.message);
  process.exit(1);
}

// Check frontend build script
console.log('\n🚀 Checking frontend build script...');
try {
  const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  
  if (!frontendPkg.scripts || !frontendPkg.scripts.build) {
    console.error('❌ Frontend build script not found in package.json');
    process.exit(1);
  }
  
  console.log('✅ Frontend build script found');
} catch (error) {
  console.error('❌ Error checking frontend package.json:', error.message);
  process.exit(1);
}

console.log('\n🎉 Vercel deployment readiness check completed successfully!');
console.log('\n📋 Next steps for Vercel deployment:');
console.log('1. Push your code to GitHub');
console.log('2. Import your project to Vercel');
console.log('3. Set your NASA_API_KEY environment variable in Vercel project settings');
console.log('4. Deploy!');