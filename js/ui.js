// Athletic 18W - Complete UI Logic
window.UI = (function() {
  var currentWeek = 1;
  var currentDay = 'lundi';
  var currentScreen = 'seance';

  var dayAbbreviations = { lundi: 'L', mardi: 'M', mercredi: 'M', jeudi: 'J', vendredi: 'V', samedi: 'S', dimanche: 'D' };

  function filterBlocksForWeek(blocks, week) {
    var filtered = [];
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      if (block.forWeeks && block.forWeeks.indexOf(week) === -1) continue;
      filtered.push(block);
    }
    return filtered;
  }

  // Compute header height after render for day selector positioning
  function updateDaySelectorTop() {
    var header = document.querySelector('#screen-seance .app-header');
    var daySelector = document.querySelector('.day-selector');
    if (header && daySelector) {
      daySelector.style.top = header.offsetHeight + 'px';
    }
  }

  function updateSeanceContentPadding() {
    var header = document.querySelector('#screen-seance .app-header');
    var daySelector = document.querySelector('.day-selector');
    var content = document.getElementById('seance-content');
    if (header && daySelector && content) {
      content.style.paddingTop = (header.offsetHeight + daySelector.offsetHeight + 8) + 'px';
    }
  }

  function parseRestSeconds(restStr) {
    if (!restStr) return 60;
    restStr = restStr.trim();
    if (restStr.indexOf('min') !== -1) {
      return Math.round(parseFloat(restStr) * 60);
    }
    if (restStr.indexOf('s') !== -1) {
      return parseInt(restStr, 10);
    }
    return parseInt(restStr, 10) || 60;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function renderExercise(ex, week, day) {
    var checked = window.Storage.isChecked(week, day, ex.id);
    var charge = window.Storage.loadCharge(week, day, ex.id);

    var item = el('div', 'ex-item' + (checked ? ' done' : ''));
    item.dataset.exId = ex.id;

    // Checkbox
    var checkbox = el('div', 'ex-checkbox' + (checked ? ' checked' : ''));
    checkbox.addEventListener('click', function() {
      var nowChecked = window.Storage.toggleChecked(week, day, ex.id);
      item.classList.toggle('done', nowChecked);
      checkbox.classList.toggle('checked', nowChecked);
      updateProgress(week, day);
    });
    item.appendChild(checkbox);

    // Main content
    var main = el('div', 'ex-main');

    // Top row: id + name
    var top = el('div', 'ex-top');
    top.appendChild(el('span', 'ex-id', ex.id));
    top.appendChild(el('span', 'ex-name', ex.name));
    main.appendChild(top);

    // Badges
    if (ex.sets || ex.tempo || ex.rest) {
      var badges = el('div', 'ex-badges');
      if (ex.sets) {
        var b1 = el('span', 'badge badge-sets', ex.sets);
        badges.appendChild(b1);
      }
      if (ex.tempo) {
        var b2 = el('span', 'badge badge-tempo', ex.tempo);
        badges.appendChild(b2);
      }
      if (ex.rest) {
        var b3 = el('span', 'badge badge-rest', '⏱ ' + ex.rest);
        b3.title = 'Ouvrir timer';
        b3.addEventListener('click', function(e) {
          e.stopPropagation();
          window.Timer.open(parseRestSeconds(ex.rest), ex.name);
        });
        badges.appendChild(b3);
      }
      main.appendChild(badges);
    }

    // Note
    if (ex.note) {
      main.appendChild(el('p', 'ex-note', ex.note));
    }

    // Charge input
    var chargeRow = el('div', 'ex-charge-row');
    chargeRow.appendChild(el('span', 'ex-charge-label', 'Charge:'));
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'ex-charge-input';
    input.placeholder = 'ex: 80kg × 3';
    input.value = charge || '';
    input.addEventListener('blur', function() {
      window.Storage.saveCharge(week, day, ex.id, input.value.trim());
    });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') input.blur();
    });
    chargeRow.appendChild(input);
    main.appendChild(chargeRow);

    item.appendChild(main);

    // Timer button (if rest)
    if (ex.rest) {
      var timerBtn = el('button', 'ex-timer-btn');
      timerBtn.innerHTML = '⏱';
      timerBtn.title = 'Repos ' + ex.rest;
      timerBtn.addEventListener('click', function() {
        window.Timer.open(parseRestSeconds(ex.rest), ex.name);
      });
      item.appendChild(timerBtn);
    }

    return item;
  }

  function renderBlock(block, week, day) {
    var div = el('div', 'ex-block');
    var header = el('div', 'block-header', block.name);
    div.appendChild(header);

    if (block.isFinisher) {
      div.classList.add('finisher-block');
    }

    for (var i = 0; i < block.exercises.length; i++) {
      div.appendChild(renderExercise(block.exercises[i], week, day));
    }
    return div;
  }

  function countExercises(session, week) {
    var total = 0;
    var blocks = filterBlocksForWeek(session.blocks, week);
    for (var i = 0; i < blocks.length; i++) {
      total += blocks[i].exercises.length;
    }
    return total;
  }

  function countChecked(session, week, day) {
    var checked = 0;
    var blocks = filterBlocksForWeek(session.blocks, week);
    for (var i = 0; i < blocks.length; i++) {
      var exs = blocks[i].exercises;
      for (var j = 0; j < exs.length; j++) {
        if (window.Storage.isChecked(week, day, exs[j].id)) checked++;
      }
    }
    return checked;
  }

  function updateProgress(week, day) {
    var session = PROGRAM.getSession(week, day);
    var countEl = document.getElementById('progress-count');
    var fillEl = document.getElementById('progress-fill');
    if (!countEl || !fillEl) return;

    if (!session) {
      countEl.textContent = '0/0';
      fillEl.style.width = '0%';
      return;
    }
    var total = countExercises(session, week);
    var done = countChecked(session, week, day);
    countEl.textContent = done + '/' + total;
    fillEl.style.width = total > 0 ? Math.round(done / total * 100) + '%' : '0%';
  }

  function renderPhaseBanner(week) {
    var phase = PROGRAM.getPhase(week);
    var banner = document.getElementById('phase-banner');
    if (!banner) return;
    banner.className = 'phase-banner ' + phase.color;

    var phaseWeekIndex = phase.weeks.indexOf(week);
    var dots = '';
    for (var i = 0; i < phase.weeks.length; i++) {
      dots += '<span class="phase-dot' + (i <= phaseWeekIndex ? ' active' : '') + '"></span>';
    }

    banner.innerHTML =
      '<div class="phase-info">' +
        '<span class="phase-name">' + phase.name + '</span>' +
        '<span class="phase-weeks">' + phase.range + '</span>' +
      '</div>' +
      '<div class="phase-dots">' + dots + '</div>';
  }

  function renderDaySelector(week, selectedDay) {
    var btns = document.querySelectorAll('.day-btn');
    btns.forEach(function(btn) {
      var day = btn.getAttribute('data-day');
      var dm = PROGRAM.dayMap[day];
      btn.className = 'day-btn' + (dm.off ? ' off' : '') + (day === selectedDay ? ' active' : '');

      btn.innerHTML = dayAbbreviations[day] +
        '<span class="day-tag day-tag-' + dm.tag + '">' + dm.tag + '</span>';

      btn.onclick = function() {
        currentDay = day;
        renderSeance();
      };
    });
  }

  function renderSprintSession(session, week) {
    var frag = document.createDocumentFragment();
    var deload = PROGRAM.isDeload(week);
    if (deload) {
      var badge = el('div', 'deload-badge', '⚡ SEMAINE DE DÉCHARGE – Volume -40%');
      frag.appendChild(badge);
    }

    var card = el('div', 'sprint-card session-card');
    var hdr = el('div', 'session-header');
    var title = el('span', 'session-title', session.label);
    var dur = el('span', 'session-duration', session.duration);
    hdr.appendChild(title);
    hdr.appendChild(dur);
    card.appendChild(hdr);

    var blocks = filterBlocksForWeek(session.blocks, week);
    for (var bi = 0; bi < blocks.length; bi++) {
      var block = blocks[bi];
      var blockDiv = el('div', 'ex-block');
      blockDiv.appendChild(el('div', 'block-header', block.name));
      for (var ei = 0; ei < block.exercises.length; ei++) {
        var ex = block.exercises[ei];
        var sItem = el('div', 'sprint-item');
        var lbl = el('span', 'sprint-label', ex.id.split('-').pop().toUpperCase());
        var desc = el('div', '');
        desc.appendChild(el('div', 'sprint-desc', ex.name));
        if (ex.sets || ex.rest) {
          desc.appendChild(el('div', 'sprint-detail', [ex.sets, ex.rest ? 'Repos: ' + ex.rest : ''].filter(Boolean).join(' · ')));
        }
        if (ex.note) desc.appendChild(el('div', 'sprint-detail', ex.note));
        sItem.appendChild(lbl);
        sItem.appendChild(desc);
        blockDiv.appendChild(sItem);
      }
      card.appendChild(blockDiv);
    }
    frag.appendChild(card);
    return frag;
  }

  function renderRegularSession(session, week, day) {
    var frag = document.createDocumentFragment();
    var deload = PROGRAM.isDeload(week);
    if (deload) {
      frag.appendChild(el('div', 'deload-badge', '⚡ SEMAINE DE DÉCHARGE – Volume -40%'));
    }

    var card = el('div', 'session-card');
    var hdr = el('div', 'session-header');
    hdr.appendChild(el('span', 'session-title', session.label));
    hdr.appendChild(el('span', 'session-duration', session.duration));
    card.appendChild(hdr);

    var blocks = filterBlocksForWeek(session.blocks, week);
    for (var bi = 0; bi < blocks.length; bi++) {
      var block = blocks[bi];
      if (block.isFinisher) {
        var finCard = el('div', 'finisher-card');
        var finHdr = el('div', 'finisher-header', block.name);
        finCard.appendChild(finHdr);
        for (var ei = 0; ei < block.exercises.length; ei++) {
          var ex = block.exercises[ei];
          var finItem = el('div', 'finisher-item');
          finItem.appendChild(el('span', 'finisher-bullet'));
          var desc = ex.name;
          if (ex.sets) desc += ' – ' + ex.sets;
          finItem.appendChild(el('span', '', desc));
          finCard.appendChild(finItem);
        }
        card.appendChild(finCard);
      } else {
        card.appendChild(renderBlock(block, week, day));
      }
    }
    frag.appendChild(card);
    return frag;
  }

  function renderSeance() {
    var week = currentWeek;
    var day = currentDay;

    // Update week title
    var titleEl = document.getElementById('week-title');
    if (titleEl) titleEl.textContent = 'Semaine ' + week;

    renderPhaseBanner(week);
    renderDaySelector(week, day);
    updateProgress(week, day);

    var content = document.getElementById('seance-content');
    if (!content) return;
    content.innerHTML = '';

    var dm = PROGRAM.dayMap[day];
    if (dm.off) {
      var rest = el('div', 'rest-day');
      rest.innerHTML =
        '<div class="rest-day-icon">🌙</div>' +
        '<h2>Repos</h2>' +
        '<p>Récupération active: marche, mobilité,<br>sommeil de qualité.</p>';
      content.appendChild(rest);
      updateDaySelectorTop();
      updateSeanceContentPadding();
      return;
    }

    var session = PROGRAM.getSession(week, day);
    if (!session) {
      content.appendChild(el('div', 'empty-state', 'Pas de séance ce jour.'));
      return;
    }

    var frag;
    if (session.isSprint) {
      frag = renderSprintSession(session, week);
    } else {
      frag = renderRegularSession(session, week, day);
    }
    content.appendChild(frag);
    content.classList.remove('fade-in');
    void content.offsetWidth;
    content.classList.add('fade-in');

    updateDaySelectorTop();
    updateSeanceContentPadding();
  }

  return {
    init: function() {
      currentWeek = window.Storage.loadWeek();
      currentDay = 'lundi';

      // Wire week navigation
      var prevBtn = document.getElementById('prev-week');
      var nextBtn = document.getElementById('next-week');
      if (prevBtn) prevBtn.addEventListener('click', function() {
        if (currentWeek > 1) {
          currentWeek--;
          window.Storage.saveWeek(currentWeek);
          renderSeance();
        }
      });
      if (nextBtn) nextBtn.addEventListener('click', function() {
        if (currentWeek < 18) {
          currentWeek++;
          window.Storage.saveWeek(currentWeek);
          renderSeance();
        }
      });

      // Wire bottom nav
      var navBtns = document.querySelectorAll('.nav-btn');
      navBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var screen = btn.getAttribute('data-screen');
          UI.switchScreen(screen);
        });
      });

      // Wire test screen exercise select
      var exSelect = document.getElementById('exercise-select');
      if (exSelect) {
        var exs = PROGRAM.getAllExercises();
        exs.forEach(function(ex) {
          var opt = document.createElement('option');
          opt.value = ex.name;
          opt.textContent = ex.name;
          exSelect.appendChild(opt);
        });
        exSelect.addEventListener('change', function() {
          if (exSelect.value) {
            UI.renderHistoriqueForExercise(exSelect.value);
          }
        });
      }

      renderSeance();
      UI.renderTests();
      UI.renderNutrition();

      setTimeout(function() {
        updateDaySelectorTop();
        updateSeanceContentPadding();
      }, 50);
    },

    switchScreen: function(name) {
      currentScreen = name;
      var screens = document.querySelectorAll('.screen');
      screens.forEach(function(s) { s.classList.remove('active'); });
      var target = document.getElementById('screen-' + name);
      if (target) target.classList.add('active');

      var navBtns = document.querySelectorAll('.nav-btn');
      navBtns.forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-screen') === name);
      });

      if (name === 'historique') UI.renderHistorique();
      if (name === 'tests') UI.renderTests();
    },

    renderSeance: renderSeance,

    renderHistorique: function() {
      var exSelect = document.getElementById('exercise-select');
      if (exSelect && exSelect.value) {
        UI.renderHistoriqueForExercise(exSelect.value);
      }
    },

    renderHistoriqueForExercise: function(exerciseName) {
      var tableContainer = document.getElementById('history-table');
      if (!tableContainer) return;

      var rows = [];
      var histDays = ['lundi', 'mardi', 'jeudi', 'vendredi', 'samedi'];
      for (var week = 1; week <= 18; week++) {
        for (var di = 0; di < histDays.length; di++) {
          var day = histDays[di];
          var sess = PROGRAM.getSession(week, day);
          if (!sess || !sess.blocks) continue;
          var blocks = filterBlocksForWeek(sess.blocks, week);
          for (var bi = 0; bi < blocks.length; bi++) {
            var block = blocks[bi];
            for (var ei = 0; ei < block.exercises.length; ei++) {
              var ex = block.exercises[ei];
              if (ex.name === exerciseName) {
                var charge = window.Storage.loadCharge(week, day, ex.id);
                var checked = window.Storage.isChecked(week, day, ex.id);
                if (charge || checked) {
                  rows.push({ week: week, day: day, charge: charge, checked: checked });
                }
              }
            }
          }
        }
      }

      if (rows.length === 0) {
        tableContainer.innerHTML = '<div class="history-empty">Aucune donnée pour cet exercice.</div>';
        var cc = document.getElementById('history-chart-container');
        if (cc) cc.innerHTML = '<div class="chart-empty">Enregistrez des charges pour voir le graphique.</div>';
        return;
      }

      var html = '<table><thead><tr><th>Semaine</th><th>Jour</th><th>Charge</th><th>Fait</th></tr></thead><tbody>';
      rows.forEach(function(r) {
        html += '<tr>' +
          '<td>S' + r.week + '</td>' +
          '<td>' + r.day.charAt(0).toUpperCase() + r.day.slice(1) + '</td>' +
          '<td>' + (r.charge || '–') + '</td>' +
          '<td class="history-check">' + (r.checked ? '✓' : '') + '</td>' +
        '</tr>';
      });
      html += '</tbody></table>';
      tableContainer.innerHTML = html;

      var cc2 = document.getElementById('history-chart-container');
      if (cc2) {
        cc2.innerHTML = '<canvas id="history-chart"></canvas>';
        window.Charts.renderCharges('history-chart', exerciseName);
      }
    },

    renderTests: function() {
      var types = ['sprint10', 'sprint30', 'cmj', 'squat5rm', 'bench5rm', 'tractions'];
      types.forEach(function(type) {
        var entries = window.Storage.loadTests(type);
        var btn = document.querySelector('[onclick*="' + type + '"]');
        if (!btn) return;
        var container = btn.closest('.test-form-card');
        if (!container) return;
        var histDiv = container.querySelector('.test-history');
        if (histDiv) histDiv.remove();
        if (entries.length > 0) {
          var div = document.createElement('div');
          div.className = 'test-history';
          entries.forEach(function(e, idx) {
            var span = document.createElement('span');
            span.className = 'test-entry' + (idx === entries.length - 1 ? ' latest' : '');
            span.textContent = 'S' + e.week + ': ' + e.value;
            div.appendChild(span);
          });
          container.appendChild(div);
        }
      });

      var testsChart = document.getElementById('tests-chart');
      if (testsChart) {
        var allTests = window.Storage.loadAllTests();
        if (Object.keys(allTests).length > 0) {
          window.Charts.renderAllTests('tests-chart');
        }
      }
    },

    renderNutrition: function() {
      // Nutrition is static HTML, nothing dynamic needed
    },

    saveTestValue: function(type) {
      var input = document.getElementById('test-' + type);
      if (!input || !input.value) return;
      var value = parseFloat(input.value);
      if (isNaN(value)) return;
      var week = window.Storage.loadWeek();
      window.Storage.saveTest(type, week, value);
      input.value = '';
      UI.renderTests();
    }
  };
})();

window.addEventListener('DOMContentLoaded', function() {
  window.UI.init();
});
