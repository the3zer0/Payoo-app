const fs=require('node:fs');const path=require('node:path');
const out=path.resolve('dist');fs.mkdirSync(out,{recursive:true});
for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.html')))fs.copyFileSync(file,path.join(out,file));
for(const dir of ['assets','css'])fs.cpSync(dir,path.join(out,dir),{recursive:true});
fs.mkdirSync(path.join(out,'js'),{recursive:true});for(const file of ['wallet.js','app.js'])fs.copyFileSync('js/'+file,path.join(out,'js',file));
for(const file of ['_headers','robots.txt'])fs.copyFileSync(file,path.join(out,file));
console.log('Built deployable static site in dist/');
