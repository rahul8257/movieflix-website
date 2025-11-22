// Shared JS for index, login, admin
const SAMPLE_MOVIES = [
  { id:'m1', title:'Demo Movie 1', year:2023, genre:'Action', desc:'High-octane action demo.', img:'https://via.placeholder.com/400x600?text=Poster+1' },
  { id:'m2', title:'Comedy Nights', year:2021, genre:'Comedy', desc:'Light-hearted family comedy.', img:'https://via.placeholder.com/400x600?text=Poster+2' },
  { id:'m3', title:'Thriller Night', year:2022, genre:'Thriller', desc:'Edge-of-seat suspense.', img:'https://via.placeholder.com/400x600?text=Poster+3' },
  { id:'m4', title:'Documentary Demo', year:2019, genre:'Documentary', desc:'Informational and calm.', img:'https://via.placeholder.com/400x600?text=Poster+4' },
  { id:'m5', title:'Romantic Tale', year:2020, genre:'Romance', desc:'A touching love story.', img:'https://via.placeholder.com/400x600?text=Poster+5' },
  { id:'m6', title:'Sci-Fi Sample', year:2024, genre:'Sci-Fi', desc:'Futuristic demo film.', img:'https://via.placeholder.com/400x600?text=Poster+6' },
  { id:'m7', title:'Indie Gem', year:2018, genre:'Indie', desc:'Low-budget heartfelt movie.', img:'https://via.placeholder.com/400x600?text=Poster+7' },
  { id:'m8', title:'Action Sequel', year:2025, genre:'Action', desc:'Sequel demo for action fans.', img:'https://via.placeholder.com/400x600?text=Poster+8' }
];

const STORAGE_KEY = 'movieflix_demo_movies_v1';
const AUTH_KEY = 'movieflix_demo_auth';

// UTIL: load / save movies
function loadMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MOVIES)); return SAMPLE_MOVIES.slice(); }
    return JSON.parse(raw);
  } catch(e) { localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_MOVIES)); return SAMPLE_MOVIES.slice(); }
}

function saveMovies(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// INDEX PAGE LOGIC
if (document.getElementById('moviesGrid')) {
  let movies = loadMovies();

  const grid = document.getElementById('moviesGrid');
  const searchInput = document.getElementById('searchInput');
  const resultsCount = document.getElementById('resultsCount');
  const categorySelect = document.getElementById('categorySelect');

  // Hero initial
  const heroTitle = document.getElementById('heroTitle');
  const heroDesc = document.getElementById('heroDesc');
  const heroImg = document.getElementById('heroImg');
  const heroMeta = document.getElementById('heroMeta');

  function pickHero() {
    const featured = movies[0] || SAMPLE_MOVIES[0];
    heroTitle.innerText = featured.title;
    heroDesc.innerText = featured.desc;
    heroImg.src = featured.img;
    heroMeta.innerText = `Genre: ${featured.genre} • Year: ${featured.year}`;
  }

  function render(list) {
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<div style="color:var(--muted)">No results found</div>';
    } else {
      list.forEach(m => {
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = `
          <img src="${m.img}" alt="${escapeHtml(m.title)}">
          <div class="meta">
            <div class="title">${escapeHtml(m.title)} <span style="font-weight:400;color:var(--muted);font-size:13px">(${m.year})</span></div>
            <div class="sub">${escapeHtml(m.genre)}</div>
          </div>
        `;
        c.addEventListener('click', ()=> openModal(m));
        grid.appendChild(c);
      });
    }
    resultsCount.innerText = `Showing ${list.length} results`;
  }

  function filtered() {
    const q = searchInput.value.trim().toLowerCase();
    const cat = categorySelect.value;
    return movies.filter(m => {
      const matchesCat = cat === 'All' || m.genre === cat;
      const matchesQ = !q || m.title.toLowerCase().includes(q) || String(m.year).includes(q) || m.genre.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }

  // Event listeners
  searchInput.addEventListener('input', ()=> render(filtered()));
  categorySelect.addEventListener('change', ()=> render(filtered()));

  function openModal(m) {
    const modal = document.getElementById('modal');
    document.getElementById('modalTitle').innerText = m.title + ` (${m.year})`;
    document.getElementById('modalDesc').innerText = m.desc;
    document.getElementById('modalImg').src = m.img;
    document.getElementById('modalGenre').innerText = m.genre;
    modal.classList.remove('hidden');
  }
  window.openModal = openModal;

  function closeModal(e) {
    if (e && e.target && e.target.classList && e.target.classList.contains('modal')) {
      // clicked outside
    }
    document.getElementById('modal').classList.add('hidden');
  }
  window.closeModal = closeModal;

  function playDemo() {
    alert('Play Demo — यह सिर्फ़ प्लेसहोल्डर है।'); // demo action
  }
  window.playDemo = playDemo;

  function addToList() {
    alert('Added to list (demo).');
  }
  window.addToList = addToList;

  // initial
  pickHero();
  render(movies);
}

// LOGIN PAGE LOGIC
if (document.getElementById('authEmail')) {
  const emailEl = document.getElementById('authEmail');
  const pwdEl = document.getElementById('authPwd');

  function getAuth() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); } catch(e){ return null; }
  }

  function saveAuth(u) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
  }

  function loginDemo() {
    const email = emailEl.value.trim();
    const pwd = pwdEl.value.trim();
    if (!email || !pwd) return alert('Email और password डालें।');
    saveAuth({ email });
    alert('Logged in (demo) as ' + email);
    location.href = 'index.html';
  }
  window.loginDemo = loginDemo;

  function signupDemo() {
    const email = emailEl.value.trim();
    const pwd = pwdEl.value.trim();
    if (!email || !pwd) return alert('Email और password डालें।');
    saveAuth({ email });
    alert('Account created (demo): ' + email);
    location.href = 'index.html';
  }
  window.signupDemo = signupDemo;
}

// ADMIN PAGE LOGIC
if (document.getElementById('adminList')) {
  let movies = loadMovies();
  const adminList = document.getElementById('adminList');

  function renderAdmin() {
    adminList.innerHTML = '';
    movies.forEach(m => {
      const div = document.createElement('div');
      div.className = 'admin-item';
      div.innerHTML = `<img src="${m.img}" alt=""><div style="flex:1"><div style="font-weight:700">${escapeHtml(m.title)}</div><div class="muted">${m.genre} • ${m.year}</div></div><div><button class="btn" onclick="deleteMovie('${m.id}')">Delete</button></div>`;
      adminList.appendChild(div);
    });
  }

  function adminAddMovie() {
    const title = document.getElementById('aTitle').value.trim();
    const year = document.getElementById('aYear').value.trim();
    const genre = document.getElementById('aGenre').value.trim() || 'Indie';
    const img = document.getElementById('aImg').value.trim() || `https://via.placeholder.com/400x600?text=${encodeURIComponent(title || 'New')}`;
    const desc = document.getElementById('aDesc').value.trim() || 'Demo description';

    if (!title || !year) return alert('Title और Year भरें।');
    const id = 'm' + Date.now();
    const movie = { id, title, year: Number(year), genre, desc, img };
    movies.unshift(movie);
    saveMovies(movies);
    renderAdmin();
    alert('Added (demo): ' + title);
    // clear inputs
    document.getElementById('aTitle').value = '';
    document.getElementById('aYear').value = '';
    document.getElementById('aGenre').value = '';
    document.getElementById('aImg').value = '';
    document.getElementById('aDesc').value = '';
  }
  window.adminAddMovie = adminAddMovie;

  function deleteMovie(id) {
    if (!confirm('Delete this movie?')) return;
    movies = movies.filter(m => m.id !== id);
    saveMovies(movies);
    renderAdmin();
    alert('Deleted.');
  }
  window.deleteMovie = deleteMovie;

  function resetSample() {
    if (!confirm('Replace current data with sample data?')) return;
    movies = SAMPLE_MOVIES.slice();
    saveMovies(movies);
    renderAdmin();
    alert('Reset to sample data.');
  }
  window.resetSample = resetSample;

  function clearAll() {
    if (!confirm('Clear all movies from local storage?')) return;
    movies = [];
    saveMovies(movies);
    renderAdmin();
    alert('Cleared.');
  }
  window.clearAll = clearAll;

  // initial render
  renderAdmin();
}

// small util
function escapeHtml(s){ if(!s) return ''; return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])); }
