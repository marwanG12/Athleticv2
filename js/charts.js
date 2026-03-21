// Athletic 18W - Chart.js Wrappers
window.Charts = (function() {
  var chartInstances = {};

  var darkTheme = {
    gridColor: 'rgba(255,255,255,0.06)',
    tickColor: '#555555',
    datasetColor: '#e8ff47',
    datasetBorderColor: '#e8ff47',
    pointColor: '#e8ff47',
    background: 'transparent'
  };

  function destroyIfExists(canvasId) {
    if (chartInstances[canvasId]) {
      chartInstances[canvasId].destroy();
      delete chartInstances[canvasId];
    }
  }

  function makeConfig(labels, data, yLabel) {
    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: yLabel || '',
          data: data,
          borderColor: darkTheme.datasetBorderColor,
          backgroundColor: 'rgba(232,255,71,0.08)',
          pointBackgroundColor: darkTheme.pointColor,
          pointBorderColor: darkTheme.pointColor,
          pointRadius: 4,
          pointHoverRadius: 6,
          borderWidth: 2,
          tension: 0.35,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 400 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1a1a',
            borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1,
            titleColor: '#888888',
            bodyColor: '#f0f0f0',
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { color: darkTheme.gridColor, drawBorder: false },
            ticks: { color: darkTheme.tickColor, font: { size: 11 } }
          },
          y: {
            grid: { color: darkTheme.gridColor, drawBorder: false },
            ticks: { color: darkTheme.tickColor, font: { size: 11 } },
            beginAtZero: false
          }
        }
      }
    };
  }

  return {
    renderCharges: function(canvasId, exerciseName) {
      if (!window.Chart) return;
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;
      destroyIfExists(canvasId);

      var data = [];
      var labels = [];

      for (var week = 1; week <= 18; week++) {
        var days = ['lundi', 'mardi', 'jeudi', 'vendredi', 'samedi'];
        for (var di = 0; di < days.length; di++) {
          var day = days[di];
          var sess = PROGRAM.getSession(week, day);
          if (!sess || !sess.blocks) continue;
          for (var bi = 0; bi < sess.blocks.length; bi++) {
            var block = sess.blocks[bi];
            for (var ei = 0; ei < block.exercises.length; ei++) {
              var ex = block.exercises[ei];
              if (ex.name === exerciseName) {
                var charge = window.Storage.loadCharge(week, day, ex.id);
                if (charge) {
                  var num = parseFloat(charge);
                  if (!isNaN(num)) {
                    labels.push('S' + week);
                    data.push(num);
                  }
                }
              }
            }
          }
        }
      }

      if (data.length === 0) {
        var ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#555555';
          ctx.font = '13px -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Aucune donnée', canvas.width / 2, 60);
        }
        return;
      }

      var config = makeConfig(labels, data, exerciseName);
      chartInstances[canvasId] = new Chart(canvas, config);
    },

    renderTests: function(canvasId, testType) {
      if (!window.Chart) return;
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;
      destroyIfExists(canvasId);

      var entries = window.Storage.loadTests(testType);
      if (!entries || entries.length === 0) return;

      var labels = entries.map(function(e) { return 'S' + e.week; });
      var data = entries.map(function(e) { return e.value; });

      var config = makeConfig(labels, data, testType);
      chartInstances[canvasId] = new Chart(canvas, config);
    },

    renderAllTests: function(canvasId) {
      var canvas = document.getElementById(canvasId);
      if (!canvas) return;
      destroyIfExists(canvasId);

      var allTests = window.Storage.loadAllTests();
      var types = Object.keys(allTests);
      if (types.length === 0) return;

      var colors = ['#e8ff47','#4a9eff','#ff8c42','#ff4444','#a855f7','#22d3ee','#34d399'];
      var datasets = [];
      var allWeeks = {};

      types.forEach(function(type) {
        allTests[type].forEach(function(e) { allWeeks[e.week] = true; });
      });
      var weekLabels = Object.keys(allWeeks).sort(function(a,b){ return a-b; }).map(function(w){ return 'S' + w; });

      types.forEach(function(type, idx) {
        var entries = allTests[type];
        var weekMap = {};
        entries.forEach(function(e) { weekMap[e.week] = e.value; });
        var data = Object.keys(allWeeks).sort(function(a,b){return a-b;}).map(function(w){ return weekMap[w] || null; });
        var color = colors[idx % colors.length];
        datasets.push({
          label: type,
          data: data,
          borderColor: color,
          backgroundColor: 'transparent',
          pointBackgroundColor: color,
          pointBorderColor: color,
          pointRadius: 4,
          borderWidth: 2,
          tension: 0.35,
          fill: false,
          spanGaps: true
        });
      });

      chartInstances[canvasId] = new Chart(canvas, {
        type: 'line',
        data: { labels: weekLabels, datasets: datasets },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: { duration: 400 },
          plugins: {
            legend: {
              display: true,
              labels: { color: '#888888', font: { size: 11 }, boxWidth: 12 }
            },
            tooltip: {
              backgroundColor: '#1a1a1a',
              borderColor: 'rgba(255,255,255,0.15)',
              borderWidth: 1,
              titleColor: '#888888',
              bodyColor: '#f0f0f0',
              padding: 10
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255,255,255,0.06)', drawBorder: false },
              ticks: { color: '#555555', font: { size: 11 } }
            },
            y: {
              grid: { color: 'rgba(255,255,255,0.06)', drawBorder: false },
              ticks: { color: '#555555', font: { size: 11 } },
              beginAtZero: false
            }
          }
        }
      });
    }
  };
})();
