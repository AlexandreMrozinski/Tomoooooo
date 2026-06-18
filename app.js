// =============================
//  TML W2 2026 — Vote App
// =============================

// --- State ---
let state = {
  users: JSON.parse(localStorage.getItem('tml_users') || '[]'),
  votes: JSON.parse(localStorage.getItem('tml_votes') || '{}'), // { "userId": [artistId, ...] }
  currentUser: null,
  filterDay: 'all',
  filterStage: 'all',
  searchQuery: '',
  resultsDay: 'all',
};

function saveState() {
  localStorage.setItem('tml_users', JSON.stringify(state.users));
  localStorage.setItem('tml_votes', JSON.stringify(state.votes));
}

// --- Screens ---
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === id);
  });
  if (id === 'results') renderResults();
}

// --- Login Screen ---
function renderUserList() {
  const el = document.getElementById('user-list');
  el.innerHTML = state.users.map(u => `
    <button class="user-btn" onclick="selectUser('${u}')">
      <span class="user-avatar">${u[0].toUpperCase()}</span>
      <span class="user-name">${u}</span>
      <span class="user-votes">${(state.votes[u] || []).length} ♡</span>
    </button>
  `).join('');
}

function selectUser(name) {
  state.currentUser = name;
  document.getElementById('topbar-user').textContent = name;
  showScreen('vote');
  renderStageFilter();
  renderLineup();
  renderParticipantChips();
}

document.getElementById('add-user-btn').onclick = () => {
  const input = document.getElementById('new-user-input');
  const name = input.value.trim();
  if (!name || state.users.includes(name)) { input.value = ''; return; }
  state.users.push(name);
  if (!state.votes[name]) state.votes[name] = [];
  saveState();
  input.value = '';
  renderUserList();
};

document.getElementById('new-user-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('add-user-btn').click();
});

document.getElementById('logout-btn').onclick = () => {
  state.currentUser = null;
  showScreen('login');
  renderUserList();
};

// --- Stage Filter ---
function renderStageFilter() {
  const el = document.getElementById('stage-filter');
  el.innerHTML = `<button class="pill active" data-stage="all">Toutes</button>` +
    STAGES.map(s => `<button class="pill" data-stage="${s}" style="--stage-color:${STAGE_COLORS[s] || '#888'}">${s}</button>`).join('');
  el.querySelectorAll('.pill').forEach(btn => {
    btn.onclick = () => {
      el.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filterStage = btn.dataset.stage;
      renderLineup();
    };
  });
}

// --- Day Filter ---
document.getElementById('day-filter').querySelectorAll('.pill').forEach(btn => {
  btn.onclick = () => {
    document.getElementById('day-filter').querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filterDay = btn.dataset.day === 'all' ? 'all' : parseInt(btn.dataset.day);
    renderLineup();
  };
});

// --- Search ---
document.getElementById('search-input').addEventListener('input', e => {
  state.searchQuery = e.target.value.toLowerCase();
  renderLineup();
});

// --- Lineup Render ---
function getFilteredLineup() {
  return LINEUP_CLEAN.filter(a => {
    if (state.filterDay !== 'all' && a.day !== state.filterDay) return false;
    if (state.filterStage !== 'all' && a.stage !== state.filterStage) return false;
    if (state.searchQuery && !a.name.toLowerCase().includes(state.searchQuery)) return false;
    return true;
  });
}

function renderLineup() {
  const grid = document.getElementById('lineup-grid');
  const filtered = getFilteredLineup();
  const userVotes = state.votes[state.currentUser] || [];

  // Group by day then stage
  const byDay = {};
  filtered.forEach(a => {
    if (!byDay[a.day]) byDay[a.day] = {};
    if (!byDay[a.day][a.stage]) byDay[a.day][a.stage] = [];
    byDay[a.day][a.stage].push(a);
  });

  let html = '';
  const days = Object.keys(byDay).sort();

  if (days.length === 0) {
    html = '<div class="empty-state">Aucun artiste trouvé</div>';
  } else {
    days.forEach(day => {
      html += `<div class="day-section"><div class="day-header"><span class="day-label">${DAY_LABELS[day]}</span></div>`;
      const stages = Object.keys(byDay[day]).sort();
      stages.forEach(stage => {
        const color = STAGE_COLORS[stage] || '#888';
        html += `<div class="stage-group">
          <div class="stage-header" style="--c:${color}">
            <span class="stage-dot"></span>${stage}
          </div>
          <div class="artist-grid">`;
        byDay[day][stage].forEach(a => {
          const voted = userVotes.includes(a.id);
          const totalVotes = getTotalVotesForArtist(a.id);
          html += `
            <button class="artist-card ${voted ? 'voted' : ''}" data-id="${a.id}" onclick="toggleVote(${a.id})" style="--stage-color:${color}">
              <div class="artist-name">${a.name}</div>
              ${totalVotes > 0 ? `<div class="artist-total-votes">${totalVotes} vote${totalVotes > 1 ? 's' : ''} 🔥</div>` : ''}
              <div class="vote-icon">${voted ? '♥' : '♡'}</div>
            </button>`;
        });
        html += `</div></div>`;
      });
      html += `</div>`;
    });
  }

  grid.innerHTML = html;
  updateVoteCount();
}

function getTotalVotesForArtist(id) {
  return Object.values(state.votes).filter(votes => votes.includes(id)).length;
}

function toggleVote(artistId) {
  if (!state.currentUser) return;
  const votes = state.votes[state.currentUser] || [];
  const idx = votes.indexOf(artistId);
  if (idx === -1) {
    votes.push(artistId);
  } else {
    votes.splice(idx, 1);
  }
  state.votes[state.currentUser] = votes;
  saveState();
  renderLineup();
  if (document.getElementById('view-results').classList.contains('active')) renderResults();
}

function updateVoteCount() {
  const count = (state.votes[state.currentUser] || []).length;
  document.getElementById('vote-count').textContent = count;
}

// --- Nav ---
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.onclick = () => showView(btn.dataset.view);
});

// --- Results ---
document.getElementById('results-day-tabs').querySelectorAll('.rtab').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.resultsDay = btn.dataset.rday === 'all' ? 'all' : parseInt(btn.dataset.rday);
    renderResults();
  };
});

function renderParticipantChips() {
  const el = document.getElementById('participant-chips');
  el.innerHTML = state.users.map(u => {
    const count = (state.votes[u] || []).length;
    return `<span class="p-chip ${u === state.currentUser ? 'me' : ''}">${u} · ${count}</span>`;
  }).join('');
}

function renderResults() {
  renderParticipantChips();
  const list = document.getElementById('results-list');

  // Compute scores
  const scores = {};
  const voterMap = {};

  LINEUP_CLEAN.forEach(a => {
    if (state.resultsDay !== 'all' && a.day !== state.resultsDay) return;
    let count = 0;
    const voters = [];
    state.users.forEach(u => {
      if ((state.votes[u] || []).includes(a.id)) {
        count++;
        voters.push(u);
      }
    });
    if (count > 0) {
      scores[a.id] = count;
      voterMap[a.id] = voters;
    }
  });

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => LINEUP_CLEAN.find(a => a.id === parseInt(id)));

  if (sorted.length === 0) {
    list.innerHTML = '<div class="empty-state">Personne n\'a encore voté… <br>Allez-y !</div>';
    return;
  }

  const maxVotes = scores[sorted[0].id];

  list.innerHTML = sorted.map((a, i) => {
    const count = scores[a.id];
    const voters = voterMap[a.id];
    const pct = Math.round((count / Math.max(state.users.length, 1)) * 100);
    const color = STAGE_COLORS[a.stage] || '#888';
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;

    return `
      <div class="result-row">
        <div class="result-rank">${medal}</div>
        <div class="result-info">
          <div class="result-name">${a.name}</div>
          <div class="result-meta">
            <span class="stage-tag" style="background:${color}20;color:${color};border:1px solid ${color}40">${a.stage}</span>
            <span class="day-tag">${DAY_LABELS[a.day]}</span>
          </div>
          <div class="result-voters">${voters.join(' · ')}</div>
          <div class="result-bar-wrap">
            <div class="result-bar" style="width:${(count / maxVotes) * 100}%;background:${color}"></div>
          </div>
        </div>
        <div class="result-count" style="color:${color}">${count}<span>/${state.users.length}</span></div>
      </div>`;
  }).join('');
}

// --- Particles (login bg) ---
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';
    dot.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation-delay:${Math.random() * 4}s;
      animation-duration:${3 + Math.random() * 4}s;
      width:${2 + Math.random() * 4}px;
      height:${2 + Math.random() * 4}px;
      opacity:${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(dot);
  }
}

// --- Init ---
renderUserList();
initParticles();
showScreen('login');
