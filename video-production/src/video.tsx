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

const ProductShowcase: React.FC<{duration: number}> = ({duration}) => {
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
        backgroundColor: '#24070c',
      }}
    >
      <Img
        src={staticFile('source/new/product-red-showcase.png')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 48%',
          scale: interpolate(frame, [0, duration], [1.04, 1], {
            extrapolateRight: 'clamp',
          }),
          filter: 'contrast(1.02) saturate(1.04)',
        }}
      />
    </AbsoluteFill>
  );
};

const clips = [
  {
    from: 0,
    duration: 100,
    file: 'snaptik_7471700328363183382_v3.mp4',
    startFrom: 120,
    desktopPosition: '56% 9%',
    mobilePosition: '50% 26%',
  },
  {
    from: 90,
    duration: 58,
    file: 'snaptik_7531800872146210053_v3.mp4',
    startFrom: 120,
    desktopPosition: '50% 35%',
    mobilePosition: '50% 38%',
  },
  {
    from: 140,
    duration: 58,
    file: 'snaptik_7589589834960850196_v3.mp4',
    startFrom: 120,
    desktopPosition: '54% 30%',
    mobilePosition: '50% 32%',
  },
  {
    from: 190,
    duration: 58,
    file: 'snaptik_7628272399879818518_v3.mp4',
    startFrom: 210,
    desktopPosition: '50% 42%',
    mobilePosition: '50% 44%',
  },
  {
    from: 235,
    duration: 55,
    file: 'ssstik.io_1783694621425.mp4',
    startFrom: 210,
    desktopPosition: '50% 34%',
    mobilePosition: '50% 38%',
  },
  {
    from: 282,
    duration: 52,
    file: 'snaptik_7429747225296751905_v3.mp4',
    startFrom: 1545,
    desktopPosition: '50% 78%',
    mobilePosition: '50% 58%',
  },
] as const;

export const BelleRepousseHero: React.FC<HeroProps> = ({format}) => (
  <AbsoluteFill style={{backgroundColor: '#321418'}}>
    {clips.map((clip, index) => (
      <Sequence key={clip.file} from={clip.from} durationInFrames={clip.duration}>
        <FullBleedClip {...clip} format={format} first={index === 0} />
      </Sequence>
    ))}
    <Sequence from={326} durationInFrames={124}>
      <ProductShowcase duration={124} />
    </Sequence>
  </AbsoluteFill>
);
