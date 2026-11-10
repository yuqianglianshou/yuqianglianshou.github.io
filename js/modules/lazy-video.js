// 文章中的演示视频（原动图）只在滚动到可视区域时才下载并静音循环播放，离开后暂停。
// 脚本失效、浏览器不支持 IntersectionObserver 或用户偏好减少动态效果时，保留 controls 由用户手动播放。
export function setupLazyVideos(videos) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!videos.length || reduceMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.preload = 'auto';
        // 部分浏览器在省电模式下会拒绝自动播放，此时恢复控制条让用户手动播放。
        target.play().catch(() => { target.controls = true; });
      } else {
        target.pause();
      }
    });
  }, { rootMargin: '200px 0px' });

  videos.forEach((video) => {
    video.controls = false;
    observer.observe(video);
  });
}
