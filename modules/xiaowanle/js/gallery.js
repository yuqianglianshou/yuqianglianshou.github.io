// 原生 <dialog> 实现的相册灯箱，替代原先依赖 cdn.bootcss.com 的 jQuery + Magnific Popup。
// 不支持 <dialog> 的旧浏览器不拦截点击，保留链接直接打开原图的行为。
(function () {
  var gallery = document.querySelector('.gallery');
  var dialog = document.querySelector('.lightbox');
  if (!gallery || !dialog || typeof dialog.showModal !== 'function') return;

  var links = Array.prototype.slice.call(gallery.querySelectorAll('a'));
  var image = dialog.querySelector('.lightbox__image');
  var counter = dialog.querySelector('.lightbox__counter');
  var currentIndex = 0;
  var lastTrigger = null;

  function show(index) {
    currentIndex = (index + links.length) % links.length;
    var link = links[currentIndex];
    var thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail ? thumbnail.alt : '';
    counter.textContent = currentIndex + 1 + ' / ' + links.length;
    // 预加载下一张，保持原插件 preload 的翻页流畅度。
    new Image().src = links[(currentIndex + 1) % links.length].href;
  }

  links.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      lastTrigger = link;
      show(index);
      dialog.showModal();
    });
  });

  dialog.querySelector('.lightbox__prev').addEventListener('click', function () { show(currentIndex - 1); });
  dialog.querySelector('.lightbox__next').addEventListener('click', function () { show(currentIndex + 1); });
  dialog.querySelector('.lightbox__close').addEventListener('click', function () { dialog.close(); });
  image.addEventListener('click', function () { show(currentIndex + 1); });
  image.addEventListener('error', function () { counter.textContent = '图片加载失败。'; });

  // 点击图片以外的遮罩区域关闭，与原插件一致；Esc 关闭由 <dialog> 原生提供。
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });

  dialog.addEventListener('close', function () {
    image.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus();
  });
})();
