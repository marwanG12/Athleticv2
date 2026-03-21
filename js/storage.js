// Athletic 18W - LocalStorage Management
window.Storage = (function() {
  var PREFIX = 'ath_';

  function key(k) { return PREFIX + k; }

  function get(k, def) {
    try {
      var v = localStorage.getItem(key(k));
      if (v === null) return def;
      return JSON.parse(v);
    } catch(e) { return def; }
  }

  function set(k, val) {
    try { localStorage.setItem(key(k), JSON.stringify(val)); } catch(e) {}
  }

  return {
    saveWeek: function(week) {
      set('current_week', parseInt(week, 10));
    },

    loadWeek: function() {
      var w = get('current_week', 1);
      var n = parseInt(w, 10);
      if (isNaN(n) || n < 1) return 1;
      if (n > 18) return 18;
      return n;
    },

    toggleChecked: function(week, day, exId) {
      var k = 'checked_' + week + '_' + day;
      var data = get(k, {});
      data[exId] = !data[exId];
      set(k, data);
      return !!data[exId];
    },

    isChecked: function(week, day, exId) {
      var data = get('checked_' + week + '_' + day, {});
      return !!data[exId];
    },

    getCheckedMap: function(week, day) {
      return get('checked_' + week + '_' + day, {});
    },

    saveCharge: function(week, day, exId, value) {
      var k = 'charges_' + week + '_' + day;
      var data = get(k, {});
      data[exId] = value;
      set(k, data);
    },

    loadCharge: function(week, day, exId) {
      var data = get('charges_' + week + '_' + day, {});
      return data[exId] || '';
    },

    getChargesMap: function(week, day) {
      return get('charges_' + week + '_' + day, {});
    },

    saveTest: function(type, week, value) {
      var tests = get('tests', {});
      if (!tests[type]) tests[type] = [];
      // Remove existing entry for this week
      tests[type] = tests[type].filter(function(e) { return e.week !== week; });
      tests[type].push({ week: week, value: parseFloat(value) });
      tests[type].sort(function(a, b) { return a.week - b.week; });
      set('tests', tests);
    },

    loadTests: function(type) {
      var tests = get('tests', {});
      return tests[type] || [];
    },

    loadAllTests: function() {
      return get('tests', {});
    },

    exportJSON: function() {
      var data = {};
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (k && k.indexOf(PREFIX) === 0) {
            var shortKey = k.slice(PREFIX.length);
            data[shortKey] = JSON.parse(localStorage.getItem(k));
          }
        }
        var json = JSON.stringify(data, null, 2);
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'athletic18w_backup_' + new Date().toISOString().slice(0,10) + '.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      } catch(e) { console.error('Export failed', e); }
    },

    importJSON: function(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          var data = JSON.parse(e.target.result);
          Object.keys(data).forEach(function(k) {
            localStorage.setItem(PREFIX + k, JSON.stringify(data[k]));
          });
          window.location.reload();
        } catch(err) { alert('Fichier invalide'); }
      };
      reader.readAsText(file);
    }
  };
})();
