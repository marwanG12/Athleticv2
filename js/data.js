// Athletic 18W - Complete Program Data
// No ES modules - global var

var PROGRAM = (function() {

  var phases = [
    { id: 1, name: 'Phase 1 – Construction Musculaire', weeks: [1,2,3,4,5,6], color: 'phase-1', range: 'S1-6' },
    { id: 2, name: 'Phase 2 – Force Maximale & Puissance', weeks: [7,8,9,10,11,12], color: 'phase-2', range: 'S7-12' },
    { id: 3, name: 'Phase 3 – Expression Athlétique', weeks: [13,14,15,16,17,18], color: 'phase-3', range: 'S13-18' }
  ];

  var weeks = {};
  for (var w = 1; w <= 18; w++) {
    var phase = w <= 6 ? 1 : w <= 12 ? 2 : 3;
    weeks[w] = { phase: phase, deload: (w === 4 || w === 8 || w === 12 || w === 16) };
  }

  // Phase 1 sessions
  var sessions_p1 = {
    A: {
      label: 'Séance A – Lundi',
      duration: '75min',
      blocks: [
        {
          name: 'Échauffement (12min)',
          exercises: [
            { id: 'p1a-w1', name: 'Vélo/Rameur', sets: '5min', tempo: '', rest: '', note: 'Intensité progressive' },
            { id: 'p1a-w2', name: 'Foam rolling', sets: '3min', tempo: '', rest: '', note: 'Quadriceps, ischio, mollets' },
            { id: 'p1a-w3', name: "World's Greatest Stretch", sets: '3/côté', tempo: '', rest: '', note: '' },
            { id: 'p1a-w4', name: 'Squat goblet pause', sets: '10 reps', tempo: '', rest: '', note: 'Pause 2s en bas' },
            { id: 'p1a-w5', name: 'Glute bridge', sets: '12 reps', tempo: '', rest: '', note: '' },
            { id: 'p1a-w6', name: 'Banded lateral walk', sets: '2×10/côté', tempo: '', rest: '', note: '' },
            { id: 'p1a-w7', name: 'Activation cheville', sets: '10/côté', tempo: '', rest: '', note: '' }
          ]
        },
        {
          name: 'Bloc Amorce Neuro',
          exercises: [
            { id: 'p1a-n1', name: 'Box jump (step down)', sets: '3×3', tempo: '', rest: '60s', note: 'Atterrissage silencieux' },
            { id: 'p1a-n2', name: 'Back Squat lourd', sets: '2×3', tempo: '', rest: '2min', note: 'RPE 8-9' }
          ]
        },
        {
          name: 'Bloc Hypertrophie',
          exercises: [
            { id: 'p1a-a1', name: 'Goblet Squat → Back Squat', sets: '3×10', tempo: '3-1-2-0', rest: '90s', note: '' },
            { id: 'p1a-a2', name: 'Proprioception unipodal', sets: '3×30s', tempo: '', rest: '30s', note: 'Sur surface instable si dispo' },
            { id: 'p1a-b1', name: 'Presse cuisses', sets: '4×12', tempo: '3-0-1-0', rest: '90s', note: '' },
            { id: 'p1a-b2', name: 'Leg Curl', sets: '4×12', tempo: '3-0-1-1', rest: '60s', note: '' },
            { id: 'p1a-c1', name: 'Hip Thrust', sets: '4×12', tempo: '2-1-2-0', rest: '75s', note: '' },
            { id: 'p1a-c2', name: 'Fente marchée', sets: '3×10/jambe', tempo: '2-0-1-0', rest: '75s', note: '' },
            { id: 'p1a-d1', name: 'Calf raise debout', sets: '4×15', tempo: '2-1-2-0', rest: '60s', note: '' },
            { id: 'p1a-d2', name: 'Calf raise assis', sets: '3×15', tempo: '2-1-2-0', rest: '60s', note: '' }
          ]
        }
      ]
    },
    B: {
      label: 'Séance B – Mardi',
      duration: '65min',
      blocks: [
        {
          name: 'Bloc Amorce Neuro',
          exercises: [
            { id: 'p1b-n1', name: 'Lancé med ball poitrine', sets: '3×5', tempo: '', rest: '45s', note: 'Explosif – contre mur ou en binôme' }
          ]
        },
        {
          name: 'Bloc Hypertrophie',
          exercises: [
            { id: 'p1b-a1', name: 'Développé couché haltères', sets: '4×10', tempo: '3-0-1-0', rest: '90s', note: '' },
            { id: 'p1b-a2', name: 'Tractions', sets: '4×8-10', tempo: '2-0-1-1', rest: '90s', note: 'Lestées si besoin' },
            { id: 'p1b-b1', name: 'Développé militaire', sets: '3×12', tempo: '2-0-1-0', rest: '75s', note: '' },
            { id: 'p1b-b2', name: 'Rowing barre', sets: '4×10', tempo: '2-1-1-0', rest: '75s', note: '' },
            { id: 'p1b-c1', name: 'Dips', sets: '3×10-12', tempo: '2-0-1-0', rest: '60s', note: '' },
            { id: 'p1b-c2', name: 'Face pull', sets: '3×15', tempo: '2-0-2-0', rest: '45s', note: '' },
            { id: 'p1b-d1', name: 'Curl haltères incliné', sets: '3×12', tempo: '2-0-1-0', rest: '45s', note: '' },
            { id: 'p1b-d2', name: 'Triceps poulie corde', sets: '3×12', tempo: '2-0-1-0', rest: '45s', note: '' }
          ]
        }
      ]
    },
    C: {
      label: 'Séance C – Jeudi',
      duration: '70min',
      blocks: [
        {
          name: 'Bloc Amorce Neuro',
          exercises: [
            { id: 'p1c-n1', name: 'Broad jump', sets: '3×3', tempo: '', rest: '60s', note: 'Max horizontal' },
            { id: 'p1c-n2', name: 'RDL lourd', sets: '2×3', tempo: '', rest: '2min', note: 'RPE 8-9' }
          ]
        },
        {
          name: 'Bloc Hypertrophie',
          exercises: [
            { id: 'p1c-a',  name: 'RDL volume', sets: '3×10', tempo: '3-1-1-0', rest: '90s', note: '' },
            { id: 'p1c-b1', name: 'Fente bulgare', sets: '3×10/jambe', tempo: '2-0-1-0', rest: '75s', note: '' },
            { id: 'p1c-b2', name: 'Proprioception unipodal', sets: '3×30s', tempo: '', rest: '30s', note: '' },
            { id: 'p1c-c1', name: 'Hip Thrust lourd', sets: '4×10', tempo: '2-1-2-0', rest: '90s', note: '' },
            { id: 'p1c-c2', name: 'Leg Curl', sets: '3×12', tempo: '3-0-1-1', rest: '60s', note: '' },
            { id: 'p1c-d1', name: 'Adducteurs machine', sets: '3×15', tempo: '2-0-1-1', rest: '60s', note: '' },
            { id: 'p1c-d2', name: 'Calf raise unilatéral', sets: '3×12/pied', tempo: '2-1-2-0', rest: '45s', note: '' }
          ]
        },
        {
          name: 'Bloc Core',
          exercises: [
            { id: 'p1c-e1', name: 'Pallof press', sets: '3×10/côté', tempo: '', rest: '30s', note: '' },
            { id: 'p1c-e2', name: 'Dead bug', sets: '3×8/côté', tempo: '', rest: '30s', note: '' },
            { id: 'p1c-e3', name: "Farmer's carry", sets: '3×30m', tempo: '', rest: '45s', note: 'Lourd, dos droit' },
            { id: 'p1c-e4', name: 'Planche latérale', sets: '2×30s/côté', tempo: '', rest: '30s', note: '' }
          ]
        }
      ]
    },
    D: {
      label: 'Séance D – Vendredi',
      duration: '65min',
      blocks: [
        {
          name: 'Bloc Hypertrophie',
          exercises: [
            { id: 'p1d-a1', name: 'Développé incliné', sets: '4×10', tempo: '3-0-1-0', rest: '90s', note: '' },
            { id: 'p1d-a2', name: 'Rowing un bras', sets: '4×10/bras', tempo: '2-1-1-0', rest: '60s', note: '' },
            { id: 'p1d-b1', name: 'Élévation latérale', sets: '4×15', tempo: '2-0-1-0', rest: '45s', note: '' },
            { id: 'p1d-b2', name: 'Rowing poulie basse', sets: '3×12', tempo: '2-1-1-0', rest: '60s', note: '' },
            { id: 'p1d-c1', name: 'Arnold press', sets: '3×12', tempo: '2-0-1-0', rest: '60s', note: '' },
            { id: 'p1d-c2', name: 'Shrug haltères', sets: '3×12', tempo: '2-1-1-0', rest: '45s', note: '' },
            { id: 'p1d-d1', name: 'Curl barre EZ', sets: '3×10', tempo: '2-0-1-0', rest: '45s', note: '' },
            { id: 'p1d-d2', name: 'Extension triceps overhead', sets: '3×12', tempo: '2-0-1-0', rest: '45s', note: '' }
          ]
        },
        {
          name: 'Finisher – Circuit 3 tours (40s travail / 20s repos)',
          isFinisher: true,
          exercises: [
            { id: 'p1d-f1', name: 'Kettlebell swing', sets: '40s', tempo: '', rest: '20s', note: '' },
            { id: 'p1d-f2', name: 'Push-up rapide', sets: '40s', tempo: '', rest: '20s', note: '' },
            { id: 'p1d-f3', name: 'Rowing inversé', sets: '40s', tempo: '', rest: '20s', note: '' },
            { id: 'p1d-f4', name: 'Mountain climbers', sets: '40s', tempo: '', rest: '20s', note: '' },
            { id: 'p1d-f5', name: 'Goblet squat léger', sets: '40s', tempo: '', rest: '20s', note: '' },
            { id: 'p1d-f6', name: 'Planche shoulder tap', sets: '40s', tempo: '', rest: '20s', note: '' }
          ]
        }
      ]
    },
    E: {
      label: 'Séance E – Samedi (Optionnel)',
      duration: '60-75min',
      isSprint: true,
      blocks: [
        {
          name: 'Activité optionnelle',
          exercises: [
            { id: 'p1e-1', name: 'Five-a-side / Football loisir', sets: '60-75min', tempo: '', rest: '', note: 'Intensité libre, récupération active' },
            { id: 'p1e-2', name: 'Technique sprint 60-75%', sets: '6-8×30m', tempo: '', rest: '90s', note: 'Focus technique, pas intensité max' }
          ]
        }
      ]
    }
  };

  // Phase 2 sessions
  var sessions_p2 = {
    A: {
      label: 'Séance A – Lundi',
      duration: '70min',
      blocks: [
        {
          name: 'Puissance / Pliométrie',
          exercises: [
            { id: 'p2a-a1', name: 'Box jump', sets: '4×3', tempo: '', rest: '90s', note: 'Max hauteur, focus hauteur' },
            { id: 'p2a-a2', name: 'Broad jump', sets: '3×3', tempo: '', rest: '90s', note: 'Max distance' }
          ]
        },
        {
          name: 'Force / Contraste',
          exercises: [
            { id: 'p2a-b1', name: 'Back Squat', sets: '4×5', tempo: '3-1-X-0', rest: '2.5min', note: 'Montée explosive' },
            { id: 'p2a-b2', name: 'Mini-sauts unipodaux', sets: '3×6/pied', tempo: '', rest: '30s', note: 'Rebonds rapides' },
            { id: 'p2a-c1', name: 'Fente marchée', sets: '3×8/jambe', tempo: '2-0-1-0', rest: '90s', note: '' },
            { id: 'p2a-c2', name: 'Nordic hamstring curl', sets: '3×4-6', tempo: '', rest: '90s', note: 'Excentrique contrôlé' },
            { id: 'p2a-d',  name: 'Calf raise unilatéral', sets: '3×12/pied', tempo: '2-1-2-0', rest: '60s', note: '' }
          ]
        }
      ]
    },
    B: {
      label: 'Séance B – Mardi',
      duration: '55min',
      isSprint: true,
      blocks: [
        {
          name: 'Vitesse & Agilité',
          exercises: [
            { id: 'p2b-a', name: 'Départ 3 appuis 10m', sets: '5×10m', tempo: '', rest: '2min', note: 'Départ réactif' },
            { id: 'p2b-b', name: 'Sprint 20m lancé', sets: '4×20m', tempo: '', rest: '2min', note: 'Vitesse max en zone lancée' },
            { id: 'p2b-c', name: 'Sprint résisté', sets: '3×15m', tempo: '', rest: '2min', note: 'Traîneau ou élastique +10%' },
            { id: 'p2b-d', name: '5-10-5 Pro Agility', sets: '4 reps', tempo: '', rest: '90s', note: '' },
            { id: 'p2b-e', name: 'L-Drill', sets: '3 reps', tempo: '', rest: '90s', note: '' },
            { id: 'p2b-f', name: 'Jeu de miroir', sets: '3×20s', tempo: '', rest: '60s', note: 'Face à face, réaction' }
          ]
        }
      ]
    },
    C: {
      label: 'Séance C – Jeudi',
      duration: '60min',
      blocks: [
        {
          name: 'Puissance Haut du Corps',
          exercises: [
            { id: 'p2c-a1', name: 'Lancé med ball poitrine', sets: '3×5', tempo: '', rest: '60s', note: 'Max explosif' },
            { id: 'p2c-a2', name: 'Lancé med ball slam', sets: '3×5', tempo: '', rest: '60s', note: '' }
          ]
        },
        {
          name: 'Force / Contraste',
          exercises: [
            { id: 'p2c-b1', name: 'Développé couché barre', sets: '4×5', tempo: '2-1-X-0', rest: '2min', note: 'Montée explosive' },
            { id: 'p2c-b2', name: 'Tractions lestées', sets: '4×5-6', tempo: '2-1-1-0', rest: '2min', note: '' },
            { id: 'p2c-c1', name: 'Push press', sets: '3×6', tempo: '', rest: '90s', note: '' },
            { id: 'p2c-c2', name: 'Rowing barre', sets: '3×8', tempo: '2-1-1-0', rest: '90s', note: '' },
            { id: 'p2c-d',  name: 'Curl + Triceps poulie', sets: '2×12', tempo: '', rest: '45s', note: 'Circuit: curl puis extension' }
          ]
        }
      ]
    },
    D: {
      label: 'Séance D – Vendredi',
      duration: '50min',
      isSprint: true,
      sprintProgression: true,
      blocks: [
        {
          name: 'RSA – Sem 7-9',
          forWeeks: [7,8,9],
          exercises: [
            { id: 'p2d-rsa-a', name: 'RSA 2×(6×20m) @90-95%', sets: '2 séries', tempo: '', rest: '20s/3min', note: 'Repos 20s entre répétitions, 3min entre séries' }
          ]
        },
        {
          name: 'RSA – Sem 10-12',
          forWeeks: [10,11,12],
          exercises: [
            { id: 'p2d-rsa-b', name: 'RSA 3×(6×25m) @90-95%', sets: '3 séries', tempo: '', rest: '20s/3min', note: 'Repos 20s entre répétitions, 3min entre séries' }
          ]
        },
        {
          name: 'Circuit – 4 tours (30s travail / 15s repos)',
          isFinisher: true,
          exercises: [
            { id: 'p2d-c1', name: 'Kettlebell clean & press', sets: '30s', tempo: '', rest: '15s', note: '' },
            { id: 'p2d-c2', name: 'Burpee sprawl', sets: '30s', tempo: '', rest: '15s', note: '' },
            { id: 'p2d-c3', name: 'Rowing inversé pieds surélevés', sets: '30s', tempo: '', rest: '15s', note: '' },
            { id: 'p2d-c4', name: 'Box step-up rapide', sets: '30s', tempo: '', rest: '15s', note: '' },
            { id: 'p2d-c5', name: 'Med ball slam', sets: '30s', tempo: '', rest: '15s', note: '' },
            { id: 'p2d-c6', name: 'Planche dynamique shoulder tap', sets: '30s', tempo: '', rest: '15s', note: '' }
          ]
        }
      ]
    },
    E: {
      label: 'Séance E – Samedi (Optionnel)',
      duration: '60min',
      isSprint: true,
      blocks: [
        {
          name: 'Activité optionnelle',
          exercises: [
            { id: 'p2e-1', name: 'Five-a-side / Football loisir', sets: '60min', tempo: '', rest: '', note: 'Maintien motricité – intensité modérée' }
          ]
        }
      ]
    }
  };

  // Phase 3 sessions
  var sessions_p3 = {
    A: {
      label: 'Séance A – Lundi',
      duration: '70min',
      blocks: [
        {
          name: 'Contraste Force / Puissance',
          exercises: [
            { id: 'p3a-a1', name: 'Back Squat', sets: '4×4', tempo: '', rest: '2min', note: '@RPE 8-9' },
            { id: 'p3a-a2', name: 'Squat jump / Box jump', sets: '4×4', tempo: '', rest: '90s', note: 'Max hauteur – immédiat après squat' },
            { id: 'p3a-b1', name: 'Trap Bar Deadlift / RDL', sets: '4×4', tempo: '', rest: '2min', note: 'Explosif en montée' },
            { id: 'p3a-b2', name: 'Broad jump maximal', sets: '4×3', tempo: '', rest: '60s', note: 'Max distance' },
            { id: 'p3a-c1', name: 'Fente bulgare', sets: '3×6/jambe', tempo: '', rest: '90s', note: '' },
            { id: 'p3a-c2', name: 'Pogo hops', sets: '3×10', tempo: '', rest: '60s', note: 'Réactifs, minimum temps au sol' },
            { id: 'p3a-d',  name: 'Nordic hamstring curl', sets: '3×5', tempo: '', rest: '90s', note: 'Prévention – excentrique' }
          ]
        }
      ]
    },
    B: {
      label: 'Séance B – Mardi',
      duration: '55min',
      isSprint: true,
      blocks: [
        {
          name: 'Sprint Max & Agilité',
          exercises: [
            { id: 'p3b-a', name: 'Flying sprint 20m', sets: '4×20m', tempo: '', rest: '3min', note: 'Zone lancée 10-30m' },
            { id: 'p3b-b', name: 'Départ réactif', sets: '5×10m', tempo: '', rest: '2min', note: 'Sur signal sonore/visuel' },
            { id: 'p3b-c', name: 'Sprint 30m', sets: '3×30m', tempo: '', rest: '3min', note: 'Max vélocité' },
            { id: 'p3b-d', name: 'Réaction couleur + sprint', sets: '5×60s', tempo: '', rest: '60s', note: 'Couleur → direction' },
            { id: 'p3b-e', name: '1v1 shadow', sets: '4×15s', tempo: '', rest: '60s', note: '' },
            { id: 'p3b-f', name: 'Slalom sprint', sets: '4 reps', tempo: '', rest: '90s', note: '' },
            { id: 'p3b-g', name: '505 Agility Test', sets: '3 reps', tempo: '', rest: '90s', note: 'Test & mesure' }
          ]
        }
      ]
    },
    C: {
      label: 'Séance C – Jeudi',
      duration: '60min',
      blocks: [
        {
          name: 'Contraste Haut du Corps',
          exercises: [
            { id: 'p3c-a1', name: 'Développé couché barre', sets: '4×4', tempo: '', rest: '2min', note: '@RPE 8-9' },
            { id: 'p3c-a2', name: 'Plyo push-up', sets: '4×5', tempo: '', rest: '60s', note: 'Max explosif' },
            { id: 'p3c-b1', name: 'Tractions lestées', sets: '4×4-5', tempo: '', rest: '2min', note: '' },
            { id: 'p3c-b2', name: 'Med ball slam', sets: '4×5', tempo: '', rest: '60s', note: '' },
            { id: 'p3c-c1', name: 'Push press barre', sets: '3×5', tempo: '', rest: '90s', note: '' },
            { id: 'p3c-c2', name: 'Rowing Pendlay', sets: '3×5', tempo: '', rest: '90s', note: '' }
          ]
        }
      ]
    },
    D: {
      label: 'Séance D – Vendredi',
      duration: '50min',
      isSprint: true,
      blocks: [
        {
          name: 'Endurance Intermittente – Sem 13-15',
          forWeeks: [13,14,15],
          exercises: [
            { id: 'p3d-a1', name: 'Sprint/marche 10"-20"', sets: '3×4min', tempo: '', rest: '3min', note: '10s sprint / 20s marche – haute intensité' },
            { id: 'p3d-a2', name: 'Navettes', sets: '2×3min', tempo: '', rest: '2min', note: '' }
          ]
        },
        {
          name: 'Endurance Intermittente – Sem 16-18',
          forWeeks: [16,17,18],
          exercises: [
            { id: 'p3d-b1', name: 'Sprint/repos 10"-10"', sets: '2×4min', tempo: '', rest: '3min', note: '10s sprint max / 10s repos' },
            { id: 'p3d-b2', name: 'Small-sided game', sets: '4min', tempo: '', rest: '2min', note: '3v3 ou 4v4' }
          ]
        },
        {
          name: 'Tabata Finisher – Sem 17-18',
          forWeeks: [17,18],
          isFinisher: true,
          exercises: [
            { id: 'p3d-c1', name: 'Tabata sprint finisher', sets: '1×(8×20s/10s)', tempo: '', rest: '', note: '8 rounds 20s sprint / 10s repos' }
          ]
        }
      ]
    },
    E: {
      label: 'Séance E – Samedi (Optionnel)',
      duration: '60min',
      isSprint: true,
      blocks: [
        {
          name: 'Activité optionnelle',
          exercises: [
            { id: 'p3e-1', name: 'Five-a-side / Football', sets: '60min', tempo: '', rest: '', note: 'Intensité libre – expression athlétique' }
          ]
        }
      ]
    }
  };

  var sessions = {
    1: sessions_p1,
    2: sessions_p2,
    3: sessions_p3
  };

  var dayMap = {
    lundi:    { key: 'A', label: 'Lundi',    tag: 'A',   off: false },
    mardi:    { key: 'B', label: 'Mardi',    tag: 'B',   off: false },
    mercredi: { key: null, label: 'Mercredi', tag: 'OFF', off: true  },
    jeudi:    { key: 'C', label: 'Jeudi',    tag: 'C',   off: false },
    vendredi: { key: 'D', label: 'Vendredi', tag: 'D',   off: false },
    samedi:   { key: 'E', label: 'Samedi',   tag: 'E',   off: false },
    dimanche: { key: null, label: 'Dimanche', tag: 'OFF', off: true  }
  };

  function getPhase(week) {
    var w = parseInt(week, 10);
    for (var i = 0; i < phases.length; i++) {
      if (phases[i].weeks.indexOf(w) !== -1) return phases[i];
    }
    return phases[0];
  }

  function getSession(week, day) {
    var w = parseInt(week, 10);
    var phase = getPhase(w).id;
    var dm = dayMap[day];
    if (!dm || dm.off || !dm.key) return null;
    return sessions[phase][dm.key] || null;
  }

  function isDeload(week) {
    return weeks[parseInt(week, 10)].deload === true;
  }

  function getAllExercises() {
    var result = [];
    var seen = {};
    var phaseIds = [1, 2, 3];
    var dayKeys = ['A', 'B', 'C', 'D', 'E'];
    for (var pi = 0; pi < phaseIds.length; pi++) {
      var ph = phaseIds[pi];
      for (var di = 0; di < dayKeys.length; di++) {
        var sess = sessions[ph][dayKeys[di]];
        if (!sess) continue;
        for (var bi = 0; bi < sess.blocks.length; bi++) {
          var block = sess.blocks[bi];
          for (var ei = 0; ei < block.exercises.length; ei++) {
            var ex = block.exercises[ei];
            var name = ex.name;
            if (!seen[name]) {
              seen[name] = true;
              result.push({ id: ex.id, name: name });
            }
          }
        }
      }
    }
    return result;
  }

  return {
    phases: phases,
    weeks: weeks,
    sessions: sessions,
    dayMap: dayMap,
    getPhase: getPhase,
    getSession: getSession,
    isDeload: isDeload,
    getAllExercises: getAllExercises
  };
})();
