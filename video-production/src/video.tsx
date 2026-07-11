import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';

type HeroProps = {format: 'desktop' | 'mobile'};

const fade = (frame: number, duration: number) =>
  interpolate(frame, [0, 10, duration - 12, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

const LifestyleShot: React.FC<{
  duration: number;
  format: HeroProps['format'];
  startFrom: number;
  zoomFrom: number;
  zoomTo: number;
  position: string;
  fadeIn?: boolean;
}> = ({duration, format, startFrom, zoomFrom, zoomTo, position, fadeIn = true}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], [zoomFrom, zoomTo], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity: fadeIn ? fade(frame, duration) : interpolate(frame, [duration - 12, duration], [1, 0], {extrapolateLeft: 'clamp'}), overflow: 'hidden'}}>
      <OffthreadVideo
        src={staticFile('source/lifestyle.mp4')}
        startFrom={startFrom}
        playbackRate={0.72}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: format === 'mobile' ? '52% center' : position,
          transform: `scale(${scale})`,
          filter: 'saturate(1.06) contrast(1.02) brightness(0.96) sepia(0.08)',
        }}
      />
    </AbsoluteFill>
  );
};

const ProductShot: React.FC<{
  duration: number;
  format: HeroProps['format'];
  close: boolean;
}> = ({duration, format, close}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, duration], close ? [1.18, 1.42] : [1.02, 1.14], {
    extrapolateRight: 'clamp',
  });
  const glow = interpolate(Math.sin(frame / 4), [-1, 1], [0.25, 0.75]);

  return (
    <AbsoluteFill
      style={{
        opacity: fade(frame, duration),
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f8e3df, #fff 55%, #efd1cb)',
      }}
    >
      <Img
        src={staticFile('source/product-clean.png')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: format === 'mobile' ? (close ? '34% center' : '28% center') : close ? '30% 38%' : 'center 42%',
          transform: `scale(${scale})`,
          filter: 'saturate(1.12) contrast(1.04)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${format === 'mobile' ? '34%' : '30%'} 31%, rgba(255,28,36,${glow}) 0, rgba(255,28,36,0.18) 8%, transparent 22%)`,
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};

export const BelleRepousseHero: React.FC<HeroProps> = ({format}) => {
  const frame = useCurrentFrame();
  const loopBlend = interpolate(frame, [430, 449], [0, 0.42], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#351419'}}>
      <Sequence durationInFrames={90}>
        <LifestyleShot duration={90} format={format} startFrom={175} zoomFrom={1.01} zoomTo={1.07} position="62% center" fadeIn={false} />
      </Sequence>
      <Sequence from={80} durationInFrames={106}>
        <LifestyleShot duration={106} format={format} startFrom={0} zoomFrom={1.12} zoomTo={1.24} position="60% 34%" />
      </Sequence>
      <Sequence from={176} durationInFrames={128}>
        <LifestyleShot duration={128} format={format} startFrom={170} zoomFrom={1.04} zoomTo={1.12} position="56% 28%" />
      </Sequence>
      <Sequence from={294} durationInFrames={91}>
        <ProductShot duration={91} format={format} close={false} />
      </Sequence>
      <Sequence from={375} durationInFrames={75}>
        <ProductShot duration={75} format={format} close />
      </Sequence>

      {format === 'desktop' ? (
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(38,10,15,.68) 0%, rgba(38,10,15,.22) 34%, transparent 62%)'}} />
      ) : null}
      <AbsoluteFill
        style={{
          opacity: 0.14,
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.16) 0, rgba(255,255,255,.16) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'soft-light',
        }}
      />
      <AbsoluteFill style={{background: `rgba(53,20,25,${loopBlend})`}} />
    </AbsoluteFill>
  );
};
