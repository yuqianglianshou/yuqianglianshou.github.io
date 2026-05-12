document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var panelCover = document.querySelector('.panel-cover');
  var mainPostList = document.querySelector('.main-post-list');
  var blogButtons = Array.from(document.querySelectorAll('a.blog-button'));
  var scrollIndicator = document.querySelector('.scroll-indicator');

  function hasCollapsedPanel() {
    return !!panelCover && panelCover.classList.contains('panel-cover--collapsed');
  }

  function collapsePanel() {
    if (!panelCover) return;
    panelCover.classList.add('panel-cover--collapsed');
  }

  function showPostList() {
    if (mainPostList) {
      mainPostList.classList.remove('hidden');
    }
  }

  function fadeElement(element, visible, duration) {
    if (!element) return;

    var startOpacity = Number(window.getComputedStyle(element).opacity);
    var endOpacity = visible ? 1 : 0;
    var startTime = window.performance ? window.performance.now() : Date.now();

    if (visible) {
      element.hidden = false;
      element.style.display = '';
    }

    function step(timestamp) {
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var opacity = startOpacity + (endOpacity - startOpacity) * progress;

      element.style.opacity = String(opacity);

      if (progress < 1) {
        window.requestAnimationFrame(step);
        return;
      }

      element.style.opacity = '';
      if (!visible) {
        element.style.display = 'none';
      }
    }

    window.requestAnimationFrame(step);
  }

  function animatePanelCollapse() {
    if (!panelCover) return;

    var currentWidth = panelCover.getBoundingClientRect().width;
    showPostList();

    if (currentWidth < 2000) {
      collapsePanel();
      return;
    }

    panelCover.style.maxWidth = currentWidth + 'px';
    panelCover.style.width = '100%';
    panelCover.style.transition = 'max-width 400ms ease, width 400ms ease';

    window.requestAnimationFrame(function () {
      panelCover.style.maxWidth = '320px';
      panelCover.style.width = '22%';
    });

    window.setTimeout(function () {
      collapsePanel();
      panelCover.style.transition = '';
      panelCover.style.maxWidth = '';
      panelCover.style.width = '';
    }, 420);
  }

  function hideScrollIndicator(duration) {
    if (scrollIndicator && scrollIndicator.style.display !== 'none') {
      fadeElement(scrollIndicator, false, duration || 300);
    }
  }

  blogButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // If already in blog, return early without animate overlay panel again.
      if (location.hash && location.hash === '#blog') return;
      if (hasCollapsedPanel()) return;
      animatePanelCollapse();
    });
  });

  if (window.location.hash && window.location.hash === '#blog') {
    collapsePanel();
    showPostList();
  }

  if (window.location.pathname.substring(0, 5) === '/tag/') {
    collapsePanel();
  }

  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (!hasCollapsedPanel()) {
        var blogButton = blogButtons[0];
        if (blogButton) {
          blogButton.click();
        }
      }

      window.setTimeout(function () {
        hideScrollIndicator(300);
      }, 100);
    });

    var checkScrollIndicator = function () {
      var panelCollapsed = hasCollapsedPanel();
      var blogListVisible = !!mainPostList && !mainPostList.classList.contains('hidden');
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (panelCollapsed || (blogListVisible && scrollTop > 100) || scrollTop > 100) {
        hideScrollIndicator(300);
        return;
      }

      if (!panelCollapsed && !blogListVisible && scrollTop <= 10 && scrollIndicator.style.display === 'none') {
        fadeElement(scrollIndicator, true, 300);
      }
    };

    var scrollTimer = null;
    window.addEventListener('scroll', function () {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(checkScrollIndicator, 100);
    });

    window.addEventListener('resize', checkScrollIndicator);

    blogButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        window.setTimeout(function () {
          hideScrollIndicator(500);
        }, 200);
      });
    });

    if (window.MutationObserver && panelCover) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setTimeout(checkScrollIndicator, 150);
          }
        });
      });

      try {
        observer.observe(panelCover, {
          attributes: true,
          attributeFilter: ['class']
        });
      } catch {
        var checkPanelState = setInterval(function () {
          checkScrollIndicator();
        }, 500);
        window.addEventListener('beforeunload', function () {
          clearInterval(checkPanelState);
        });
      }
    }

    setTimeout(checkScrollIndicator, 100);
    window.addEventListener('load', function () {
      setTimeout(checkScrollIndicator, 200);
    });
  }

  if (!document.querySelector('.panel-cover--collapsed')) {
    document.body.style.opacity = '0';
    window.addEventListener('load', function () {
      setTimeout(function () {
        document.body.style.transition = 'opacity 600ms ease';
        document.body.style.opacity = '1';
      }, 100);
    });
  }

  Array.from(document.querySelectorAll('a[href^="#"]')).forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var href = anchor.getAttribute('href');
      if (!href || href === '#blog') return;

      var target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  (function offsetSitePageViews() {
    var sitePv = document.getElementById('busuanzi_value_site_pv');
    var sitePvOffset = 60000;

    if (!sitePv) return;

    function parseCount(text) {
      var count = parseInt(String(text).replace(/[^\d]/g, ''), 10);
      return Number.isNaN(count) ? null : count;
    }

    function renderOffsetCount() {
      var currentCount = parseCount(sitePv.textContent);
      var rawCount = parseCount(sitePv.getAttribute('data-raw-count'));

      if (currentCount === null) return;
      if (rawCount !== null && currentCount === rawCount + sitePvOffset) return;

      sitePv.setAttribute('data-raw-count', String(currentCount));
      sitePv.textContent = String(currentCount + sitePvOffset);
    }

    renderOffsetCount();

    if (window.MutationObserver) {
      var sitePvObserver = new MutationObserver(renderOffsetCount);
      sitePvObserver.observe(sitePv, {
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      window.setTimeout(renderOffsetCount, 1000);
    }
  })();
});
