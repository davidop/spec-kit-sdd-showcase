import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame} from 'remotion';

export type DailyProps={date:string;headline:string;summary:string;sources:{title:string;url:string;published_at:string}[];claims:{text:string;classification:'verified'|'analysis'|'simulation';source_urls:string[]}[];video:{duration_seconds:number}};
const palette={dark:'#071527',light:'#f4f8ff',cyan:'#47d9e8',blue:'#4c8eff',muted:'#a9c1db'};
const fit=(s:string,max:number)=>s.length>max?s.slice(0,max-1)+'…':s;
export const DailyTech:React.FC<DailyProps>=({date,headline,summary,sources,claims,video})=>{
 const f=useCurrentFrame(),duration=video.duration_seconds*30;
 const sections=[{label:'ACTUALIDAD MICROSOFT',title:headline,body:summary,tag:'RESUMEN TECH'},
 ...claims.slice(0,3).map((c,i)=>({label:'CLAVE '+(i+1),title:fit(c.text,105),body:c.classification==='analysis'?'ANÁLISIS · Interpretación técnica':c.classification==='simulation'?'SIMULACIÓN · Ejemplo ilustrativo':'HECHO · Ver fuentes verificadas',tag:c.classification.toUpperCase()})),
 {label:'PARA PROFUNDIZAR',title:'Fuentes y contexto.',body:sources.slice(0,2).map(s=>s.title).join(' · '),tag:'REFERENCIAS'},
 {label:'CONCLUSIÓN',title:'Tecnología con contexto.',body:'Microsoft MVP · David Oliva',tag:'RESUMEN TECH DIARIO'}];
 const section=Math.min(sections.length-1,Math.floor(f/duration*sections.length)),s=sections[section];
 const segment=duration/sections.length,local=f-section*segment;
 const opacity=Math.min(1,interpolate(local,[0,18],[0,1],{extrapolateRight:'clamp'}),interpolate(local,[segment-18,segment],[1,0],{extrapolateLeft:'clamp'}));
 const dark=section%2===1||section===sections.length-1,fg=dark?'#f6faff':'#13233e';
 return <AbsoluteFill style={{background:dark?palette.dark:palette.light,color:fg,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
  <div style={{position:'absolute',width:950,height:950,top:-360,left:380,borderRadius:1000,background:dark?'#183763':'#d9e8ff',filter:'blur(115px)'}}/>
  <div style={{position:'absolute',top:90,left:75,right:75,display:'flex',justifyContent:'space-between',fontWeight:800,fontSize:25,letterSpacing:2,color:dark?palette.cyan:'#346bc1'}}><span>RESUMEN TECH</span><span>{date}</span></div>
  <div style={{position:'absolute',top:285,left:75,right:75,opacity,transform:`translateY(${(1-opacity)*35}px)`}}>
   <div style={{fontSize:28,color:dark?palette.cyan:'#3973c7',fontWeight:800,letterSpacing:3,marginBottom:34}}>{s.label}</div>
   <div style={{fontSize:s.title.length>85?62:78,fontWeight:800,lineHeight:1.12,overflowWrap:'anywhere'}}>{s.title}</div>
   <div style={{fontSize:34,lineHeight:1.38,marginTop:42,color:dark?palette.muted:'#4f6785'}}>{fit(s.body,260)}</div>
  </div>
  <div style={{position:'absolute',top:1110,left:75,right:75,height:370,borderRadius:36,padding:38,background:dark?'#142b48':'#fff',border:'2px solid '+(dark?'#355476':'#d7e4f4'),boxSizing:'border-box',opacity}}>
    <div style={{fontSize:28,fontWeight:800,color:dark?palette.cyan:'#346bc1'}}>{s.tag}</div>
    <div style={{marginTop:32,fontSize:30,lineHeight:1.45,color:dark?'#e3efff':'#34516e'}}>{section===0?'Novedades verificables · Impacto técnico · Aplicación práctica':section===sections.length-2?'Consulta las fuentes originales antes de compartir.':section===sections.length-1?'Sígueme para más arquitectura, IA y Microsoft Cloud.':'Dato, análisis y simulación identificados por separado.'}</div>
  </div>
  <div style={{position:'absolute',left:75,right:75,bottom:115,height:8,background:dark?'#2b405b':'#d5e4f5',borderRadius:10}}><div style={{height:'100%',width:`${100*f/duration}%`,background:palette.blue,borderRadius:10}}/></div>
  <div style={{position:'absolute',left:75,bottom:56,fontSize:23,color:dark?palette.muted:'#5a7696'}}>Microsoft MVP · David Oliva</div>
  <div style={{position:'absolute',right:75,bottom:56,fontSize:23,color:dark?palette.muted:'#5a7696'}}>{Math.floor(f/30)} / {video.duration_seconds} s</div>
 </AbsoluteFill>;
};
