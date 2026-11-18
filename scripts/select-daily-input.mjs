import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const event=process.env.GITHUB_EVENT_NAME;
const requested=process.env.REQUESTED_FILE?.trim();
const out=process.env.GITHUB_OUTPUT;
const valid=(p)=>/^content\/daily\/\d{4}-\d{2}-\d{2}\.json$/.test(p) && fs.existsSync(p);
let file;
if(event==='workflow_dispatch'){
  if(!valid(requested??''))throw Error('Invalid requested editorial JSON');
  file=requested;
}else if(event==='push'){
  const before=process.env.GITHUB_EVENT_BEFORE,after=process.env.GITHUB_SHA;
  if(!/^[0-9a-f]{40}$/.test(before??'')||!/^[0-9a-f]{40}$/.test(after??''))throw Error('Invalid push SHAs');
  const names=execFileSync('git',['diff','--name-only',before,after,'--','content/daily'],{encoding:'utf8'}).trim().split('\n').filter(valid);
  if(!names.length){console.log('No daily editorial JSON changed.');file='';}
  else file=names.sort().at(-1);
}else throw Error('Unsupported event '+event);
if(out)fs.appendFileSync(out,`file=${file??''}\n`);
console.log(file?`Selected changed editorial file: ${file}`:'No editorial input selected');
