import fs from 'node:fs';
const file=process.argv[2];
if(!file){console.error('Usage: node scripts/validate-editorial.mjs content/daily/YYYY-MM-DD.json');process.exit(2);}
const data=JSON.parse(fs.readFileSync(file,'utf8'));
const fail=(m)=>{throw new Error(m)};
if(!/^\d{4}-\d{2}-\d{2}$/.test(data.date??''))fail('Invalid date');
if(data.language!=='es-ES')fail('language must be es-ES');
if(!data.headline || !data.summary)fail('Missing editorial text');
if(!Array.isArray(data.sources)||data.sources.length===0)fail('Missing sources');
if(!Array.isArray(data.claims)||data.claims.length===0)fail('Missing claims');
const urls=new Set(data.sources.map(s=>s.url));
for(const s of data.sources){if(!/^https:\/\//.test(s.url)||!s.title||!s.published_at)fail('Invalid source');}
for(const c of data.claims){if(!['verified','analysis','simulation'].includes(c.classification))fail('Invalid classification');if(!Array.isArray(c.source_urls)||c.source_urls.length===0||c.source_urls.some(u=>!urls.has(u)))fail('Claim source missing');}
if(data.video?.format!=='vertical-9:16'||data.video?.voice_locale!=='es-ES'||data.video?.publish_requires_approval!==true)fail('Invalid video policy');
if(!Number.isInteger(data.video.duration_seconds)||data.video.duration_seconds<35||data.video.duration_seconds>90)fail('Invalid duration');
console.log('PASS editorial structural validation:',file);
console.log('NOTE: source content and claims are NOT independently fact-checked by this validator.');
