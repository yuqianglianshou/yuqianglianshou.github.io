import { createPanelController } from './modules/panel-controller.js';
import { setupScrollIndicator } from './modules/scroll-indicator.js';
import { setupLazyVideos } from './modules/lazy-video.js';

function initializeBlog() {
  const panelController = createPanelController(document.querySelector('.panel-cover'));
  const blogButtons = Array.from(document.querySelectorAll('a.blog-button'));

  // 只有主模块成功执行后才启用覆盖式面板；加载失败时页面保持可阅读的自然流布局。
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  blogButtons.forEach((button) => {
    button.addEventListener('click', () => panelController.collapse());
  });

  if (window.location.hash === '#blog') {
    panelController.collapse();
  }

  setupScrollIndicator({
    element: document.querySelector('.scroll-indicator'),
    panelController,
  });

  setupLazyVideos(Array.from(document.querySelectorAll('video[data-autoplay]')));
}

initializeBlog();
