const fs = require('fs');
const path = require('path');

const files = ['chat', 'email', 'meeting', 'research', 'tasks'].map(f => path.join(__dirname, 'src', 'app', f, 'page.tsx'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('ReactMarkdown')) {
    content = content.replace('import { useState } from "react";', 'import { useState } from "react";\nimport ReactMarkdown from "react-markdown";\nimport remarkGfm from "remark-gfm";');
    
    // Replace the result block
    const regex = /<div className="whitespace-pre-wrap[^"]+">\s*\{result\}\s*<\/div>/g;
    content = content.replace(regex, 
      '<div className="prose prose-sm max-w-none text-text-primary leading-relaxed bg-pastel-cream/50 rounded-xl p-6 border-2 border-border-light prose-headings:text-text-primary prose-a:text-pastel-orange prose-strong:text-text-primary prose-ul:pl-4">\n                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>\n              </div>');
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
}
