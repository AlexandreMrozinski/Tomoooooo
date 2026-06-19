// =============================
//  TML W2 2026 — Vote App v4
//  Toutes les features !
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
  votes: {},       // "user:artistId" => voteLevel
  comments: {},    // "user:artistId" => string
  currentUser: null,
  currentView: 'timetable',
  timetableDay: 1,
  resultsDay: 'all',
  planningDay: 'all',
  searchQuery: '',
};

function saveUsers() { localStorage.setItem('tml_users', JSON.stringify(state.users)); }

// --- Supabase ---
async function loadVotes() {
  try {
    const rows = await db.get('votes?select=user_name,artist_id,vote_level,comment');
    state.votes = {};
    state.comments = {};
    if (Array.isArray(rows)) {
      rows.forEach(r => {
        if (!r.user_name || !r.artist_id) return;
        state.votes[`${r.user_name}:${r.artist_id}`] = r.vote_level;
        if (r.comment) state.comments[`${r.user_name}:${r.artist_id}`] = r.comment;
        if (!state.users.includes(r.user_name)) { state.users.push(r.user_name); saveUsers(); }
      });
    }
  } catch(e) { console.error(e); }
}

function getMyVote(artistId) { return state.votes[`${state.currentUser}:${artistId}`] || null; }
function getMyComment(artistId) { return state.comments[`${state.currentUser}:${artistId}`] || ''; }

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

function getVoteCount(userName) {
  const prefix = userName + ':';
  return Object.keys(state.votes).filter(k => k.startsWith(prefix) && k.length > prefix.length).length;
}

// Detect conflicts: slots that overlap with other voted slots for current user
function getMyConflicts() {
  const myVotedIds = Object.keys(state.votes)
    .filter(k => k.startsWith(state.currentUser + ':') && k.length > state.currentUser.length + 1)
    .map(k => parseInt(k.split(':')[1]))
    .filter(id => !isNaN(id));

  const mySlots = TIMETABLE.filter(s => myVotedIds.includes(s.id));
  const conflictIds = new Set();

  mySlots.forEach(a => {
    const aStart = timeToMinutes(a.time);
    const aEnd = aStart + a.duration;
    mySlots.forEach(b => {
      if (a.id === b.id || a.day !== b.day) return;
      const bStart = timeToMinutes(b.time);
      const bEnd = bStart + b.duration;
      if (aStart < bEnd && aEnd > bStart) {
        conflictIds.add(a.id);
        conflictIds.add(b.id);
      }
    });
  });
  return conflictIds;
}

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
    const comment = state.comments[key] || null;
    await db.post('votes', { user_name: state.currentUser, artist_id: artistId, vote_level: level, comment });
  }
  updatePageTitle();
}

async function saveComment(artistId, text) {
  const key = `${state.currentUser}:${artistId}`;
  const voteLevel = state.votes[key];
  if (!voteLevel) return; // must have voted first
  if (text) state.comments[key] = text;
  else delete state.comments[key];
  await db.post('votes', { user_name: state.currentUser, artist_id: artistId, vote_level: voteLevel, comment: text || null });
}

// --- Page title badge ---
function updatePageTitle() {
  const count = getVoteCount(state.currentUser);
  document.title = count > 0 ? `(${count}) TML W2 2026` : 'TML W2 2026 — Vote entre amis';
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
    const count = getVoteCount(u);
    return `<button class="user-btn" onclick="selectUser('${u}')">
      <span class="user-avatar">${u[0].toUpperCase()}</span>
      <span class="user-name">${u}</span>
      <span class="user-votes">${count} vote${count !== 1 ? 's' : ''}</span>
    </button>`;
  }).join('');
}

async function selectUser(name) {
  state.currentUser = name;
  document.getElementById('topbar-user').textContent = name;
  showScreen('vote');
  renderTimetable();
  updatePageTitle();
  startPolling();
  // Auto-login via URL param
  const url = new URL(window.location);
  url.searchParams.set('user', name);
  window.history.replaceState({}, '', url);
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
  const url = new URL(window.location);
  url.searchParams.delete('user');
  window.history.replaceState({}, '', url);
  document.title = 'TML W2 2026 — Vote entre amis';
  showScreen('login');
  renderUserList();
};

// --- Polling ---
let pollingInterval = null;
function startPolling() {
  stopPolling();
  pollingInterval = setInterval(async () => {
    const prevVotes = JSON.stringify(state.votes);
    await loadVotes();
    const newVotes = JSON.stringify(state.votes);
    if (prevVotes !== newVotes) {
      if (state.currentView === 'timetable') renderTimetable();
      else if (state.currentView === 'results') renderResults();
      else if (state.currentView === 'planning') renderPlanning();
      else if (state.currentView === 'compat') renderCompat();
      renderParticipantChips();
      updatePageTitle();
    }
  }, 15000);
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
    else if (btn.dataset.view === 'planning') renderPlanning();
    else if (btn.dataset.view === 'compat') renderCompat();
  };
});

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
    if (day === 'all') {
      await db.delete(`votes?user_name=eq.${encodeURIComponent(state.currentUser)}`);
      Object.keys(state.votes).forEach(k => {
        if (k.startsWith(state.currentUser + ':')) delete state.votes[k];
      });
      Object.keys(state.comments).forEach(k => {
        if (k.startsWith(state.currentUser + ':')) delete state.comments[k];
      });
    } else {
      const userVotes = await db.get(`votes?user_name=eq.${encodeURIComponent(state.currentUser)}&select=artist_id`);
      if (Array.isArray(userVotes) && userVotes.length) {
        const dayArtistIds = TIMETABLE.filter(s => s.day === day).map(s => s.id);
        const toDelete = userVotes.map(v => v.artist_id).filter(id => dayArtistIds.includes(id));
        if (toDelete.length) {
          await db.delete(`votes?user_name=eq.${encodeURIComponent(state.currentUser)}&artist_id=in.(${toDelete.join(',')})`);
          toDelete.forEach(id => {
            delete state.votes[`${state.currentUser}:${id}`];
            delete state.comments[`${state.currentUser}:${id}`];
          });
        }
      }
    }
    renderTimetable();
    renderParticipantChips();
    updatePageTitle();
  } catch(e) { console.error(e); }
  showLoader(false);
}

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

// Search in timetable
document.getElementById('tt-search').addEventListener('input', e => {
  state.searchQuery = e.target.value.toLowerCase().trim();
  renderTimetable();
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

const SLOT_W = 130;
const ROW_H  = 78;

function renderTimetable() {
  const day = state.timetableDay;
  let slots = TIMETABLE.filter(s => s.day === day);

  // Search filter — highlight matching, dim others
  const q = state.searchQuery;

  const stages = STAGES_ORDER.filter(s => slots.some(sl => sl.stage === s));
  const allStarts = slots.map(s => timeToMinutes(s.time));
  const allEnds   = slots.map(s => timeToMinutes(s.time) + s.duration);
  const minTime   = Math.min(...allStarts);
  const maxTime   = Math.max(...allEnds);
  const totalCols = Math.ceil((maxTime - minTime) / 30);

  const conflicts = getMyConflicts();

  let headerCells = '';
  for (let i = 0; i < totalCols; i++) {
    const t = minTime + i * 30;
    headerCells += `<div class="tt-hcell">${formatMin(t)}</div>`;
  }

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
      const isConflict = conflicts.has(slot.id);
      const voteColor = isConflict ? '#E74C3C' : (myVote ? VOTE_LEVELS[myVote-1].color : color);
      const myComment = getMyComment(slot.id);

      const dots = VOTE_LEVELS.map(vl =>
        voters[vl.value].map(u =>
          `<span class="sdot" style="background:${vl.color}" title="${u}"></span>`
        ).join('')
      ).join('');

      const dimmed = q && !slot.name.toLowerCase().includes(q) ? 'dimmed' : '';
      const highlighted = q && slot.name.toLowerCase().includes(q) ? 'highlighted' : '';

      slotHtml += `
        <div class="tt-slot ${myVote ? 'voted v'+myVote : ''} ${isConflict ? 'conflict' : ''} ${dimmed} ${highlighted}"
          style="left:${left}px;width:${width}px;--c:${color};--vc:${voteColor};height:${ROW_H-8}px;top:4px"
          onclick="openVoteModal(${slot.id})">
          <div class="tt-slot-inner">
            <div class="tt-sname">${slot.name}</div>
            <div class="tt-stime">${slot.time}–${formatMin(timeToMinutes(slot.time)+slot.duration)}</div>
            ${totalVoters > 0 ? `<div class="tt-dots">${dots}</div>` : ''}
            ${myComment ? `<div class="tt-comment-dot" title="${myComment}">💬</div>` : ''}
          </div>
          ${myVote ? `<div class="tt-myvote">${isConflict ? '⚠️' : VOTE_LEVELS[myVote-1].emoji}</div>` : ''}
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
        <div class="tt-head-scroll" style="width:${totalCols * SLOT_W}px">${headerCells}</div>
      </div>
      ${bodyRows}
    </div>`;
}

// ── Vote Modal ──
function openVoteModal(artistId) {
  const slot = TIMETABLE.find(s => s.id === artistId);
  if (!slot) return;
  const myVote = getMyVote(artistId);
  const myComment = getMyComment(artistId);
  const voters = getVotersForArtist(artistId);
  const color = STAGE_COLORS[slot.stage] || '#888';
  const isConflict = getMyConflicts().has(artistId);

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
      <div class="modal-name">${slot.name} ${isConflict ? '<span style="color:#E74C3C;font-size:14px">⚠️ Conflit</span>' : ''}</div>
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
      ${myVote ? `
        <div class="modal-comment-section">
          <div class="modal-comment-label">💬 Note perso</div>
          <textarea id="comment-input" placeholder="Ajouter une note…" maxlength="100">${myComment}</textarea>
          <button class="modal-save-comment" onclick="saveCommentAndClose(${artistId})">Sauvegarder</button>
        </div>` : ''}
      ${voterRows ? `<div class="modal-voters">${voterRows}</div>` : ''}
      <button class="modal-close" onclick="closeModal()">Fermer</button>
    </div>`;
  document.getElementById('modal-overlay').classList.add('active');
}

async function saveCommentAndClose(artistId) {
  const input = document.getElementById('comment-input');
  if (input) await saveComment(artistId, input.value.trim());
  closeModal();
  renderTimetable();
}

function closeModal() { document.getElementById('modal-overlay').classList.remove('active'); }
document.getElementById('modal-overlay').onclick = closeModal;

// ══════════════════════════════════════
//  MON PLANNING
// ══════════════════════════════════════

document.querySelectorAll('.ptab').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.planningDay = btn.dataset.pday === 'all' ? 'all' : parseInt(btn.dataset.pday);
    renderPlanning();
  };
});

function renderPlanning() {
  const list = document.getElementById('planning-list');
  const conflicts = getMyConflicts();

  const myVotedSlots = TIMETABLE
    .filter(s => {
      if (state.planningDay !== 'all' && s.day !== state.planningDay) return false;
      return !!getMyVote(s.id);
    })
    .sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return timeToMinutes(a.time) - timeToMinutes(b.time);
    });

  if (!myVotedSlots.length) {
    list.innerHTML = '<div class="empty-state">Tu n\'as pas encore voté 🎵<br>Va sur Timetable pour voter !</div>';
    return;
  }

  // Group by day
  const byDay = {};
  myVotedSlots.forEach(s => {
    if (!byDay[s.day]) byDay[s.day] = [];
    byDay[s.day].push(s);
  });

  let html = '';
  Object.keys(byDay).sort().forEach(day => {
    html += `<div class="planning-day-title">${DAY_LABELS[day]}</div>`;
    byDay[day].forEach(slot => {
      const myVote = getMyVote(slot.id);
      const vl = VOTE_LEVELS[myVote - 1];
      const color = STAGE_COLORS[slot.stage] || '#888';
      const isConflict = conflicts.has(slot.id);
      const myComment = getMyComment(slot.id);

      html += `<div class="planning-row ${isConflict ? 'conflict' : ''}" onclick="openVoteModal(${slot.id})">
        <div class="planning-vote-badge" style="background:${vl.color}">${vl.emoji}</div>
        <div class="planning-info">
          <div class="planning-name">${slot.name} ${isConflict ? '<span class="conflict-badge">⚠️ Conflit</span>' : ''}</div>
          <div class="planning-meta">
            <span class="stage-tag" style="background:${color}20;color:${color};border:1px solid ${color}40">${slot.stage}</span>
            <span class="planning-time">${slot.time} → ${formatMin(timeToMinutes(slot.time)+slot.duration)}</span>
          </div>
          ${myComment ? `<div class="planning-comment">💬 ${myComment}</div>` : ''}
        </div>
      </div>`;
    });
  });

  list.innerHTML = html;
}

// ══════════════════════════════════════
//  RÉSULTATS
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
    const count = getVoteCount(u);
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
    const COL = 80;

    const votedStages = stages.filter(stage =>
      daySlots.filter(s => s.stage === stage).some(s => {
        const v = getVotersForArtist(s.id);
        return v[1].length + v[2].length + v[3].length > 0;
      })
    );
    if (!votedStages.length) return;

    let headerCells = '';
    for (let i = 0; i < totalCols; i++) {
      const t = minTime + i * 30;
      headerCells += `<div class="rt-hcell">${t % 60 === 0 ? formatMin(t) : ''}</div>`;
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
        const startCol = (timeToMinutes(slot.time) - minTime) / 30;
        const spanCols = slot.duration / 30;

        if (totalVoters === 0) {
          slotHtml += `<div class="rt-slot ghost" style="left:${startCol*COL}px;width:${spanCols*COL-3}px"></div>`;
          return;
        }

        const myVote = getMyVote(slot.id);
        const voteColor = myVote ? VOTE_LEVELS[myVote-1].color : color;
        const maxV = Math.max(voters[1].length, voters[2].length, voters[3].length, 1);
        const bars = VOTE_LEVELS.map(vl =>
          `<div class="rt-bar" style="height:${voters[vl.value].length > 0 ? (voters[vl.value].length/maxV)*100 : 0}%;background:${vl.color}"></div>`
        ).join('');
        const tipRows = VOTE_LEVELS.map(vl =>
          voters[vl.value].length ? `<div>${vl.emoji} ${voters[vl.value].join(', ')}</div>` : ''
        ).join('');

        slotHtml += `
          <div class="rt-slot voted ${myVote ? 'myvote' : ''}"
            style="left:${startCol*COL}px;width:${spanCols*COL-3}px;--c:${color};--vc:${voteColor}"
            onclick="openVoteModal(${slot.id})">
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

// ══════════════════════════════════════
//  AFFINITÉS
// ══════════════════════════════════════

function renderCompat() {
  const list = document.getElementById('compat-list');
  const me = state.currentUser;
  const others = state.users.filter(u => u !== me);

  if (others.length === 0) {
    list.innerHTML = '<div class="empty-state">Pas encore d\'autres participants 👥</div>';
    return;
  }

  const myVotes = Object.keys(state.votes)
    .filter(k => k.startsWith(me + ':'))
    .reduce((acc, k) => { acc[k.split(':')[1]] = state.votes[k]; return acc; }, {});

  const myIds = Object.keys(myVotes).map(Number);

  if (myIds.length === 0) {
    list.innerHTML = '<div class="empty-state">Vote d\'abord des concerts pour voir tes affinités !</div>';
    return;
  }

  const scores = others.map(u => {
    const theirVotes = Object.keys(state.votes)
      .filter(k => k.startsWith(u + ':'))
      .reduce((acc, k) => { acc[k.split(':')[1]] = state.votes[k]; return acc; }, {});

    const theirIds = Object.keys(theirVotes).map(Number);
    const commonIds = myIds.filter(id => theirIds.includes(id));

    // Score: both voted same = 3pts, different level = 1pt
    let score = 0;
    let commonArtists = [];
    commonIds.forEach(id => {
      const myLvl = myVotes[id];
      const theirLvl = theirVotes[id];
      if (myLvl === theirLvl) score += 3;
      else score += 1;
      const slot = TIMETABLE.find(s => s.id === id);
      if (slot) commonArtists.push({ slot, myLvl, theirLvl });
    });

    const maxScore = myIds.length * 3;
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return { user: u, score, pct, commonArtists };
  }).sort((a, b) => b.pct - a.pct);

  const COMPAT_EMOJIS = ['🔥', '😍', '👌', '🤝', '😐', '🤷'];
  const getEmoji = pct => pct >= 80 ? '🔥' : pct >= 60 ? '😍' : pct >= 40 ? '👌' : pct >= 20 ? '🤝' : '😐';

  list.innerHTML = scores.map(({ user, pct, commonArtists }) => {
    const emoji = getEmoji(pct);
    const topCommon = commonArtists
      .filter(a => a.myLvl === 1 && a.theirLvl === 1)
      .slice(0, 3)
      .map(a => `<span class="compat-artist">${a.slot.name}</span>`)
      .join('');

    return `<div class="compat-row">
      <div class="compat-avatar">${user[0].toUpperCase()}</div>
      <div class="compat-info">
        <div class="compat-name">${user} <span class="compat-emoji">${emoji}</span></div>
        <div class="compat-bar-wrap">
          <div class="compat-bar" style="width:${pct}%"></div>
          <span class="compat-pct">${pct}%</span>
        </div>
        ${topCommon ? `<div class="compat-common">🔥 En commun: ${topCommon}</div>` : ''}
      </div>
    </div>`;
  }).join('');
}

// --- Export PDF ---
function exportPDF() {
  const conflicts = getMyConflicts();

  // Build 3-column layout: one per day
  const columns = [1, 2, 3].map(day => {
    const daySlots = TIMETABLE
      .filter(s => s.day === day && getMyVote(s.id))
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

    if (!daySlots.length) return `<div class="print-col"></div>`;

    const rows = daySlots.map(slot => {
      const myVote = getMyVote(slot.id);
      const vl = VOTE_LEVELS[myVote - 1];
      const color = STAGE_COLORS[slot.stage] || '#888';
      const isConflict = conflicts.has(slot.id);
      const myComment = getMyComment(slot.id);
      return `<div class="planning-row ${isConflict ? 'conflict' : ''}">
        <div class="planning-vote-badge">${vl.emoji}</div>
        <div class="planning-info">
          <div class="planning-name">${slot.name}${isConflict ? ' <span class="conflict-badge">⚠️</span>' : ''}</div>
          <div class="planning-meta">
            <span class="stage-tag" style="background:${color}20;color:${color};border:1px solid ${color}50">${slot.stage}</span>
            <span class="planning-time">${slot.time}→${formatMin(timeToMinutes(slot.time)+slot.duration)}</span>
          </div>
          ${myComment ? `<div class="planning-comment">💬 ${myComment}</div>` : ''}
        </div>
      </div>`;
    }).join('');

    return `<div class="print-col">
      <div class="planning-day-title">${DAY_LABELS[day]}</div>
      ${rows}
    </div>`;
  });

  // Inject print area
  const list = document.getElementById('planning-list');
  list.innerHTML = `
    <div id="print-header">
      <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;margin-bottom:12px;border-bottom:2px solid #7B5EA7;">
        <div>
          <div style="font-size:18px;font-weight:700;color:#7B5EA7;">🎪 Tomorrowland Belgium — Weekend 2 · 2026</div>
          <div style="font-size:13px;color:#555;margin-top:2px;">Planning de <strong>${state.currentUser}</strong> · 24–26 juillet 2026</div>
        </div>
        <div style="font-size:12px;color:#888;">🔥 Priorité &nbsp; 👍 Si dispo &nbsp; 🤷 Pourquoi pas &nbsp; ⚠️ Conflit</div>
      </div>
    </div>
    <div class="planning-columns">${columns.join('')}</div>`;

  setTimeout(() => {
    window.print();
    // Restore normal planning view after print dialog
    setTimeout(() => renderPlanning(), 500);
  }, 150);
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

// --- Photo Lightbox ---
function openPhotoLightbox(src) {
  let lb = document.getElementById('photo-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.id = 'photo-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9998;display:flex;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(6px);';
    document.body.appendChild(lb);
  }
  lb.innerHTML = '<img src="' + src + '" style="max-width:92vw;max-height:88vh;border-radius:12px;box-shadow:0 0 60px rgba(0,0,0,0.8);object-fit:contain;" />';
  lb.style.display = 'flex';
  lb.onclick = () => { lb.style.display = 'none'; };
}

function patchPhotoFrames() {
  document.querySelectorAll('.photo-frame').forEach(function(img) {
    img.style.cursor = 'zoom-in';
    img.onclick = function(e) { e.stopPropagation(); openPhotoLightbox(img.src); };
  });
}

// --- Init ---
initParticles();
showLoader(true);
loadVotes().then(() => {
  showLoader(false);
  renderUserList();
  // Auto-login from URL param
  const urlUser = new URL(window.location).searchParams.get('user');
  if (urlUser && state.users.includes(urlUser)) {
    selectUser(urlUser);
  } else {
    showScreen('login');
  }
  setTimeout(patchPhotoFrames, 800);
});
