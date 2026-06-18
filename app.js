// =============================
//  TML W2 2026 — Vote App v2
//  Vue timetable + 3 niveaux
// =============================

const SUPABASE_URL = 'https://swyyjvutelcdixwsueta.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eXlqdnV0ZWxjZGl4d3N1ZXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTM0ODYsImV4cCI6MjA5NzM4OTQ4Nn0.2ahMYhCwUrwxlODrMTQxDYx9LDqRbM8_6TFwn_3tjRg';

const db = {
  async query(method, path, body) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      method,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': method === 'POST' ? 'resolution=merge-duplicates' : '',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (method === 'DELETE' || res.status === 204) return null;
    return res.json();
  },
  get: (p) => db.query('GET', p),
  post: (p, b) => db.query('POST', p, b),
  delete: (p) => db.query('DELETE', p),
};

// --- State ---
let state = {
  users: JSON.parse(localStorage.getItem('tml_users') || '[]'),
  votes: {}, // { "user:artistId": voteLevel (1,2,3) }
  currentUser: null,
  currentView: 'timetable',
  timetableDay: 1,
  resultsDay: 'all',
};

function saveUsers() { localStorage.setItem('tml_users', JSON.stringify(state.users)); }

// --- Supabase ---
async function loadVotes() {
  showLoader(true);
  try {
    const rows = await db.get('votes?select=user_name,artist_id,vote_level');
    state.votes = {};
    if (Array.isArray(rows)) {
      rows.forEach(r => {
        state.votes[`${r.user_name}:${r.artist_id}`] = r.vote_level;
        if (!state.users.includes(r.user_name)) {
          state.users.push(r.user_name);
          saveUsers();
        }
      });
    }
  } catch(e) { console.error(e); }
  showLoader(false);
}

function getMyVote(artistId) {
  return state.votes[`${state.currentUser}:${artistId}`] || null;
}

function getTotalVotesForArtist(artistId) {
  const counts = { 1: 0, 2: 0, 3: 0 };
  state.users.forEach(u => {
    const v = state.votes[`${u}:${artistId}`];
    if (v) counts[v]++;
  });
  return counts;
}

async function setVote(artistId, level) {
  if (!state.currentUser) return;
  const key = `${state.currentUser}:${artistId}`;
  const current = state.votes[key] || null;

  // Toggle: same level = remove vote
  if (current === level) {
    delete state.votes[key];
    await db.delete(`votes?user_name=eq.${encodeURIComponent(state.currentUser)}&artist_id=eq.${artistId}`);
  } else {
    state.votes[key] = level;
    await db.post('votes', { user_name: state.currentUser, artist_id: artistId, vote_level: level });
  }
}

// --- Loader ---
function showLoader(show) {
  let el = document.getElementById('global-loader');
  if (!el) {
    el = document.createElement('div');
    el.id = 'global-loader';
    el.innerHTML = '<div class="ldot"></div><div class="ldot"></div><div class="ldot"></div>';
    el.style.cssText = 'position:fixed;inset:0;background:rgba(10,10,18,0.9);display:flex;align-items:center;justify-content:center;gap:8px;z-index:9999;';
    document.head.insertAdjacentHTML('beforeend', '<style>.ldot{width:10px;height:10px;border-radius:50%;background:#C06EFF;animation:ldot 0.6s infinite alternate}.ldot:nth-child(2){animation-delay:.2s}.ldot:nth-child(3){animation-delay:.4s}@keyframes ldot{from{transform:translateY(0);opacity:.4}to{transform:translateY(-16px);opacity:1}}</style>');
    document.body.appendChild(el);
  }
  el.style.display = show ? 'flex' : 'none';
}

// --- Screens ---
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
}

// --- Login ---
function renderUserList() {
  const el = document.getElementById('user-list');
  if (!state.users.length) {
    el.innerHTML = '<p style="color:var(--muted);font-size:13px;text-align:center;padding:8px 0;">Sois le premier à rejoindre !</p>';
    return;
  }
  el.innerHTML = state.users.map(u => {
    const myVotes = Object.entries(state.votes).filter(([k]) => k.startsWith(u+':')).length;
    return `<button class="user-btn" onclick="selectUser('${u}')">
      <span class="user-avatar">${u[0].toUpperCase()}</span>
      <span class="user-name">${u}</span>
      <span class="user-votes">${myVotes} votes</span>
    </button>`;
  }).join('');
}

async function selectUser(name) {
  state.currentUser = name;
  document.getElementById('topbar-user').textContent = name;
  showScreen('vote');
  renderTimetable();
  startPolling();
}

document.getElementById('add-user-btn').onclick = async () => {
  const input = document.getElementById('new-user-input');
  const name = input.value.trim();
  if (!name) return;
  if (!state.users.includes(name)) { state.users.push(name); saveUsers(); }
  input.value = '';
  selectUser(name);
};
document.getElementById('new-user-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('add-user-btn').click();
});
document.getElementById('logout-btn').onclick = () => {
  stopPolling();
  state.currentUser = null;
  showScreen('login');
  loadVotes().then(renderUserList);
};

// --- Polling ---
let pollingInterval = null;
function startPolling() {
  stopPolling();
  pollingInterval = setInterval(async () => {
    await loadVotes();
    if (state.currentView === 'timetable') renderTimetable();
    else renderResults();
    renderParticipantChips();
  }, 10000);
}
function stopPolling() { if (pollingInterval) { clearInterval(pollingInterval); pollingInterval = null; } }

// --- Nav ---
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.onclick = () => {
    state.currentView = btn.dataset.view;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
    if (btn.dataset.view === 'results') renderResults();
  };
});

document.getElementById('logout-btn').onclick = () => {
  stopPolling(); state.currentUser = null;
  showScreen('login'); loadVotes().then(renderUserList);
};

// ══════════════════════════════════════
//  TIMETABLE VIEW
// ══════════════════════════════════════

// Day tabs
document.querySelectorAll('.day-tab').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.timetableDay = parseInt(btn.dataset.day);
    renderTimetable();
  };
});

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  // after midnight => add 24h
  return (h < 10 ? h + 24 : h) * 60 + m;
}

function renderTimetable() {
  const day = state.timetableDay;
  const slots = TIMETABLE.filter(s => s.day === day);
  const stages = STAGES_ORDER.filter(s => slots.some(sl => sl.stage === s));

  // Time range for this day
  const allStarts = slots.map(s => timeToMinutes(s.time));
  const allEnds = slots.map(s => timeToMinutes(s.time) + s.duration);
  const minTime = Math.min(...allStarts);
  const maxTime = Math.max(...allEnds);

  // Grid: 1 col per 30min, header + stage rows
  const SLOT_W = 120; // px per 30min
  const ROW_H = 72;
  const LABEL_W = 140;
  const totalMinutes = maxTime - minTime;
  const totalWidth = LABEL_W + (totalMinutes / 30) * SLOT_W;

  // Build time headers
  let headers = '<div class="tt-corner"></div>';
  for (let t = minTime; t < maxTime; t += 30) {
    const h = Math.floor(t / 60) % 24;
    const m = t % 60;
    headers += `<div class="tt-timecell">${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}</div>`;
  }

  // Build rows
  let rows = '';
  stages.forEach(stage => {
    const color = STAGE_COLORS[stage] || '#888';
    const stageSlots = slots.filter(s => s.stage === stage);
    let cells = `<div class="tt-stage-label" style="--c:${color}"><span>${stage}</span></div>`;
    cells += `<div class="tt-row-inner" style="width:${totalWidth - LABEL_W}px;position:relative;height:${ROW_H}px;">`;
    stageSlots.forEach(slot => {
      const startMin = timeToMinutes(slot.time) - minTime;
      const left = (startMin / 30) * SLOT_W;
      const width = (slot.duration / 30) * SLOT_W - 4;
      const myVote = getMyVote(slot.id);
      const counts = getTotalVotesForArtist(slot.id);
      const totalVotes = counts[1] + counts[2] + counts[3];
      const voteClass = myVote ? `voted voted-${myVote}` : '';
      const voteColor = myVote ? VOTE_LEVELS[myVote-1].color : color;

      let dotHtml = '';
      if (totalVotes > 0) {
        dotHtml = VOTE_LEVELS.map(vl => counts[vl.value] > 0
          ? `<span class="vdot" style="background:${vl.color}" title="${vl.label}: ${counts[vl.value]}">${counts[vl.value]}</span>`
          : ''
        ).join('');
      }

      cells += `<div class="tt-slot ${voteClass}" 
        style="left:${left}px;width:${width}px;--c:${color};--vc:${voteColor}"
        data-id="${slot.id}" onclick="openVoteModal(${slot.id})">
        <div class="tt-slot-name">${slot.name}</div>
        <div class="tt-slot-time">${slot.time}</div>
        ${dotHtml ? `<div class="tt-slot-dots">${dotHtml}</div>` : ''}
        ${myVote ? `<div class="tt-my-vote">${VOTE_LEVELS[myVote-1].emoji}</div>` : ''}
      </div>`;
    });
    cells += '</div>';
    rows += `<div class="tt-row">${cells}</div>`;
  });

  document.getElementById('timetable-grid').innerHTML = `
    <div class="tt-header" style="padding-left:${LABEL_W}px">${headers}</div>
    <div class="tt-body">${rows}</div>
  `;
}

// ── Vote Modal ──
function openVoteModal(artistId) {
  const slot = TIMETABLE.find(s => s.id === artistId);
  if (!slot) return;
  const myVote = getMyVote(artistId);
  const counts = getTotalVotesForArtist(artistId);
  const color = STAGE_COLORS[slot.stage] || '#888';

  const votersHtml = VOTE_LEVELS.map(vl => {
    const voters = state.users.filter(u => state.votes[`${u}:${artistId}`] === vl.value);
    return voters.length ? `<div class="modal-voter-row"><span>${vl.emoji} ${vl.label}</span><span class="modal-voter-names">${voters.join(', ')}</span></div>` : '';
  }).join('');

  document.getElementById('modal-overlay').innerHTML = `
    <div class="modal" onclick="event.stopPropagation()">
      <div class="modal-stage" style="color:${color}">${slot.stage}</div>
      <div class="modal-name">${slot.name}</div>
      <div class="modal-time">${DAY_LABELS[slot.day]} · ${slot.time} → ${endTime(slot)}</div>
      <div class="modal-votes">
        ${VOTE_LEVELS.map(vl => `
          <button class="modal-vote-btn ${myVote === vl.value ? 'active' : ''}" 
            style="--vc:${vl.color}" onclick="modalVote(${artistId}, ${vl.value})">
            <span class="mvb-emoji">${vl.emoji}</span>
            <span class="mvb-label">${vl.label}</span>
            <span class="mvb-count">${counts[vl.value] || 0}</span>
          </button>`).join('')}
      </div>
      ${votersHtml ? `<div class="modal-voters">${votersHtml}</div>` : ''}
      <button class="modal-close" onclick="closeModal()">✕ Fermer</button>
    </div>`;
  document.getElementById('modal-overlay').classList.add('active');
}

function endTime(slot) {
  const total = timeToMinutes(slot.time) + slot.duration;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

async function modalVote(artistId, level) {
  await setVote(artistId, level);
  openVoteModal(artistId); // refresh modal
  renderTimetable();
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('active'); }
document.getElementById('modal-overlay').onclick = closeModal;

// ══════════════════════════════════════
//  RESULTS VIEW
// ══════════════════════════════════════

document.querySelectorAll('.rtab').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.resultsDay = btn.dataset.rday === 'all' ? 'all' : parseInt(btn.dataset.rday);
    renderResults();
  };
});

function renderParticipantChips() {
  const el = document.getElementById('participant-chips');
  if (!el) return;
  el.innerHTML = state.users.map(u => {
    const count = Object.keys(state.votes).filter(k => k.startsWith(u+':')).length;
    return `<span class="p-chip ${u === state.currentUser ? 'me' : ''}">${u} · ${count}</span>`;
  }).join('');
}

function renderResults() {
  renderParticipantChips();
  const list = document.getElementById('results-list');

  const filtered = TIMETABLE.filter(s => state.resultsDay === 'all' || s.day === state.resultsDay);

  // Score: prio=3pts, si dispo=2pts, pourquoi pas=1pt
  const POINTS = { 1: 3, 2: 2, 3: 1 };
  const scored = filtered.map(s => {
    let score = 0;
    const counts = { 1: 0, 2: 0, 3: 0 };
    state.users.forEach(u => {
      const v = state.votes[`${u}:${s.id}`];
      if (v) { score += POINTS[v]; counts[v]++; }
    });
    return { ...s, score, counts };
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  if (!scored.length) {
    list.innerHTML = '<div class="empty-state">Personne n\'a encore voté 🎵</div>';
    return;
  }

  const maxScore = scored[0].score;
  list.innerHTML = scored.map((s, i) => {
    const color = STAGE_COLORS[s.stage] || '#888';
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
    const voterRows = VOTE_LEVELS.map(vl => {
      const voters = state.users.filter(u => state.votes[`${u}:${s.id}`] === vl.value);
      return voters.length ? `<span class="rvl" style="color:${vl.color}">${vl.emoji} ${voters.join(', ')}</span>` : '';
    }).join('');

    return `<div class="result-row">
      <div class="result-rank">${medal}</div>
      <div class="result-info">
        <div class="result-name">${s.name}</div>
        <div class="result-meta">
          <span class="stage-tag" style="background:${color}20;color:${color};border:1px solid ${color}40">${s.stage}</span>
          <span class="day-tag">${DAY_LABELS[s.day]} · ${s.time}</span>
        </div>
        <div class="result-voters">${voterRows}</div>
        <div class="result-bar-wrap"><div class="result-bar" style="width:${(s.score/maxScore)*100}%;background:${color}"></div></div>
      </div>
      <div class="result-count" style="color:${color}">${s.score}<span>pts</span></div>
    </div>`;
  }).join('');
}

// --- Particles ---
function initParticles() {
  const c = document.getElementById('particles');
  if (!c) return;
  for (let i = 0; i < 30; i++) {
    const d = document.createElement('div');
    d.className = 'particle';
    d.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${3+Math.random()*4}s;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;`;
    c.appendChild(d);
  }
}

// --- Init ---
initParticles();
loadVotes().then(() => { renderUserList(); showScreen('login'); });
