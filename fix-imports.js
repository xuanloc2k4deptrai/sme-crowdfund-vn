const fs = require('fs');
const path = require('path');

function fixImportPaths(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixImportPaths(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix import paths
      content = content.replace(/from\s+['"]\.\.\/contexts\//g, "from '../src/contexts/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/contexts\//g, "from '../../src/contexts/");
      content = content.replace(/from\s+['"]\.\.\/components\//g, "from '../src/components/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/components\//g, "from '../../src/components/");
      content = content.replace(/from\s+['"]\.\.\/types['"]/g, "from '../src/types'");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/types['"]/g, "from '../../src/types'");
      content = content.replace(/from\s+['"]\.\.\/services\//g, "from '../src/services/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/services\//g, "from '../../src/services/");
      content = content.replace(/from\s+['"]\.\.\/hooks\//g, "from '../src/hooks/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/hooks\//g, "from '../../src/hooks/");
      content = content.replace(/from\s+['"]\.\.\/utils\//g, "from '../src/utils/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/utils\//g, "from '../../src/utils/");
      content = content.replace(/from\s+['"]\.\.\/mocks\//g, "from '../src/mocks/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/mocks\//g, "from '../../src/mocks/");
      content = content.replace(/from\s+['"]\.\.\/styles\//g, "from '../src/styles/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/styles\//g, "from '../../src/styles/");
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
    }
  });
}

// Fix imports in pages directory
fixImportPaths('./frontend/pages');
console.log('✅ All import paths fixed!');
