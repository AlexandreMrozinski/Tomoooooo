// =============================
//  TML W2 2026 — Vote App v3
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
  votes: {},
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
        if (!state.users.includes(r.user_name)) { state.users.push(r.user_name); saveUsers(); }
      });
    }
  } catch(e) { console.error(e); }
  showLoader(false);
}

function getMyVote(artistId) { return state.votes[`${state.currentUser}:${artistId}`] || null; }

function getVotersForArtist(artistId) {
  const result = { 1: [], 2: [], 3: [] };
  state.users.forEach(u => {
    const v = state.votes[`${u}:${artistId}`];
    if (v) result[v].push(u);
  });
  return result;
}

function getTotalScore(artistId) {
  const POINTS = { 1: 3, 2: 2, 3: 1 };
  let score = 0;
  state.users.forEach(u => { const v = state.votes[`${u}:${artistId}`]; if (v) score += POINTS[v]; });
  return score;
}

// FIX bug premier vote: update state BEFORE re-rendering
async function setVote(artistId, level) {
  if (!state.currentUser) return;
  const key = `${state.currentUser}:${artistId}`;
  const current = state.votes[key] || null;
  if (current === level) {
    delete state.votes[key];
    renderTimetable();
    openVoteModal(artistId);
    await db.delete(`votes?user_name=eq.${encodeURIComponent(state.currentUser)}&artist_id=eq.${artistId}`);
  } else {
    state.votes[key] = level;
    renderTimetable();
    openVoteModal(artistId);
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
    const count = Object.keys(state.votes).filter(k => k.startsWith(u+':')).length;
    return `<button class="user-btn" onclick="selectUser('${u}')">
      <span class="user-avatar">${u[0].toUpperCase()}</span>
      <span class="user-name">${u}</span>
      <span class="user-votes">${count} votes</span>
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
  stopPolling(); state.currentUser = null;
  showScreen('login'); loadVotes().then(renderUserList);
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

// --- Reset ---
document.getElementById('reset-btn').onclick = () => {
  document.getElementById('reset-overlay').classList.add('active');
};
function closeReset() { document.getElementById('reset-overlay').classList.remove('active'); }
document.getElementById('reset-overlay').onclick = closeReset;

async function resetDay(day) {
  closeReset();
  showLoader(true);
  try {
    // Get artist IDs for this day (or all)
    const artistIds = day === 'all'
      ? TIMETABLE.map(s => s.id)
      : TIMETABLE.filter(s => s.day === day).map(s => s.id);

    // Delete from Supabase
    const idsStr = artistIds.join(',');
    await db.delete(`votes?user_name=eq.${encodeURIComponent(state.currentUser)}&artist_id=in.(${idsStr})`);

    // Update local state
    artistIds.forEach(id => {
      delete state.votes[`${state.currentUser}:${id}`];
    });

    renderTimetable();
    renderParticipantChips();
  } catch(e) { console.error(e); }
  showLoader(false);
}

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

// ══════════════════════════════════════
//  TIMETABLE
// ══════════════════════════════════════

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
  return (h < 10 ? h + 24 : h) * 60 + m;
}

function formatMin(totalMin) {
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

const SLOT_W = 130;   // px per 30min
const ROW_H  = 78;    // px per row
const LABEL_W = 0;    // label is separate sticky column now

function renderTimetable() {
  const day = state.timetableDay;
  const slots = TIMETABLE.filter(s => s.day === day);
  const stages = STAGES_ORDER.filter(s => slots.some(sl => sl.stage === s));

  const allStarts = slots.map(s => timeToMinutes(s.time));
  const allEnds   = slots.map(s => timeToMinutes(s.time) + s.duration);
  const minTime   = Math.min(...allStarts);
  const maxTime   = Math.max(...allEnds);
  const totalCols = Math.ceil((maxTime - minTime) / 30);

  // Time header cells
  let headerCells = '';
  for (let i = 0; i < totalCols; i++) {
    const t = minTime + i * 30;
    headerCells += `<div class="tt-hcell">${formatMin(t)}</div>`;
  }

  // Stage rows
  let bodyRows = '';
  stages.forEach(stage => {
    const color = STAGE_COLORS[stage] || '#888';
    const stageSlots = slots.filter(s => s.stage === stage);

    let slotHtml = '';
    stageSlots.forEach(slot => {
      const startCol = (timeToMinutes(slot.time) - minTime) / 30;
      const spanCols = slot.duration / 30;
      const left = startCol * SLOT_W;
      const width = spanCols * SLOT_W - 6;
      const myVote = getMyVote(slot.id);
      const voters = getVotersForArtist(slot.id);
      const totalVoters = voters[1].length + voters[2].length + voters[3].length;
      const voteColor = myVote ? VOTE_LEVELS[myVote-1].color : color;

      // Dots showing group votes
      const dots = VOTE_LEVELS.map(vl =>
        voters[vl.value].map(u =>
          `<span class="sdot" style="background:${vl.color}" title="${u}: ${vl.label}"></span>`
        ).join('')
      ).join('');

      slotHtml += `
        <div class="tt-slot ${myVote ? 'voted v'+myVote : ''}"
          style="left:${left}px;width:${width}px;--c:${color};--vc:${voteColor};height:${ROW_H-8}px;top:4px"
          onclick="openVoteModal(${slot.id})">
          <div class="tt-slot-inner">
            <div class="tt-sname">${slot.name}</div>
            <div class="tt-stime">${slot.time}–${formatMin(timeToMinutes(slot.time)+slot.duration)}</div>
            ${totalVoters > 0 ? `<div class="tt-dots">${dots}</div>` : ''}
          </div>
          ${myVote ? `<div class="tt-myvote">${VOTE_LEVELS[myVote-1].emoji}</div>` : ''}
        </div>`;
    });

    bodyRows += `
      <div class="tt-row">
        <div class="tt-slabel" style="--c:${color}">${stage}</div>
        <div class="tt-rowcells" style="width:${totalCols * SLOT_W}px;height:${ROW_H}px;position:relative;">
          ${slotHtml}
        </div>
      </div>`;
  });

  document.getElementById('timetable-grid').innerHTML = `
    <div class="tt-table">
      <div class="tt-head-row">
        <div class="tt-slabel tt-corner">Scène</div>
        <div class="tt-head-scroll" style="width:${totalCols * SLOT_W}px">
          ${headerCells}
        </div>
      </div>
      ${bodyRows}
    </div>`;
}

// ── Vote Modal ──
function openVoteModal(artistId) {
  const slot = TIMETABLE.find(s => s.id === artistId);
  if (!slot) return;
  const myVote = getMyVote(artistId);
  const voters = getVotersForArtist(artistId);
  const color = STAGE_COLORS[slot.stage] || '#888';

  const voterRows = VOTE_LEVELS.map(vl => {
    if (!voters[vl.value].length) return '';
    return `<div class="modal-vrow">
      <span class="modal-vemoji">${vl.emoji}</span>
      <span class="modal-vnames">${voters[vl.value].join(', ')}</span>
    </div>`;
  }).join('');

  document.getElementById('modal-overlay').innerHTML = `
    <div class="modal" onclick="event.stopPropagation()">
      <div class="modal-stage" style="color:${color}">${slot.stage}</div>
      <div class="modal-name">${slot.name}</div>
      <div class="modal-time">${DAY_LABELS[slot.day]} · ${slot.time} → ${formatMin(timeToMinutes(slot.time)+slot.duration)}</div>
      <div class="modal-btns">
        ${VOTE_LEVELS.map(vl => {
          const count = voters[vl.value].length;
          return `<button class="mvbtn ${myVote === vl.value ? 'active' : ''}"
            style="--vc:${vl.color}" onclick="setVote(${artistId}, ${vl.value})">
            <span class="mvbtn-emoji">${vl.emoji}</span>
            <span class="mvbtn-label">${vl.label}</span>
            ${count > 0 ? `<span class="mvbtn-count">${count}</span>` : ''}
          </button>`;
        }).join('')}
      </div>
      ${voterRows ? `<div class="modal-voters">${voterRows}</div>` : ''}
      <button class="modal-close" onclick="closeModal()">Fermer</button>
    </div>`;
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('active'); }
document.getElementById('modal-overlay').onclick = closeModal;

// ══════════════════════════════════════
//  RESULTS — Timeline avec votes visibles
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

  const POINTS = { 1: 3, 2: 2, 3: 1 };
  const daysToShow = state.resultsDay === 'all' ? [1, 2, 3] : [state.resultsDay];
  const container = document.getElementById('results-list');

  let html = '';

  daysToShow.forEach(day => {
    const daySlots = TIMETABLE.filter(s => s.day === day);
    const stages = STAGES_ORDER.filter(s => daySlots.some(sl => sl.stage === s));

    const allStarts = daySlots.map(s => timeToMinutes(s.time));
    const allEnds   = daySlots.map(s => timeToMinutes(s.time) + s.duration);
    const minTime   = Math.min(...allStarts);
    const maxTime   = Math.max(...allEnds);
    const totalCols = Math.ceil((maxTime - minTime) / 30);
    const COL = 80; // narrower for results

    // Only show stages that have at least 1 vote
    const votedStages = stages.filter(stage =>
      daySlots.filter(s => s.stage === stage).some(s => {
        const v = getVotersForArtist(s.id);
        return v[1].length + v[2].length + v[3].length > 0;
      })
    );

    if (!votedStages.length) return;

    // Header
    let headerCells = '';
    for (let i = 0; i < totalCols; i++) {
      const t = minTime + i * 30;
      // only show every hour
      const m = t % 60;
      headerCells += `<div class="rt-hcell">${m === 0 ? formatMin(t) : ''}</div>`;
    }

    let stageRows = '';
    votedStages.forEach(stage => {
      const color = STAGE_COLORS[stage] || '#888';
      const stageSlots = daySlots.filter(s => s.stage === stage);

      let slotHtml = '';
      stageSlots.forEach(slot => {
        const voters = getVotersForArtist(slot.id);
        const totalVoters = voters[1].length + voters[2].length + voters[3].length;
        const score = getTotalScore(slot.id);
        if (totalVoters === 0) {
          // Show as ghost slot
          const startCol = (timeToMinutes(slot.time) - minTime) / 30;
          const spanCols = slot.duration / 30;
          slotHtml += `<div class="rt-slot ghost" style="left:${startCol*COL}px;width:${spanCols*COL-3}px"></div>`;
          return;
        }

        const startCol = (timeToMinutes(slot.time) - minTime) / 30;
        const spanCols = slot.duration / 30;
        const myVote = getMyVote(slot.id);
        const voteColor = myVote ? VOTE_LEVELS[myVote-1].color : color;

        // Vote bars: proportional height for each level
        const maxV = Math.max(voters[1].length, voters[2].length, voters[3].length, 1);
        const bars = VOTE_LEVELS.map(vl =>
          voters[vl.value].length > 0
            ? `<div class="rt-bar" style="height:${(voters[vl.value].length/maxV)*100}%;background:${vl.color}"></div>`
            : `<div class="rt-bar" style="height:0"></div>`
        ).join('');

        // Tooltip content
        const tipRows = VOTE_LEVELS.map(vl =>
          voters[vl.value].length ? `<div>${vl.emoji} ${voters[vl.value].join(', ')}</div>` : ''
        ).join('');

        slotHtml += `
          <div class="rt-slot voted ${myVote ? 'myvote' : ''}"
            style="left:${startCol*COL}px;width:${spanCols*COL-3}px;--c:${color};--vc:${voteColor}">
            <div class="rt-bars">${bars}</div>
            <div class="rt-name">${slot.name}</div>
            <div class="rt-time">${slot.time}</div>
            <div class="rt-tooltip">
              <div class="rtt-name">${slot.name}</div>
              <div class="rtt-stage" style="color:${color}">${stage}</div>
              <div class="rtt-time">${slot.time}–${formatMin(timeToMinutes(slot.time)+slot.duration)}</div>
              <div class="rtt-votes">${tipRows}</div>
              <div class="rtt-score">Score: ${score} pts</div>
            </div>
          </div>`;
      });

      stageRows += `
        <div class="rt-row">
          <div class="rt-slabel" style="--c:${color}">${stage}</div>
          <div class="rt-cells" style="width:${totalCols*COL}px;height:56px;position:relative">${slotHtml}</div>
        </div>`;
    });

    html += `
      <div class="rt-day">
        <div class="rt-day-title">${DAY_LABELS[day]}</div>
        <div class="rt-table">
          <div class="rt-head-row">
            <div class="rt-slabel rt-corner"></div>
            <div class="rt-head-cells" style="width:${totalCols*COL}px">${headerCells}</div>
          </div>
          ${stageRows}
        </div>
      </div>`;
  });

  container.innerHTML = html || '<div class="empty-state">Personne n\'a encore voté 🎵</div>';
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
window.addEventListener('load', () => {});
loadVotes().then(() => { renderUserList(); showScreen('login'); });
