export function setupScrollIndicator({ element, panelController }) {
  if (!element) return;

  let frameRequested = false;

  function updateVisibility() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    element.hidden = panelController.isCollapsed() || scrollTop > 100;
    frameRequested = false;
  }

  function scheduleUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateVisibility);
  }

  element.addEventListener('click', () => {
    // 不阻止链接默认行为，脚本失效时仍能通过 #blog 到达文章列表。
    panelController.collapse();
    updateVisibility();
  });

  panelController.subscribe(updateVisibility);
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  updateVisibility();
}
