/*============================================================
Template Name   : CK airtech
Description     : Industrial & Manufacturing HTML Template
Author          : JRM Infotech
Version         : 1.0
==============================================================*/

(function($) {
    "use strict";

    // multi level dropdown menu
    $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
        if (!$(this).next().hasClass("show")) {
            $(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass("show");

        $(this)
            .parents("li.nav-item.dropdown.show")
            .on("hidden.bs.dropdown", function(e) {
                $(".dropdown-submenu .show").removeClass("show");
            });
        return false;
    });

    //Header Search
    if ($(".search-box-outer").length) {
        $(".search-box-outer").on("click", function() {
            $("body").addClass("search-active");
        });
        $(".close-search").on("click", function() {
            $("body").removeClass("search-active");
        });
    }

    // data-background
    $(document).on("ready", function() {
        $("[data-background]").each(function() {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
        });
    });

    // sidebar popup
    $(".sidebar-btn").on("click", function() {
        $(".sidebar-popup").addClass("open");
        $(".sidebar-wrapper").addClass("open");
    });
    $(".close-sidebar-popup, .sidebar-popup").on("click", function() {
        $(".sidebar-popup").removeClass("open");
        $(".sidebar-wrapper").removeClass("open");
    });

    // wow init
    new WOW().init();

    // hero slider
    $(".hero-slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        margin: 0,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 5000,
        navText: ["<i class='far fa-long-arrow-left'></i>", "<i class='far fa-long-arrow-right'></i>"],
        onInitialized: animateSlide,
        onChanged: animateSlide,
    });

    // animate slide
    function animateSlide(event) {
        let elements = $(".owl-item").eq(event.item.index).find("[data-animation]");
        elements.each(function() {
            let el = $(this),
                delay = el.data("delay"),
                duration = el.data("duration"),
                anim = "animated " + el.data("animation");

            el.css({
                "animation-delay": delay,
                "animation-duration": duration,
            });

            el.addClass(anim).one("animationend", () => el.removeClass(anim));
        });
    }

    // portfolio-slider
    $(".portfolio-slider").owlCarousel({
        loop: true,
        margin: 40,
        nav: true,
        dots: false,
        navText: ["<i class='far fa-angle-left'></i>", "<i class='far fa-angle-right'></i>"],
        autoplay: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        },
    });

    // service-slider
    $(".service-slider").owlCarousel({
        loop: true,
        margin: 22,
        nav: true,
        dots: false,
        navText: ["<i class='far fa-angle-left'></i>", "<i class='far fa-angle-right'></i>"],
        autoplay: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1200: {
                items: 4,
            },
        },
    });

    // partner-slider
    $(".partner-slider").owlCarousel({
        loop: true,
        margin: 25,
        nav: false,
        navText: ["<i class='icofont-long-arrow-left'></i>", "<i class='icofont-long-arrow-right'></i>"],
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 2000,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 6,
            },
        },
    });

    // testimonial-slider
    $(".testimonial-slider").owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        smartSpeed: 1500,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1200: {
                items: 2,
            },
        },
    });

    // preloader
    $(window).on("load", function() {
        $(".preloader").fadeOut("slow");
    });

    // fun fact counter
    $(".counter").countTo();
    $(".counter-box").appear(
        function() {
            $(".counter").countTo();
        }, {
            accY: -100,
        },
    );


 // magnific popup init
$(".popup-gallery").magnificPopup({
    delegate: ".popup-img",
    type: "image",
    gallery: {
        enabled: true,
    },
});

$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
    iframe: {
        patterns: {
            youtube: {
                index: "youtube.com/",
                id: function (url) {
                    var match = url.match(
                        /(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([^?&/]+)/
                    );
                    return match ? match[1] : null;
                },
                src: "https://www.youtube.com/embed/%id%?autoplay=1"
            },
            youtu_be: {
                index: "youtu.be/",
                id: "/",
                src: "https://www.youtube.com/embed/%id%?autoplay=1"
            }
        }
    }
});


    // progress bar
    $(document).ready(function() {
        var progressBar = $(".progress");
        if (progressBar.length) {
            progressBar.each(function() {
                var Self = $(this);
                Self.appear(function() {
                    var progressValue = Self.data("value");
                    Self.find(".progress-bar").animate({
                            width: progressValue + "%",
                        },
                        1000,
                    );
                });
            });
        }
    });

    // case filter
    $(window).on("load", function() {
        if ($(".filter-box").children().length > 0) {
            $(".filter-box").isotope({
                itemSelector: ".filter-item",
                masonry: {
                    columnWidth: 1,
                },
            });

            $(".filter-btn").on("click", "li", function() {
                var filterValue = $(this).attr("data-filter");
                $(".filter-box").isotope({
                    filter: filterValue
                });
            });

            $(".filter-btn li").each(function() {
                $(this).on("click", function() {
                    $(this).siblings("li.active").removeClass("active");
                    $(this).addClass("active");
                });
            });
        }
    });

    // scroll to top
    $(window).scroll(function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            $("#scroll-top").addClass("active");
        } else {
            $("#scroll-top").removeClass("active");
        }
    });

    $("#scroll-top").on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    // navbar fixed top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $(".navbar").addClass("fixed-top");
        } else {
            $(".navbar").removeClass("fixed-top");
        }
    });

    // countdown
    $("[data-countdown]").each(function() {
        let finalDate = $(this).data("countdown");
        $(this).countdown(finalDate, function(event) {
            $(this).html(
                event.strftime(
                    '<div class="time-wrap">' +
                    '<span class="time"><span>%-D</span><span class="unit">Day%!D</span></span>' +
                    ' <span class="divider">:</span> ' +
                    '<span class="time"><span>%H</span><span class="unit">Hour%!H</span></span>' +
                    ' <span class="divider">:</span> ' +
                    '<span class="time"><span>%M</span><span class="unit">Min%!M</span></span>' +
                    ' <span class="divider">:</span> ' +
                    '<span class="time"><span>%S</span><span class="unit">Sec%!S</span></span>' +
                    "</div>",
                ),
            );
        });
    });

    // copywrite date
    let date = new Date().getFullYear();
    $("#date").html(date);

    // auth password view
    $(".password-view").on("click", function() {
        var pwd = document.getElementById("password");
        if (pwd.type === "password") {
            pwd.type = "text";
            $(this).addClass("show");
        } else {
            pwd.type = "password";
            $(this).removeClass("show");
        }
    });

    // profile image btn
    $(".profile-img-btn").on("click", function() {
        $(".profile-img-file").click();
    });

    // banner-img
    $(".banner-img-wrap .img-item").on("mouseenter", function() {
        $(this).addClass("active").siblings().removeClass("active");
    });

    // hover bg change
    const $pwrap = $(".hbc-wrap");
    $(".portfolio-wrap .item").on("mouseenter", function() {
        $(".portfolio-wrap .item").removeClass("active");
        $(this).addClass("active");
        $pwrap.css("background-image", "url(" + $(this).data("bg") + ")");
    });



// our mission & vision 
(function () {
  var root = document.querySelector('[data-ckmvv]');
  if (!root) return;
  root.classList.add('js');
 
  var panels = Array.prototype.slice.call(root.querySelectorAll('.ckmvv-panel'));
  var heads = panels.map(function (p) { return p.querySelector('.ckmvv-head'); });
  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqDesktop = window.matchMedia('(min-width: 992px)');
  var mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  var current = 0, autoplay = true, inView = false, hoverTimer = null;
 
  function onChange(mq, fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn); else mq.addListener(fn);
  }
 
  function syncPlay() {
    root.classList.toggle('is-playing', autoplay && inView && mqDesktop.matches && !mqReduce.matches);
  }
 
  function activate(index, byUser) {
    if (byUser) autoplay = false;
    panels.forEach(function (p, i) {
      var on = i === index;
      p.classList.toggle('is-active', on);
      heads[i].setAttribute('aria-expanded', on ? 'true' : 'false');
    });
    current = index;
    syncPlay();
  }
 
  /* auto-advance: the progress bar's animation ends → open the next panel */
  root.addEventListener('animationend', function (e) {
    if (e.animationName === 'ckmvvFill') activate((current + 1) % panels.length, false);
  });
 
  panels.forEach(function (panel, i) {
    heads[i].addEventListener('click', function () { activate(i, true); });
 
    heads[i].addEventListener('keydown', function (e) {
      var target = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') target = (i + 1) % panels.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') target = (i - 1 + panels.length) % panels.length;
      else if (e.key === 'Home') target = 0;
      else if (e.key === 'End') target = panels.length - 1;
      if (target === null) return;
      e.preventDefault();
      heads[target].focus();
      activate(target, true);
    });
 
    /* pointer: open on hover (desktop mouse) + light that follows the cursor */
    panel.addEventListener('pointermove', function (e) {
      if (!mqHover.matches || !mqDesktop.matches || mqReduce.matches) return;
      var r = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      panel.style.setProperty('--my', (e.clientY - r.top) + 'px');
      if (panel.classList.contains('is-active') || hoverTimer) return;
      if (!e.movementX && !e.movementY) return; /* ignore events caused only by the layout moving */
      hoverTimer = setTimeout(function () { hoverTimer = null; activate(i, true); }, 90);
    });
    panel.addEventListener('pointerleave', function () {
      clearTimeout(hoverTimer); hoverTimer = null;
    });
  });
 
  onChange(mqDesktop, syncPlay);
  onChange(mqReduce, syncPlay);
 
  /* reveal once + only autoplay while the section is on screen */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        inView = en.isIntersecting;
        if (inView) root.classList.add('is-revealed');
        syncPlay();
      });
    }, { threshold: 0.15 }).observe(root);
  } else {
    root.classList.add('is-revealed');
    inView = true;
    syncPlay();
  }
 
  activate(0, false);
})();

// Air pollution solutions
(function () {
  var root = document.querySelector('[data-ckaps]');
  if (!root) return;
  root.classList.add('js');
 
  /* entrance animation, once, when the section scrolls into view */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { root.classList.add('is-revealed'); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(root);
  } else {
    root.classList.add('is-revealed');
  }
 
  /* the green fill starts from where the pointer enters and retreats toward where it leaves */
  function setOrigin(card, e) {
    var r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }
  Array.prototype.forEach.call(root.querySelectorAll('.ckaps-card'), function (card) {
    card.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') setOrigin(card, e); });
    card.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') setOrigin(card, e); });
  });
})();

// infrastructurejs
(function () {
  var els = document.querySelectorAll('[data-ckin-count]');
  if (!els.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fmt(n, el) { return n.toLocaleString('en-IN') + (el.getAttribute('data-suffix') || ''); }

  function run(el) {
    var target = parseInt(el.getAttribute('data-ckin-count'), 10);
    if (reduce) { el.textContent = fmt(target, el); return; }
    var start = null, dur = 1800;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased), el);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }
})();


// Products pages JS
(function () {
  /* ---- image placeholders: if a photo file is missing, show a grey placeholder instead ---- */
  function phSrc(label) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 800'><rect width='1000' height='800' fill='#e9e6e3'/>" +
      "<circle cx='430' cy='300' r='34' fill='#c9c4c0'/><path d='M350 470l90-115 75 90 55-70 90 95z' fill='#c9c4c0'/>" +
      "<text x='500' y='580' font-family='sans-serif' font-size='40' text-anchor='middle' fill='#757f95'>" + label + "</text></svg>";
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }
  Array.prototype.forEach.call(document.querySelectorAll('img[data-ph]'), function (img) {
    function swap() { img.src = phSrc(img.getAttribute('data-ph')); }
    img.addEventListener('error', swap, { once: true });
    if (img.complete && img.naturalWidth === 0) swap();
  });
 
  /* ---- hero gallery: main slider + thumbnail slider ---- */
  if (window.Swiper) {
    var thumbs = new Swiper('.ckpd-thumbs', {
      slidesPerView: 3, spaceBetween: 10, watchSlidesProgress: true, freeMode: true,
      breakpoints: { 576: { slidesPerView: 4, spaceBetween: 12 }, 992: { slidesPerView: 5, spaceBetween: 12 } }
    });
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    new Swiper('.ckpd-main', {
      speed: 700, keyboard: { enabled: true },
      rewind: true,                                   /* after the last image, go back to the first */
      autoplay: reduceMotion ? false : {
        delay: 3500,                                  /* time each image stays, in milliseconds */
        disableOnInteraction: false,                  /* keep playing after someone clicks an arrow or thumbnail */
        pauseOnMouseEnter: true                       /* pause while the mouse is over the slider */
      },
      navigation: { prevEl: '.ckpd-arrow--prev', nextEl: '.ckpd-arrow--next' },
      thumbs: { swiper: thumbs }
    });
  }
 
  /* ---- tabs ---- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.ckpd-tab'));
  function openTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab, panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panel.classList.toggle('is-active', on);
      if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
    });
    if (tab.scrollIntoView) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { openTab(tab, false); history.replaceState(null, '', '#' + tab.id.replace('tab-', '')); });
    tab.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n === null) return;
      e.preventDefault(); openTab(tabs[n], true);
    });
  });
  var fromHash = document.getElementById('tab-' + location.hash.replace('#', ''));
  if (fromHash && fromHash.classList.contains('ckpd-tab')) openTab(fromHash, false);
 
  /* ---- FAQ accordion (one open at a time) ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.ckpd-item'));
  items.forEach(function (item) {
    item.querySelector('.ckpd-q').addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      items.forEach(function (it) {
        it.classList.remove('is-open');
        it.querySelector('.ckpd-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('is-open'); item.querySelector('.ckpd-q').setAttribute('aria-expanded', 'true'); }
    });
  });
})();


// features seection
(function () {
  var root = document.querySelector('.ckfh');
  if (!root) return;
  var items = [].slice.call(root.querySelectorAll('.ckfh-item'));
  var dots = [].slice.call(root.querySelectorAll('.ckfh-dot'));
  var core = root.querySelector('.ckfh-core');
  var cIco = root.querySelector('.ckfh-core-ico');
  var cName = root.querySelector('.ckfh-core-name');
  var cNo = root.querySelector('.ckfh-core-no');
  var stage = root.querySelector('.ckfh-stage');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var angles = [225, 195, 165, 135, 315, 345, 15, 45];   /* where each item's dot sits on the ring */
  var cur = 0, timer = null, visible = false, paused = false;
 
  dots.forEach(function (d, i) {
    var r = angles[i] * Math.PI / 180;
    d.style.left = (50 + 50 * Math.cos(r)) + '%';
    d.style.top = (50 + 50 * Math.sin(r)) + '%';
  });
 
  function set(i) {
    cur = i;
    items.forEach(function (it, k) {
      it.classList.toggle('is-active', k === i);
      it.querySelector('button').setAttribute('aria-pressed', k === i ? 'true' : 'false');
      dots[k].classList.toggle('is-active', k === i);
    });
    cIco.className = items[i].getAttribute('data-icon') + ' ckfh-core-ico';
    cName.textContent = items[i].getAttribute('data-name');
    cNo.textContent = '0' + (i + 1) + ' / 08';
    core.classList.remove('is-swap'); void core.offsetWidth; core.classList.add('is-swap');
  }
  function stop() { clearInterval(timer); timer = null; }
  function start() {
    stop();
    if (reduce || paused || !visible) return;
    timer = setInterval(function () { set((cur + 1) % items.length); }, 3200);
  }
 
  items.forEach(function (it, i) {
    var b = it.querySelector('button');
    b.addEventListener('click', function () { set(i); });
    b.addEventListener('focus', function () { set(i); });
    it.addEventListener('mouseenter', function () { set(i); });
  });
  stage.addEventListener('mouseenter', function () { paused = true; stop(); });
  stage.addEventListener('mouseleave', function () { paused = false; start(); });
  stage.addEventListener('focusin', function () { paused = true; stop(); });
  stage.addEventListener('focusout', function () { paused = false; start(); });
 
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; start(); }, { threshold: 0.3 }).observe(root);
  } else { visible = true; start(); }
 
  set(0);
})();

// Application Page Js
(function () {
  var root = document.querySelector('.ckap');
  if (!root) return;
 
  /* grey placeholder while a photo file is missing */
  var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 560'><rect width='1200' height='560' fill='#e9e6e3'/>" +
    "<circle cx='540' cy='150' r='28' fill='#c9c4c0'/><path d='M460 270l90-105 75 80 55-62 90 87z' fill='#c9c4c0'/>" +
    "<text x='600' y='335' font-family='sans-serif' font-size='28' text-anchor='middle' fill='#757f95'>Image placeholder (1200 x 560)</text></svg>";
  var phSrc = 'data:image/svg+xml,' + encodeURIComponent(svg);
  var imgs = [].slice.call(root.querySelectorAll('img[data-ph]'));
  function swap(img) { if (img.src !== phSrc) img.src = phSrc; }
  imgs.forEach(function (img) {
    img.addEventListener('error', function () { swap(img); });
    if (img.complete && img.naturalWidth === 0) swap(img);
  });
  window.addEventListener('load', function () {
    imgs.forEach(function (img) { if (img.complete && img.naturalWidth === 0) swap(img); });
  });
 
  /* a parent with overflow hidden/auto switches sticky off; make such wrappers clip instead */
  var side = root.querySelector('.ckap-side');
  for (var p = side && side.parentElement; p && p !== document.documentElement; p = p.parentElement) {
    var cs = getComputedStyle(p);
    if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
      p.style.setProperty('overflow-x', 'clip');
      p.style.setProperty('overflow-y', 'visible');
    }
  }
 
  /* keep the sticky column clear of the site's own sticky header */
  var headers = [].slice.call(document.querySelectorAll('header, .header, #header, nav.navbar, .navbar, [class*="header-"]'))
    .filter(function (el) { return !root.contains(el); });
 
  /* fallback: if native sticky is switched off by the theme, move the column with the scroll instead */
  var col = root.querySelector('.ckap-col-side');
  var wide = window.matchMedia('(min-width: 992px)');
  var jsMode = false;
  function emulate() {
    if (!side || !col) return;
    if (!wide.matches) {
      if (jsMode) { jsMode = false; root.classList.remove('is-js-sticky'); side.style.transform = ''; }
      return;
    }
    var off = parseFloat(getComputedStyle(root).getPropertyValue('--ckap-top')) || 190;
    var cr = col.getBoundingClientRect();
    var sr = side.getBoundingClientRect();
    if (!jsMode) {
      /* native sticky would be holding the column at the offset; if it is not, switch to the fallback */
      if (cr.top < off - 40 && sr.top < off - 40 && cr.bottom > off + sr.height + 40) {
        jsMode = true; root.classList.add('is-js-sticky');
      } else return;
    }
    var room = Math.max(cr.height - side.offsetHeight, 0);
    var ty = Math.min(Math.max(off - cr.top, 0), room);
    side.style.transform = 'translate3d(0,' + ty + 'px,0)';
  }
 
  var ticking = false;
  function measure() {
    var bottom = 0;
    headers.forEach(function (el) {
      var pos = getComputedStyle(el).position;
      if (pos !== 'fixed' && pos !== 'sticky') return;
      var r = el.getBoundingClientRect();
      if (r.height === 0 || r.top > 10 || r.bottom <= 0) return;
      if (r.bottom > bottom) bottom = r.bottom;
    });
    if (bottom > 0) root.style.setProperty('--ckap-top', Math.round(bottom + 20) + 'px');
    emulate();
    ticking = false;
  }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(measure); } }
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  window.addEventListener('load', queue);
  measure();
 
  /* filter: show one industry, or all; the form follows the filter */
  var btns = [].slice.call(root.querySelectorAll('.ckap-filter'));
  var cards = [].slice.call(root.querySelectorAll('.ckap-card'));
  var industry = root.querySelector('#ckap-industry');
  var forLabel = root.querySelector('[data-ckap-for]');
  var layout = root.querySelector('.row');
 
  function apply(key, scroll) {
    var title = 'All industries';
    btns.forEach(function (b) {
      var on = b.getAttribute('data-filter') === key;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on && b.getAttribute('data-title')) title = b.getAttribute('data-title');
    });
    cards.forEach(function (c) {
      var show = key === 'all' || c.getAttribute('data-key') === key;
      c.hidden = !show;
      if (show) { c.classList.remove('is-in'); void c.offsetWidth; c.classList.add('is-in'); }
    });
    if (industry) industry.value = title;
    if (forLabel) forLabel.textContent = title;
    if (scroll) {
      var top = parseFloat(getComputedStyle(root).getPropertyValue('--ckap-top')) || 190;
      var y = layout.getBoundingClientRect().top + window.pageYOffset - top;
      if (window.pageYOffset > y) window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (window.history && history.replaceState) history.replaceState(null, '', key === 'all' ? location.pathname + location.search : '#' + key);
  }
 
  btns.forEach(function (b) {
    b.addEventListener('click', function () { apply(b.getAttribute('data-filter'), true); });
  });
 
  var start = location.hash.replace('#', '');
  var valid = btns.some(function (b) { return b.getAttribute('data-filter') === start; });
  apply(valid ? start : 'all', false);
})();


// Service Page JS
(function () {
  /* grey placeholder while a photo file is missing */
  function placeholder(img) {
    var w = img.getAttribute('data-w'), h = img.getAttribute('data-h');
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + w + " " + h + "'><rect width='" + w + "' height='" + h + "' fill='#e9e6e3'/>" +
      "<circle cx='" + (w * 0.44) + "' cy='" + (h * 0.38) + "' r='" + (w * 0.04) + "' fill='#c9c4c0'/>" +
      "<path d='M" + (w * 0.3) + " " + (h * 0.62) + "l" + (w * 0.13) + " -" + (h * 0.16) + " " + (w * 0.11) + " " + (h * 0.12) + " " + (w * 0.08) + " -" + (h * 0.09) + " " + (w * 0.13) + " " + (h * 0.13) + "z' fill='#c9c4c0'/>" +
      "<text x='" + (w / 2) + "' y='" + (h * 0.76) + "' font-family='sans-serif' font-size='" + Math.round(w * 0.035) + "' text-anchor='middle' fill='#757f95'>Image placeholder " + img.getAttribute('data-ph') + "</text></svg>";
    var src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    if (img.src !== src) img.src = src;
  }
  var imgs = [].slice.call(document.querySelectorAll('.cksv-intro img[data-ph]'));
  imgs.forEach(function (img) {
    img.addEventListener('error', function () { placeholder(img); });
    if (img.complete && img.naturalWidth === 0) placeholder(img);
  });
  window.addEventListener('load', function () {
    imgs.forEach(function (img) { if (img.complete && img.naturalWidth === 0) placeholder(img); });
  });
 
  /* project journey: draw the line and light up the steps once, when they come into view */
  var journey = document.querySelector('.cksv-journey');
  if (!journey) return;
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { journey.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(journey);
  } else { journey.classList.add('is-in'); }
})();

// Quality Page JS
(function () {
  var root = document.querySelector('.ckq');
  if (!root) return;
  root.classList.add('js');
 
  /* grey placeholder while the certificate file is missing */
  var img = root.querySelector('.ckq-paper img');
  function placeholder() {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 1273'><rect width='900' height='1273' fill='#e9e6e3'/>" +
      "<rect x='70' y='70' width='260' height='90' fill='#d6d1cd'/><rect x='70' y='300' width='520' height='70' fill='#d6d1cd'/>" +
      "<rect x='70' y='420' width='360' height='28' fill='#d6d1cd'/><rect x='70' y='480' width='680' height='20' fill='#d6d1cd'/><rect x='70' y='520' width='620' height='20' fill='#d6d1cd'/>" +
      "<rect x='70' y='640' width='420' height='24' fill='#d6d1cd'/><rect x='70' y='690' width='500' height='24' fill='#d6d1cd'/>" +
      "<text x='450' y='980' font-family='sans-serif' font-size='34' text-anchor='middle' fill='#757f95'>Certificate placeholder (900 x 1273)</text></svg>";
    var src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    if (img.src !== src) img.src = src;
  }
  img.addEventListener('error', placeholder);
  if (img.complete && img.naturalWidth === 0) placeholder();
  window.addEventListener('load', function () { if (img.complete && img.naturalWidth === 0) placeholder(); });
 
  /* cards slide in once, when the section scrolls into view */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { root.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(root);
  } else { root.classList.add('is-in'); }
 
  /* certificate viewer */
  var open = root.querySelector('.ckq-cert');
  var box = root.querySelector('.ckq-lightbox');
  var big = box.querySelector('img');
  var close = box.querySelector('.ckq-close');
 
  function show() {
    big.src = img.getAttribute('data-full') || img.src;
    box.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    close.focus();
  }
  function hide() {
    box.hidden = true;
    document.documentElement.style.overflow = '';
    open.focus();
  }
  open.addEventListener('click', show);
  close.addEventListener('click', hide);
  box.addEventListener('click', function (e) { if (e.target === box) hide(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) hide(); });
})();


// Careers Page JS
(function () {
  var jobsRoot = document.querySelector('.ckcr-jobs');
  var form = document.querySelector('.ckcr-form');
  if (!jobsRoot || !form) return;
 
  /* job cards: click to open or close; the first one starts open */
  var jobs = [].slice.call(jobsRoot.querySelectorAll('.ckcr-job'));
  jobs.forEach(function (job) {
    var toggle = job.querySelector('.ckcr-toggle');
    toggle.addEventListener('click', function () {
      var open = !job.classList.contains('is-open');
      job.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    /* Apply Now: pick this job in the form and scroll to it */
    job.querySelector('[data-apply]').addEventListener('click', function () {
      var select = document.getElementById('ckcr-job');
      select.value = job.getAttribute('data-title');
      var target = document.getElementById('ckcr-apply');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var field = document.getElementById('ckcr-job-field');
      field.classList.remove('is-flash'); void field.offsetWidth; field.classList.add('is-flash');
      setTimeout(function () { document.getElementById('ckcr-name').focus({ preventScroll: true }); }, 700);
    });
  });
 
  /* description counter */
  var desc = document.getElementById('ckcr-desc');
  var count = document.getElementById('ckcr-count');
  function updateCount() {
    count.textContent = desc.value.length + ' of 500 max characters.';
    count.classList.toggle('is-near', desc.value.length >= 450);
  }
  desc.addEventListener('input', updateCount);
  updateCount();
 
  /* resume upload: show the file name, accept drag and drop, check type and size */
  var input = document.getElementById('ckcr-resume');
  var drop = document.getElementById('ckcr-drop');
  var nameEl = drop.querySelector('[data-file-name]');
  var idle = nameEl.textContent;
  function check() {
    var f = input.files && input.files[0];
    input.setCustomValidity('');
    if (!f) { nameEl.textContent = idle; drop.classList.remove('is-filled'); return; }
    var okType = /\.(pdf|doc|docx)$/i.test(f.name);
    var okSize = f.size <= 5 * 1024 * 1024;
    if (!okType || !okSize) {
      input.setCustomValidity(!okType ? 'Please choose a PDF or DOC file.' : 'The file must be 5 MB or smaller.');
      input.reportValidity();
      input.value = '';
      nameEl.textContent = idle; drop.classList.remove('is-filled');
      return;
    }
    nameEl.textContent = f.name;
    drop.classList.add('is-filled');
  }
  input.addEventListener('change', check);
  ['dragenter', 'dragover'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-drag'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('is-drag'); });
  });
  drop.addEventListener('drop', function (e) {
    if (e.dataTransfer && e.dataTransfer.files.length) { input.files = e.dataTransfer.files; check(); }
  });
})();

    // bootstrap tooltip enable
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
})(jQuery);