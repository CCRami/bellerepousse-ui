(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('.br-home__hero-video').forEach((video) => {
    video.controls = false;
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const showVideo = () => video.classList.add('is-playing');
    const hideVideo = () => video.classList.remove('is-playing');
    video.addEventListener('playing', showVideo);
    video.addEventListener('pause', hideVideo);

    const play = () => {
      if (motionQuery.matches) {
        video.pause();
        hideVideo();
        return;
      }

      const attempt = video.play();
      if (attempt) attempt.catch(hideVideo);
    };

    video.addEventListener('canplay', play, {once: true});
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) play();
    });
    play();
  });
})();
