import React from 'react';
import {Composition} from 'remotion';
import {Showcase} from './showcase';
import {DailyTech,DailyProps} from './daily-tech';

const defaultDaily:DailyProps={
 date:'2026-11-18',headline:'Vista previa del formato diario',
 summary:'Plantilla de producción: requiere noticias verificadas antes de su render.',
 sources:[{title:'Fuente pendiente',url:'https://example.org',published_at:'2026-11-18'}],
 claims:[{text:'Contenido de demostración, no publicable',classification:'simulation',source_urls:['https://example.org']}],
 video:{duration_seconds:90}
};
export const Root: React.FC = () => (<>
 <Composition id="SDDShowcase" component={Showcase} durationInFrames={2700} fps={30} width={1080} height={1920}/>
 <Composition id="DailyTech" component={DailyTech} durationInFrames={2700} fps={30} width={1080} height={1920} defaultProps={defaultDaily}/>
</>);
