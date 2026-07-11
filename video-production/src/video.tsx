import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';

type HeroProps = {format: 'desktop' | 'mobile'};

const transitionOpacity = (frame: number, duration: number, first: boolean) =>
  first
    ? interpolate(frame, [duration - 8, duration], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : interpolate(frame, [0, 8, duration - 8, duration], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

const FocusedClip: React.FC<{
  duration: number;
  file: string;
  format: HeroProps['format'];
  startFrom: number;
  first?: boolean;
  focusX?: number;
}> = ({duration, file, format, startFrom, first = false, focusX = 68}) => {
  const frame = useCurrentFrame();
  const opacity = transitionOpacity(frame, duration, first);
  const scale = interpolate(frame, [0, duration], [1, 1.035], {
    extrapolateRight: 'clamp',
  });
  const source = staticFile(`source/new/${file}`);

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden', backgroundColor: '#321418'}}>
      <OffthreadVideo
        src={source}
        startFrom={startFrom}
        playbackRate={0.88}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1.12)',
          filter: 'blur(28px) brightness(.56) saturate(1.08)',
        }}
      />
      <AbsoluteFill
        style={
          format === 'desktop'
            ? {left: `${focusX - 20}%`, width: '40%', overflow: 'hidden'}
            : {left: '5%', width: '90%', overflow: 'hidden'}
        }
      >
        <OffthreadVideo
          src={source}
          startFrom={startFrom}
          playbackRate={0.88}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scale(${scale})`,
            filter: 'contrast(1.02) saturate(1.04)',
          }}
        />
      </AbsoluteFill>
      {format === 'desktop' ? (
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(35,10,14,.8) 0%, rgba(35,10,14,.42) 35%, transparent 62%)'}} />
      ) : (
        <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(35,10,14,.12), transparent 38%, rgba(35,10,14,.2))'}} />
      )}
    </AbsoluteFill>
  );
};

const clips = [
  {from: 0, duration: 102, file: 'snaptik_7471700328363183382_v3.mp4', startFrom: 345, focusX: 70},
  {from: 94, duration: 104, file: 'snaptik_7531800872146210053_v3.mp4', startFrom: 390, focusX: 69},
  {from: 190, duration: 104, file: 'snaptik_7589589834960850196_v3.mp4', startFrom: 405, focusX: 69},
  {from: 286, duration: 91, file: 'snaptik_7628272399879818518_v3.mp4', startFrom: 390, focusX: 70},
  {from: 369, duration: 81, file: 'ssstik.io_1783694621425.mp4', startFrom: 405, focusX: 69},
] as const;

export const BelleRepousseHero: React.FC<HeroProps> = ({format}) => (
  <AbsoluteFill style={{backgroundColor: '#321418'}}>
    {clips.map((clip, index) => (
      <Sequence key={clip.file} from={clip.from} durationInFrames={clip.duration}>
        <FocusedClip
          duration={clip.duration}
          file={clip.file}
          format={format}
          startFrom={clip.startFrom}
          first={index === 0}
          focusX={clip.focusX}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);
