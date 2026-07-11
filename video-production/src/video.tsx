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

const transitionOpacity = (frame: number, duration: number, first: boolean) =>
  first
    ? interpolate(frame, [duration - 10, duration], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(frame, [0, 10, duration - 10, duration], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

const FullBleedClip: React.FC<{
  duration: number;
  file: string;
  format: HeroProps['format'];
  startFrom: number;
  first?: boolean;
  desktopPosition: string;
  mobilePosition: string;
}> = ({
  duration,
  file,
  format,
  startFrom,
  first = false,
  desktopPosition,
  mobilePosition,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: transitionOpacity(frame, duration, first),
        overflow: 'hidden',
        backgroundColor: '#321418',
      }}
    >
      <OffthreadVideo
        src={staticFile(`source/new/${file}`)}
        startFrom={startFrom}
        playbackRate={0.9}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: format === 'desktop' ? desktopPosition : mobilePosition,
          scale: interpolate(frame, [0, duration], [1.01, 1.08], {
            extrapolateRight: 'clamp',
          }),
          filter: 'contrast(1.03) saturate(1.05)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            format === 'desktop'
              ? 'linear-gradient(90deg, rgba(35,10,14,.64) 0%, rgba(35,10,14,.22) 36%, transparent 63%)'
              : 'linear-gradient(180deg, rgba(35,10,14,.08), transparent 52%, rgba(35,10,14,.18))',
        }}
      />
    </AbsoluteFill>
  );
};

const ProductShowcase: React.FC<{format: HeroProps['format']; duration: number}> = ({
  format,
  duration,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, duration - 14, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <Img
        src={staticFile('source/new/product-red-two-angles.png')}
        style={{
          position: 'absolute',
          top: format === 'desktop' ? '-22%' : '-5%',
          right: format === 'desktop' ? '-8%' : '-18%',
          width: format === 'desktop' ? '100%' : '136%',
          height: format === 'desktop' ? '145%' : '110%',
          objectFit: 'contain',
          scale: interpolate(frame, [0, duration], [1.08, 1], {
            extrapolateRight: 'clamp',
          }),
          filter: 'drop-shadow(0 28px 38px rgba(85, 20, 27, .2))',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            format === 'desktop'
              ? 'linear-gradient(90deg, rgba(57,13,19,.58), rgba(57,13,19,.13) 40%, transparent 67%)'
              : 'linear-gradient(180deg, transparent 58%, rgba(57,13,19,.18))',
        }}
      />
    </AbsoluteFill>
  );
};

const clips = [
  {
    from: 0,
    duration: 68,
    file: 'snaptik_7628272399879818518_v3.mp4',
    startFrom: 120,
    desktopPosition: '50% 42%',
    mobilePosition: '50% 44%',
  },
  {
    from: 58,
    duration: 142,
    file: 'snaptik_7628272399879818518_v3.mp4',
    startFrom: 210,
    desktopPosition: '50% 42%',
    mobilePosition: '50% 44%',
  },
  {
    from: 190,
    duration: 84,
    file: 'snaptik_7589589834960850196_v3.mp4',
    startFrom: 120,
    desktopPosition: '54% 22%',
    mobilePosition: '50% 25%',
  },
  {
    from: 264,
    duration: 88,
    file: 'ssstik.io_1783694621425.mp4',
    startFrom: 210,
    desktopPosition: '50% 34%',
    mobilePosition: '50% 38%',
  },
] as const;

export const BelleRepousseHero: React.FC<HeroProps> = ({format}) => (
  <AbsoluteFill style={{backgroundColor: '#321418'}}>
    {clips.map((clip, index) => (
      <Sequence key={clip.file} from={clip.from} durationInFrames={clip.duration}>
        <FullBleedClip {...clip} format={format} first={index === 0} />
      </Sequence>
    ))}
    <Sequence from={342} durationInFrames={108}>
      <ProductShowcase format={format} duration={108} />
    </Sequence>
  </AbsoluteFill>
);
