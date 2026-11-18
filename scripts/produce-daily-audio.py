#!/usr/bin/env python3
"""Optional Azure Speech narration and SRT for the DailyTech composition.
No credentials: SRT only; video remains a silent preview.
"""
import html,json,os,pathlib,subprocess,sys,urllib.request,urllib.error
p=pathlib.Path(sys.argv[1]);out=pathlib.Path('out');out.mkdir(exist_ok=True)
d=json.loads(p.read_text(encoding='utf-8'))
duration=int(d['video']['duration_seconds'])
claims=d['claims'][:3]
sections=[('Actualidad Microsoft',d['headline']+'. '+d['summary'])]
sections += [('Clave '+str(i+1),c['text']) for i,c in enumerate(claims)]
sections += [('Fuentes y contexto','Fuentes: '+', '.join(s['title'] for s in d['sources'][:2]))]
sections += [('Conclusión','Tecnología con contexto. Microsoft MVP, David Oliva.')]
slot=duration/len(sections)
def timestamp(t):
    ms=round(t*1000);h,ms=divmod(ms,3600000);m,ms=divmod(ms,60000);s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
srt=''.join(f'{i+1}\n{timestamp(i*slot)} --> {timestamp((i+1)*slot)}\n{title}: {body}\n\n' for i,(title,body) in enumerate(sections))
(out/'resumen-tech-diario.srt').write_text(srt,encoding='utf-8')
(out/'narration-script.txt').write_text('\n\n'.join(f'{title}: {body}' for title,body in sections),encoding='utf-8')
key=os.environ.get('AZURE_SPEECH_KEY','')
region=os.environ.get('AZURE_SPEECH_REGION','')
if not (key and region):
    print('No Azure Speech credentials: SRT and script generated, narration unavailable.')
    sys.exit(0)
voice=os.environ.get('AZURE_SPEECH_VOICE','es-ES-AlvaroNeural')
clips=[]
for i,(title,body) in enumerate(sections):
    text=html.escape(title+'. '+body)
    ssml=f'<speak version="1.0" xml:lang="es-ES"><voice name="{html.escape(voice)}">{text}</voice></speak>'
    req=urllib.request.Request(f'https://{region}.tts.speech.microsoft.com/cognitiveservices/v1',
        data=ssml.encode('utf-8'),headers={'Ocp-Apim-Subscription-Key':key,
        'Content-Type':'application/ssml+xml','X-Microsoft-OutputFormat':'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent':'daily-tech-video'},method='POST')
    try:
        with urllib.request.urlopen(req,timeout=45) as response: audio=response.read()
    except urllib.error.HTTPError as e:
        raise RuntimeError(f'Azure Speech failed for section {i+1}: HTTP {e.code}') from None
    clip=out/f'voice-{i:02}.mp3';clip.write_bytes(audio)
    length=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(clip)],text=True))
    if length>slot-0.5:
        raise RuntimeError(f'Voice section {i+1} is {length:.1f}s, exceeds slot {slot:.1f}s. Shorten script; no clipping.')
    clips.append(clip)
inputs=sum((['-i',str(c)] for c in clips),[])
filters=';'.join(f'[{i}:a]adelay={round(i*slot*1000)}|{round(i*slot*1000)}[a{i}]' for i in range(len(clips)))
filters+=';'+''.join(f'[a{i}]' for i in range(len(clips)))+f'amix=inputs={len(clips)}:duration=longest:normalize=0,apad,atrim=duration={duration}[a]'
subprocess.run(['ffmpeg','-y',*inputs,'-filter_complex',filters,'-map','[a]','-c:a','aac','-b:a','160k',str(out/'narration.m4a')],check=True,stdout=subprocess.DEVNULL)
print('Narration generated:',out/'narration.m4a')
