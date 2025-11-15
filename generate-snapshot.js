const fs = require('fs');
const path = require('path');

class ProjectSnapshot {
  constructor(options = {}) {
    this.maxFileSize = options.maxFileSize || 10000;
    this.includeExt = options.includeExt || ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'];
    this.ignorePatterns = options.ignorePatterns || [
      'node_modules', '.next', '.git', 'dist', 'build'
    ];
  }
  
  generate(rootDir, outputFile = 'project_snapshot.txt') {
    let output = `NEXT.JS PROJECT SNAPSHOT\nGenerated: ${new Date().toISOString()}\n\n`;
    
    const processFile = (filePath, relativePath) => {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        output += `📄 ${relativePath}\n`;
        output += '─'.repeat(50) + '\n';
        output += content.substring(0, this.maxFileSize);
        if (content.length > this.maxFileSize) output += '\n... (truncated)';
        output += '\n' + '─'.repeat(50) + '\n\n';
      } catch (error) {
        output += `❌ ${relativePath} - Error reading file\n\n`;
      }
    };
    
    const walkDir = (dir, prefix = '') => {
      const items = fs.readdirSync(dir).sort();
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative(rootDir, fullPath);
        
        if (this.ignorePatterns.some(pattern => relativePath.includes(pattern))) {
          continue;
        }
        
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          output += `${prefix}📁 ${item}/\n`;
          walkDir(fullPath, prefix + '  ');
        } else if (this.includeExt.some(ext => item.endsWith(ext))) {
          processFile(fullPath, relativePath);
        }
      }
    };
    
    walkDir(rootDir);
    fs.writeFileSync(outputFile, output);
    console.log(`✅ Snapshot generated: ${outputFile}`);
    return output;
  }
}

// Использование
const snapshot = new ProjectSnapshot();
snapshot.generate('.', 'my-nextjs-project.txt');
