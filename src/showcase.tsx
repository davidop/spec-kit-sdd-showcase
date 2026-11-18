import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const scenes = [
  {start:0,end:180,eyebrow:'01 · EL RETO',title:'Una funcionalidad.\nTres repositorios.',detail:'Cotizador de seguros de hogar · API .NET · React · Terraform'},
  {start:180,end:540,eyebrow:'02 · SPEC-DRIVEN DEVELOPMENT',title:'Primero la especificación.',detail:'Necesidad → requisitos → plan → tareas → implementación'},
  {start:540,end:1080,eyebrow:'03 · SPEC KIT 1.4.1',title:'Novedades en contexto.',detail:'Verificar cada novedad con las notas oficiales antes de narrarla'},
  {start:1080,end:1560,eyebrow:'04 · ARQUITECTURA',title:'API · Web · Infra',detail:'Tres repositorios coordinados mediante contratos y revisión humana'},
  {start:1560,end:2070,eyebrow:'05 · ASISTENTES ALTERNATIVOS',title:'Copilot · Claude · Codex',detail:'Tres opciones de asistente, no una orquestación automática'},
  {start:2070,end:2460,eyebrow:'06 · QUALITY GATES',title:'PR → CI/CD → revisión',detail:'Tests, análisis y aprobaciones simulados para explicar el proceso'},
  {start:2460,end:2700,eyebrow:'07 · CONCLUSIÓN',title:'Especificar antes de generar.',detail:'Microsoft MVP · David Oliva'},
];

export const Showcase:React.FC=()=>{
 const frame=useCurrentFrame();
 const s=scenes.find(x=>frame>=x.start && frame<x.end)??scenes[scenes.length-1];
 const local=frame-s.start;
 const opacity=interpolate(local,[0,18,Math.max(19,s.end-s.start-20),s.end-s.start],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const isLight=frame<1080;
 const fg=isLight?'#17213c':'#f4f7ff';
 return <AbsoluteFill style={{background:isLight?'#f5f8fd':'#0b1429',color:fg,fontFamily:'Arial, sans-serif',padding:90,justifyContent:'center'}}>
   <div style={{position:'absolute',top:115,left:90,fontSize:29,fontWeight:700,letterSpacing:3,color:'#5689d8'}}>SPEC KIT / SDD SHOWCASE</div>
   <div style={{opacity,transform:`translateY(${(1-opacity)*30}px)`}}>
    <div style={{fontSize:29,color:'#5b91e8',fontWeight:700,letterSpacing:3,marginBottom:38}}>{s.eyebrow}</div>
    <div style={{fontSize:91,fontWeight:800,letterSpacing:-3,lineHeight:1.08,whiteSpace:'pre-line'}}>{s.title}</div>
    <div style={{fontSize:38,lineHeight:1.4,marginTop:50,opacity:.8}}>{s.detail}</div>
   </div>
   <div style={{position:'absolute',bottom:115,left:90,right:90,height:8,background:isLight?'#dbe3ef':'#273653',borderRadius:8}}><div style={{width:`${100*frame/2700}%`,height:'100%',background:'#548af4',borderRadius:8}}/></div>
   <div style={{position:'absolute',bottom:65,left:90,fontSize:23,opacity:.6}}>RECREACIÓN TÉCNICA · ANIMATIC DE PRODUCCIÓN</div>
 </AbsoluteFill>;
};
