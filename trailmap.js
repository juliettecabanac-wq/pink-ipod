(function () {
  'use strict';

  var script = document.currentScript;
  var WANT_POPUP = !!(script && script.getAttribute('data-popup') === 'true');

  var TITLE = 'pitchfork_trail.exe';
  var LAUNCHER_LABEL = 'Pitchfork trail';
  var INTRO_TITLE = 'Four interviews, one pink bike';
  var INTRO_TEXT = 'Press ride, or pick a stop to read the interview.';

  var STOPS = [
    { id: 'paulie-swan', name: 'Paulie Swan', url: 'paulie-swan.html', x: 80, y: 225, ly: 30, teaser: 'Edinburgh singer songwriter, met at a festival.' },
    { id: 'sade-olutola', name: 'Sade Olutola', url: 'sade-olutola.html', x: 240, y: 150, ly: -50, teaser: 'South London artist who lost her voice and whispered the rest.' },
    { id: 'petra', name: 'Petra', url: 'petra.html', x: 400, y: 215, ly: 30, teaser: 'Slovak born artist in London, recently electrocuted.' },
    { id: 'little-grandad', name: 'Little Grandad', url: 'little-grandad.html', x: 570, y: 95, ly: -50, teaser: 'Read the interview.' }
  ];

  var ROUTE = 'M80,225 C120,195 190,150 240,150 C300,150 330,215 400,215 C470,215 510,95 570,95';

  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var counter = 0;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function decor() {
    return '<rect class="m-paper" width="680" height="300"/>' +
      '<rect class="m-park" x="20" y="55" width="100" height="70"/>' +
      '<rect class="m-park" x="265" y="30" width="110" height="75"/>' +
      '<rect class="m-park" x="470" y="175" width="115" height="70"/>' +
      '<path class="m-river" d="M0,284 C120,264 240,300 380,282 S600,270 680,287"/>' +
      '<g class="m-roads">' +
      '<line x1="0" y1="60" x2="680" y2="60"/><line x1="0" y1="150" x2="680" y2="150"/><line x1="0" y1="235" x2="680" y2="235"/>' +
      '<line x1="160" y1="0" x2="160" y2="300"/><line x1="320" y1="0" x2="320" y2="300"/><line x1="480" y1="0" x2="480" y2="300"/><line x1="620" y1="0" x2="620" y2="300"/>' +
      '<line x1="400" y1="0" x2="450" y2="300"/></g>';
  }

  function wheel(dx) {
    return '<g transform="translate(' + dx + ',0)"><circle class="tb-wheel" r="9"/>' +
      '<g class="tb-spokes"><line x1="-8" y1="0" x2="8" y2="0"/><line x1="0" y1="-8" x2="0" y2="8"/></g></g>';
  }

  function bikeMarkup() {
    return '<g class="trail-bike" aria-hidden="true">' + wheel(-11) + wheel(11) +
      '<polyline class="tb-frame" points="-11,0 -3,-13 8,-13 11,0"/>' +
      '<polyline class="tb-frame" points="-3,-13 1,0 8,-13"/>' +
      '<polyline class="tb-frame" points="8,-13 7,-19 12,-19"/>' +
      '<line class="tb-seat" x1="-7" y1="-16" x2="0" y2="-16"/>' +
      '<rect class="tb-basket" x="9" y="-18" width="9" height="6"/></g>';
  }

  function build(host, opts) {
    opts = opts || {};
    var uid = 'trail' + (++counter);
    var current = -1;
    STOPS.forEach(function (s, i) { if (s.id === opts.current) { current = i; } });

    var pinsHtml = STOPS.map(function (s, i) {
      var here = i === current;
      return '<a class="trail-pin' + (here ? ' is-current' : '') + '" href="' + esc(s.url) + '" data-i="' + i + '"' +
        ' aria-label="' + (i + 1) + ', ' + esc(s.name) + (here ? ', you are here' : ', read the interview') + '"' +
        (here ? ' aria-current="page"' : '') + '>' +
        '<circle class="trail-halo" cx="' + s.x + '" cy="' + s.y + '" r="18"/>' +
        '<circle class="trail-dot" cx="' + s.x + '" cy="' + s.y + '" r="12"/>' +
        '<text class="trail-num" x="' + s.x + '" y="' + (s.y + 5) + '" text-anchor="middle">' + (i + 1) + '</text>' +
        '<text class="trail-label" x="' + s.x + '" y="' + (s.y + s.ly) + '" text-anchor="middle">' + esc(s.name) + '</text></a>';
    }).join('');

    var listHtml = STOPS.map(function (s, i) {
      var here = i === current;
      return '<li><a href="' + esc(s.url) + '" data-i="' + i + '"' + (here ? ' aria-current="page"' : '') + '>' +
        (i + 1) + '. ' + esc(s.name) + '</a></li>';
    }).join('');

    var barRight = opts.onClose
      ? '<button type="button" class="trail-close" aria-label="Close the trail map">×</button>'
      : '<span class="trail-bar-deco" aria-hidden="true"><i></i><i></i></span>';

    host.classList.add('trail');
    host.innerHTML =
      '<div class="trail-bar"><span>' + esc(TITLE) + '</span>' + barRight + '</div>' +
      '<svg class="trail-svg" viewBox="0 0 680 300" role="group" aria-labelledby="' + uid + '-t">' +
      '<title id="' + uid + '-t">Map of four interviews linked by a pink bike route</title>' +
      decor() + '<path class="trail-route" d="' + ROUTE + '"/>' + pinsHtml + bikeMarkup() + '</svg>' +
      '<div class="trail-caption"><p class="trail-cap-title"></p><p class="trail-cap-text"></p></div>' +
      '<div class="trail-controls"><button type="button" class="trail-btn">Ride the trail</button></div>' +
      '<ol class="trail-list">' + listHtml + '</ol>';

    var route = host.querySelector('.trail-route');
    var bike = host.querySelector('.trail-bike');
    var spokes = host.querySelectorAll('.tb-spokes');
    var pins = host.querySelectorAll('.trail-pin');
    var chips = host.querySelectorAll('.trail-list a');
    var capTitle = host.querySelector('.trail-cap-title');
    var capText = host.querySelector('.trail-cap-text');
    var total = route.getTotalLength();

    var lens = STOPS.map(function (s) {
      var best = 0, bd = 1e12;
      for (var l = 0; l <= total; l += 2) {
        var p = route.getPointAtLength(l);
        var d = (p.x - s.x) * (p.x - s.x) + (p.y - s.y) * (p.y - s.y);
        if (d < bd) { bd = d; best = l; }
      }
      return best;
    });

    var token = 0;
    var riding = false;
    var lastDir = 1;
    var curLen = lens[0];

    function setBike(len) {
      curLen = len;
      var p = route.getPointAtLength(len);
      var q = route.getPointAtLength(Math.min(total, len + 2));
      if (Math.abs(q.x - p.x) > 0.2) { lastDir = q.x > p.x ? 1 : -1; }
      bike.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ',' + (p.y - 14).toFixed(1) + ') scale(' + (lastDir * 1.4) + ',1.4)');
      var a = (len * 7).toFixed(0);
      for (var i = 0; i < spokes.length; i++) { spokes[i].setAttribute('transform', 'rotate(' + a + ')'); }
    }

    function showCaption(i) {
      if (i === null || i < 0) {
        capTitle.textContent = INTRO_TITLE;
        capText.textContent = INTRO_TEXT;
        return;
      }
      capTitle.textContent = (i + 1) + '. ' + STOPS[i].name + (i === current ? ' (you are here)' : '');
      capText.textContent = STOPS[i].teaser;
    }

    function setActive(i) {
      for (var k = 0; k < pins.length; k++) { pins[k].classList.toggle('is-active', k === i); }
      for (var c = 0; c < chips.length; c++) { chips[c].classList.toggle('is-active', c === i); }
      showCaption(i);
    }

    function rest() {
      setActive(null);
      showCaption(current >= 0 ? current : null);
    }

    function ride(from, to, dur, my) {
      return new Promise(function (res) {
        if (REDUCED || dur <= 0) { setBike(to); res(); return; }
        var t0 = performance.now();
        function step(t) {
          if (my !== token) { res(); return; }
          var k = Math.min(1, (t - t0) / dur);
          var e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          setBike(from + (to - from) * e);
          if (k < 1) { requestAnimationFrame(step); } else { res(); }
        }
        requestAnimationFrame(step);
      });
    }

    function wait(ms) {
      return new Promise(function (r) { setTimeout(r, REDUCED ? Math.min(ms, 500) : ms); });
    }

    async function play() {
      var my = ++token;
      riding = true;
      setBike(lens[0]);
      setActive(0);
      await wait(700);
      for (var i = 1; i < STOPS.length; i++) {
        if (my !== token) { return; }
        await ride(lens[i - 1], lens[i], 1900, my);
        if (my !== token) { return; }
        setActive(i);
        await wait(1100);
      }
      if (my === token) { riding = false; }
    }

    function stop() {
      token++;
      riding = false;
    }

    function hover(i) { if (!riding) { setActive(i); } }
    function unhover() { if (!riding) { rest(); } }

    [].forEach.call(pins, function (el) {
      var i = +el.getAttribute('data-i');
      el.addEventListener('mouseenter', function () { hover(i); });
      el.addEventListener('focus', function () { hover(i); });
      el.addEventListener('mouseleave', unhover);
      el.addEventListener('blur', unhover);
    });
    [].forEach.call(chips, function (el) {
      var i = +el.getAttribute('data-i');
      el.addEventListener('mouseenter', function () { hover(i); });
      el.addEventListener('focus', function () { hover(i); });
      el.addEventListener('mouseleave', unhover);
      el.addEventListener('blur', unhover);
    });

    host.querySelector('.trail-btn').addEventListener('click', play);
    if (opts.onClose) { host.querySelector('.trail-close').addEventListener('click', opts.onClose); }

    function whenVisible(fn) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) { io.disconnect(); fn(); }
        }, { threshold: 0.4 });
        io.observe(host);
      } else {
        fn();
      }
    }

    var startIdx = current > 0 ? current - 1 : 0;
    setBike(REDUCED && current >= 0 ? lens[current] : lens[startIdx]);
    rest();

    if (!opts.manual) {
      if (current < 0) {
        whenVisible(play);
      } else if (current > 0) {
        whenVisible(function () {
          var my = ++token;
          wait(300).then(function () {
            if (my === token) { return ride(lens[current - 1], lens[current], 1700, my); }
          });
        });
      }
    }

    return { play: play, stop: stop };
  }

  function mountPopup() {
    var KEY = 'trailmap_seen';
    var seen = false;
    try { seen = window.sessionStorage.getItem(KEY) === '1'; } catch (e) { seen = false; }

    var box = document.createElement('aside');
    box.className = 'trail-popup';
    box.setAttribute('aria-label', 'Interview trail map');
    box.hidden = true;
    var host = document.createElement('div');
    box.appendChild(host);

    var launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'trail-launcher';
    launcher.textContent = LAUNCHER_LABEL;
    launcher.hidden = true;

    document.body.appendChild(box);
    document.body.appendChild(launcher);

    var inst = null;

    function open() {
      box.hidden = false;
      launcher.hidden = true;
      if (!inst) { inst = build(host, { manual: true, onClose: close }); }
      inst.play();
    }

    function close() {
      box.hidden = true;
      launcher.hidden = false;
      if (inst) { inst.stop(); }
      try { window.sessionStorage.setItem(KEY, '1'); } catch (e) { }
    }

    launcher.addEventListener('click', open);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) { close(); }
    });

    if (seen) { launcher.hidden = false; } else { window.setTimeout(open, 1800); }
  }

  function init() {
    var nodes = document.querySelectorAll('[data-trailmap]');
    for (var i = 0; i < nodes.length; i++) {
      build(nodes[i], { current: nodes[i].getAttribute('data-current') });
    }
    if (WANT_POPUP) { mountPopup(); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
