import React from 'react';
import {Composition} from 'remotion';
import {BelleRepousseHero} from './video';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="BelleRepousseDesktop"
      component={BelleRepousseHero}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{format: 'desktop' as const}}
    />
    <Composition
      id="BelleRepousseMobile"
      component={BelleRepousseHero}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1440}
      defaultProps={{format: 'mobile' as const}}
    />
  </>
);
