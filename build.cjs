const fs=require('node:fs');fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist');fs.copyFileSync('index.html','dist/index.html');console.log('Static production build ready: dist/');
