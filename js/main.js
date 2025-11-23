$(document).ready(function () {


  $('a.blog-button').click(function () {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 2000) {
      $('.panel-cover').addClass('panel-cover--collapsed');
    } else {
      $('.panel-cover').css('max-width', currentWidth);
      $('.panel-cover').animate({ 'max-width': '320px', 'width': '22%' }, 400, 'swing', function () { });
    }


  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  // 移动端菜单按钮点击事件
  $('.btn-mobile-menu__icon').click(function () {
    // 菜单功能已在CSS中实现
  });

  // 滚动提示隐藏/显示
  var scrollIndicator = $('.scroll-indicator');
  if (scrollIndicator.length) {
    // 点击滚动提示：触发博客按钮点击，展开博客列表
    scrollIndicator.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 直接触发博客按钮的点击事件
      if (!$('.panel-cover').hasClass('panel-cover--collapsed')) {
        // 模拟点击博客按钮
        var blogButton = $('a.blog-button').first();
        if (blogButton.length) {
          blogButton[0].click(); // 使用原生click方法，确保触发事件
        }
      }
      
      // 延迟隐藏滚动提示，等待动画完成
      setTimeout(function() {
        scrollIndicator.fadeOut(300);
      }, 100);
      
      return false;
    });

    // 检查并更新滚动提示的显示状态
    var checkScrollIndicator = function() {
      var panelCollapsed = $('.panel-cover').hasClass('panel-cover--collapsed');
      var blogListVisible = $('.main-post-list').length && !$('.main-post-list').hasClass('hidden');
      var scrollTop = $(window).scrollTop() || $(document).scrollTop() || 0;
      
      // 如果面板已折叠（博客已展开），则隐藏滚动提示
      if (panelCollapsed) {
        if (scrollIndicator.is(':visible')) {
          scrollIndicator.fadeOut(300);
        }
        return;
      }
      
      // 如果博客列表可见且已滚动，则隐藏滚动提示
      if (blogListVisible && scrollTop > 100) {
        if (scrollIndicator.is(':visible')) {
          scrollIndicator.fadeOut(300);
        }
        return;
      }
      
      // 如果用户已经滚动了页面（虽然首页是fixed，但某些情况下可能滚动），则隐藏
      if (scrollTop > 100) {
        if (scrollIndicator.is(':visible')) {
          scrollIndicator.fadeOut(300);
        }
        return;
      }
      
      // 只有在首页初始状态（面板未折叠，博客列表隐藏，滚动在顶部）时才显示
      if (!panelCollapsed && !blogListVisible && scrollTop <= 10) {
        if (!scrollIndicator.is(':visible')) {
          scrollIndicator.fadeIn(300);
        }
      }
    };

    // 使用节流优化性能
    var scrollTimer = null;
    $(window).on('scroll', function() {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(checkScrollIndicator, 100);
    });
    
    $(window).on('resize', checkScrollIndicator);
    
    // 点击博客按钮时隐藏滚动提示
    $(document).on('click', 'a.blog-button', function() {
      setTimeout(function() {
        scrollIndicator.fadeOut(500);
      }, 200);
    });

    // 使用MutationObserver监听panel-cover类名变化（更精确）
    if (window.MutationObserver && $('.panel-cover').length) {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            setTimeout(checkScrollIndicator, 150);
          }
        });
      });
      
      try {
        observer.observe($('.panel-cover')[0], {
          attributes: true,
          attributeFilter: ['class']
        });
      } catch(e) {
        // 如果MutationObserver不支持，使用定时检查作为备选
        var checkPanelState = setInterval(function() {
          checkScrollIndicator();
        }, 500);
      }
    }

    // 初始检查
    setTimeout(checkScrollIndicator, 100);
    
    // 页面加载完成后再次检查
    $(window).on('load', function() {
      setTimeout(checkScrollIndicator, 200);
    });
  }

  // 页面加载动画
  if (!$('.panel-cover--collapsed').length) {
    $('body').css('opacity', '0');
    $(window).on('load', function() {
      setTimeout(function() {
        $('body').animate({opacity: 1}, 600);
      }, 100);
    });
  }

  // 平滑滚动
  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 800, 'swing');
    }
  });
});