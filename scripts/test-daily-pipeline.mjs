import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'daily-video-'));
const valid={
 date:'2026-11-18',language:'es-ES',
 headline:'Noticia de prueba técnica no publicable',
 summary:'Contenido sintético creado para verificar la estructura del contrato editorial.',
 sources:[{title:'Documentación ficticia',url:'https://example.org/test',published_at:'2026-11-18'}],
 claims:[{text:'Afirmación de prueba',source_urls:['https://example.org/test'],classification:'simulation'}],
 video:{format:'vertical-9:16',duration_seconds:90,voice_locale:'es-ES',publish_requires_approval:true}
};
function run(data,script){
 const file=path.join(tmp,'fixture.json');fs.writeFileSync(file,JSON.stringify(data));
 try{execFileSync(process.execPath,[script,file],{stdio:'pipe'});return true;}catch{return false;}
}
assert.equal(run(valid,'scripts/validate-editorial.mjs'),true);
assert.equal(run({...valid,claims:[{...valid.claims[0],source_urls:['https://unreferenced.invalid']} ]},'scripts/validate-editorial.mjs'),false);
assert.equal(run({...valid,video:{...valid.video,publish_requires_approval:false}},'scripts/validate-editorial.mjs'),false);
assert.equal(run(valid,'scripts/prepare-daily-props.mjs'),false,'Placeholder sources must not be renderable');
assert.equal(run({...valid,video:{...valid.video,duration_seconds:60}},'scripts/prepare-daily-props.mjs'),false,'Unsupported duration must fail');
console.log('PASS: editorial validation and safety smoke tests');
