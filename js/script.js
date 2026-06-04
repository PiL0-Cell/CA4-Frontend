// ============================================
// DRUKFLIX - GLOBAL SCRIPT
// ============================================

// Movie Database
const moviesDB = {
    "Lunana: A Yak in the Classroom": {
        rating: "4.8",
        year: "2019",
        duration: "1h 50m",
        description: "A young teacher in Bhutan journeys to the remote village of Lunana, where he discovers the true meaning of happiness and purpose among a yak-farming community.",
        banner: "assets/Lunana/movie banner.jpg",
        icon: "assets/Lunana/icon.jpg",
        genres: ["Drama"]
    },
    "The Monk and the Gun": {
        rating: "4.7",
        year: "2023",
        duration: "1h 47m",
        description: "As Bhutan prepares for its first democratic elections, a monk seeks to obtain a gun, leading to a series of unexpected events that blend comedy and political satire.",
        banner: "assets/The Monk/movie banner.jpg",
        icon: "assets/The Monk/icon.jpg",
        genres: ["Comedy", "Drama"]
    },
    "Honeygiver Among the Dogs": {
        rating: "4.5",
        year: "2016",
        duration: "2h 15m",
        description: "A young detective investigates the disappearance of a Buddhist nun, uncovering a mysterious tale of crime, spirituality, and hidden secrets.",
        banner: "assets/HoneyGiver/movie banner.jpg",
        icon: "assets/HoneyGiver/icon.jpg",
        genres: ["Crime", "Mystery", "Thriller"]
    },
    "The Red Phallus": {
        rating: "4.3",
        year: "2018",
        duration: "1h 55m",
        description: "A psychological drama exploring themes of identity, culture, and modernity in contemporary Bhutanese society.",
        banner: "assets/The Red/movie banner.jpg",
        icon: "assets/The Red/icon.jpg",
        genres: ["Psychological"]
    },
    "Chasing Stars": {
        rating: "4.4",
        year: "2022",
        duration: "2h 5m",
        description: "A musical romance following a young musician's journey to find love and purpose while pursuing his dreams in modern Bhutan.",
        banner: "assets/Chasing Stars/movie banner.jpg",
        icon: "assets/Chasing Stars/icon.jpg",
        genres: ["Musical", "Romance"]
    },
    "Kusuthara: Pattern of Love": {
        rating: "4.6",
        year: "2021",
        duration: "2h 10m",
        description: "A romantic drama weaving traditional Bhutanese textile art with a timeless love story between two souls from different worlds.",
        banner: "assets/Kusuthara/movie banner.jpg",
        icon: "assets/Kusuthara/icon.jpg",
        genres: ["Romance", "Drama"]
    },
    "Khekpa": {
        rating: "4.2",
        year: "2018",
        duration: "1h 48m",
        description: "A supernatural horror thriller about ancient spirits haunting a remote Bhutanese village and the family fighting to survive.",
        banner: "assets/Khekpa/movie banner.jpg",
        icon: "assets/Khekpa/icon.jpg",
        genres: ["Horror", "Thriller"]
    },
    "Hema Hema": {
        rating: "3.8",
        year: "2016",
        duration: "1h 36m",
        description: "Every 12 years, men and women gather in anonymity in the Bhutan forest to enjoy a few days of anonymity.",
        banner: "assets/Hema/movie banner.jpg",
        icon: "assets/Hema/icon.jpg",
        genres: ["Drama", "Thriller", "Mystery"]
    },
    "Phorpa": {
        rating: "4.2",
        year: "1999",
        duration: "1h 33m",
        description: "The Cup is a 1999 Bhutanese sports comedy film written and directed by Khyentse Norbu in his feature directorial debut.",
        banner: "assets/Phorpa/movie banner.jpg",
        icon: "assets/Phorpa/icon.jpg",
        genres: ["Comedy", "Drama"]
    },
    "Crossing Bhutan": {
        rating: "4.5",
        year: "2016",
        duration: "1 hour",
        description: "Four veteran athletes attempt an unprecedented human-powered, border-to-border crossing of Bhutan to explore the Himalayan Kingdom's unique policy of Gross National Happiness.",
        banner: "assets/Crossing/movie banner.jpg",
        icon: "assets/Crossing/icon.jpg",
        genres: ["Drama"]
    }
};

// Convert to array for searching
const moviesArray = Object.keys(moviesDB).map(title => ({
    title: title,
    rating: moviesDB[title].rating,
    year: moviesDB[title].year,
    genres: moviesDB[title].genres,
    icon: moviesDB[title].icon,
    banner: moviesDB[title].banner,
    duration: moviesDB[title].duration,
    description: moviesDB[title].description
}));

// Make available globally
window.moviesArray = moviesArray;
window.moviesDB = moviesDB;

// SEARCH FUNCTION

window.performSearch = function (query) {
    if (query && query.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(query.trim())}`;
    }
};

// Setup search - only on Enter key, no annoying reloads while typing
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearch = document.getElementById('mobileSearch');

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                window.performSearch(this.value);
            }
        });
    }

    if (mobileSearch) {
        mobileSearch.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                window.performSearch(this.value);
            }
        });
    }
}

// ============================================
// SETUP MOBILE MENU & SEARCH
// ============================================
function setupFeatures() {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.onclick = function () {
            mobileMenu.classList.toggle('hidden');
        };
    }

    // Setup search (only on Enter key)
    setupSearchListener();
}

// ============================================
// LOGOUT FUNCTION
// ============================================
window.logout = function () {
    localStorage.removeItem('stream_session');
    localStorage.removeItem('stream_user');
    window.location.href = 'index.html';
};

// ============================================
// CHECK LOGIN STATUS
// ============================================

const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');

// Error elements
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmError = document.getElementById('confirmError');

// Password requirement elements
const reqLength = document.getElementById('reqLength');
const reqCapital = document.getElementById('reqCapital');
const reqSpecial = document.getElementById('reqSpecial');

function checkLoginStatus() {
    const userData = localStorage.getItem('stream_user');
    const isLoggedIn = userData !== null;

    const authContainer = document.getElementById('authButtons');
    const mobileAuthContainer = document.getElementById('mobileAuth');

    if (isLoggedIn) {
        const user = JSON.parse(userData);
        const initial = user.username ? user.username[0].toUpperCase() : 'U';

        authContainer.innerHTML = `
            <div class="relative group">
                <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer" onclick ="window.location.href = 'account.html'">
                    <span class="text-sm">${initial}</span>
                </div>
            </div>
        `;

        if (mobileAuthContainer) {
            mobileAuthContainer.innerHTML = `
                <a href="profile.html" class="block py-2">Profile</a>
                <a href="account.html" class="block py-2">Account</a>
                <a href="change-password.html" class="block py-2">Change Password</a>
                <button onclick="logout()" class="block w-full text-left py-2 text-red-500">Logout</button>
            `;
        }
    } else {
        authContainer.innerHTML = `
            <a href="login.html" class="hover:text-red-500">Login</a>
            <a href="signup.html" class="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">Sign Up</a>
        `;

        if (mobileAuthContainer) {
            mobileAuthContainer.innerHTML = `
                <a href="login.html" class="block py-2">Login</a>
                <a href="signup.html" class="block bg-red-600 text-center px-4 py-2 rounded-lg">Sign Up</a>
            `;
        }
    }
}

// ============================================
// HIGHLIGHT CURRENT PAGE
// ============================================
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('text-red-500');
        } else {
            link.classList.add('text-white');
        }
    });
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function createModal() {
    const modalHTML = `
        <div id="movieModal" class="modal fixed inset-0 bg-black/90 backdrop-blur-sm z-50 items-center justify-center p-4" style="display: none;">
            <div class="max-w-2xl w-full bg-[#1E1E1E] rounded-xl overflow-hidden shadow-2xl">
                <div id="modalBanner" class="relative h-64 sm:h-80 bg-cover bg-center" style="background-image: url('');">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/60 to-transparent"></div>
                    <div class="absolute -bottom-12 left-6">
                        <img id="modalThumbnail" src="" alt="Movie Thumbnail" class="w-24 h-32 sm:w-32 sm:h-40 object-cover rounded-lg shadow-2xl border-2 border-[#1E1E1E]">
                    </div>
                </div>
                <div class="p-6 pt-16 sm:pt-20">
                    <h2 id="modalTitle" class="text-2xl sm:text-3xl font-bold mb-2">Movie Title</h2>
                    <div class="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                        <span id="modalRating" class="text-yellow-500">★ 0.0</span>
                        <span id="modalYear">2024</span>
                        <span id="modalDuration">0h 0m</span>
                    </div>
                    <p id="modalDescription" class="text-gray-300 leading-relaxed mb-6"></p>
                    <div class="flex gap-3">
                        <button id="modalPlayBtn" class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition transform hover:scale-105 hover:shadow-lg">
                            ▶ Play Now
                        </button>
                        <button id="modalCloseBtn" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg transition border border-gray-700 hover:border-red-600">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function hideModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.showMovieModal = function (movieTitle) {
    const movie = moviesDB[movieTitle];
    if (!movie) {
        console.error('Movie not found:', movieTitle);
        return;
    }

    const modal = document.getElementById('movieModal');
    const banner = document.getElementById('modalBanner');
    const thumbnail = document.getElementById('modalThumbnail');
    const title = document.getElementById('modalTitle');
    const rating = document.getElementById('modalRating');
    const year = document.getElementById('modalYear');
    const duration = document.getElementById('modalDuration');
    const description = document.getElementById('modalDescription');

    if (!modal) return;

    banner.style.backgroundImage = `url('${movie.banner}')`;
    thumbnail.src = movie.icon;
    title.textContent = movieTitle;
    rating.textContent = `★ ${movie.rating}`;
    year.textContent = movie.year;
    duration.textContent = movie.duration;
    description.textContent = movie.description;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
};

function setupModal() {
    createModal();

    const modal = document.getElementById('movieModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const playBtn = document.getElementById('modalPlayBtn');

    if (closeBtn) {
        closeBtn.addEventListener('click', hideModal);
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            console.log('Play button clicked - non-functional');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        const modalEl = document.getElementById('movieModal');
        if (e.key === 'Escape' && modalEl && modalEl.style.display === 'flex') {
            hideModal();
        }
    });
}


// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const searchInputExists = document.getElementById('searchInput');

    if (searchInputExists) {
        console.log('Search input exists already');
        setupFeatures();
    } else {
        console.log('Waiting for search input to be added');
        // Wait for search input to appear (in case header is added by another script)
        waitForSearchInput();
    }

    checkLoginStatus();
    highlightCurrentPage();
    setupFeatures();
    setupModal();
});