import React from 'react';
import {Composition} from 'remotion';
import {Showcase} from './showcase';

export const Root: React.FC = () => (
  <Composition id="SDDShowcase" component={Showcase} durationInFrames={2700} fps={30} width={1080} height={1920}/>
);
