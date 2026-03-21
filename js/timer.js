// Athletic 18W - Timer with SVG Ring
window.Timer = (function() {
  var CIRC = 2 * Math.PI * 85; // ≈ 533.98
  var totalSeconds = 0;
  var remaining = 0;
  var interval = null;
  var running = false;
  var audioCtx = null;

  function getEl(id) { return document.getElementById(id); }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function setProgress(s) {
    var circle = getEl('timer-progress-circle');
    if (!circle) return;
    var pct = totalSeconds > 0 ? s / totalSeconds : 0;
    var offset = CIRC * (1 - pct);
    circle.style.strokeDasharray = CIRC;
    circle.style.strokeDashoffset = offset;
  }

  function updateDisplay() {
    var disp = getEl('timer-display');
    if (disp) {
      disp.textContent = formatTime(remaining);
      disp.classList.toggle('finished', remaining <= 0);
    }
    setProgress(remaining);
  }

  function playBeep() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.4);
    } catch(e) {}
  }

  function onFinish() {
    running = false;
    clearInterval(interval);
    interval = null;
    remaining = 0;
    updateDisplay();
    try { if (navigator.vibrate) navigator.vibrate([200, 100, 200]); } catch(e) {}
    playBeep();
    showControls('finished');
  }

  function showControls(state) {
    var start   = getEl('timer-start');
    var pause   = getEl('timer-pause');
    var resume  = getEl('timer-resume');
    var reset   = getEl('timer-reset');
    if (!start) return;
    if (state === 'idle') {
      start.style.display = '';
      pause.style.display = 'none';
      resume.style.display = 'none';
      reset.style.display = 'none';
    } else if (state === 'running') {
      start.style.display = 'none';
      pause.style.display = '';
      resume.style.display = 'none';
      reset.style.display = '';
    } else if (state === 'paused') {
      start.style.display = 'none';
      pause.style.display = 'none';
      resume.style.display = '';
      reset.style.display = '';
    } else if (state === 'finished') {
      start.style.display = 'none';
      pause.style.display = 'none';
      resume.style.display = 'none';
      reset.style.display = '';
    }
  }

  function startCounting() {
    if (interval) clearInterval(interval);
    running = true;
    showControls('running');
    interval = setInterval(function() {
      if (!running) { clearInterval(interval); return; }
      remaining -= 1;
      if (remaining <= 0) {
        onFinish();
      } else {
        updateDisplay();
      }
    }, 1000);
  }

  function initCircle() {
    var circle = getEl('timer-progress-circle');
    if (circle) {
      circle.style.strokeDasharray = CIRC;
      circle.style.strokeDashoffset = 0;
    }
  }

  function wireButtons() {
    var start  = getEl('timer-start');
    var pause  = getEl('timer-pause');
    var resume = getEl('timer-resume');
    var reset  = getEl('timer-reset');
    var closeBtn = getEl('timer-close');
    var overlay = getEl('timer-overlay');

    if (start)  start.addEventListener('click', function() { startCounting(); });
    if (pause)  pause.addEventListener('click', function() {
      running = false;
      clearInterval(interval);
      interval = null;
      showControls('paused');
    });
    if (resume) resume.addEventListener('click', function() { startCounting(); });
    if (reset)  reset.addEventListener('click', function() {
      running = false;
      clearInterval(interval);
      interval = null;
      remaining = totalSeconds;
      updateDisplay();
      showControls('idle');
    });
    if (closeBtn) closeBtn.addEventListener('click', function() { Timer.close(); });
    if (overlay) overlay.addEventListener('click', function(e) {
      if (e.target === overlay) Timer.close();
    });

    var adjustBtns = document.querySelectorAll('.timer-adjust-btn');
    for (var i = 0; i < adjustBtns.length; i++) {
      adjustBtns[i].addEventListener('click', function() {
        var adj = parseInt(this.getAttribute('data-adjust'), 10);
        remaining = Math.max(0, remaining + adj);
        totalSeconds = Math.max(totalSeconds, remaining);
        updateDisplay();
        if (remaining > 0 && !running && interval === null) {
          showControls('paused');
        }
      });
    }
  }

  var buttonsWired = false;

  return {
    open: function(seconds, label) {
      if (!buttonsWired) { wireButtons(); buttonsWired = true; }
      running = false;
      if (interval) { clearInterval(interval); interval = null; }

      totalSeconds = Math.max(1, parseInt(seconds, 10) || 60);
      remaining = totalSeconds;

      var overlay = getEl('timer-overlay');
      var sheet = getEl('timer-sheet');
      var header = sheet ? sheet.querySelector('.timer-header h2') : null;
      var labelEl = sheet ? sheet.querySelector('.timer-label-text') : null;

      if (header) header.textContent = 'Repos';
      if (labelEl) labelEl.textContent = label || '';

      initCircle();
      updateDisplay();
      showControls('idle');

      if (overlay) overlay.classList.add('open');
    },

    close: function() {
      running = false;
      if (interval) { clearInterval(interval); interval = null; }
      var overlay = getEl('timer-overlay');
      if (overlay) overlay.classList.remove('open');
    },

    toggle: function() {
      var overlay = getEl('timer-overlay');
      if (overlay && overlay.classList.contains('open')) {
        this.close();
      } else {
        this.open(60, '');
      }
    }
  };
})();
