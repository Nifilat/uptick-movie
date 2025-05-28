# Celestial Movie App

A modern, responsive movie and TV explorer app built with React, Tailwind CSS, Framer Motion, and the TMDB API.

---

## 🚀 Project Overview
Celestial is a visually stunning movie and TV show browser. It features trending, new collections, genre/year filtering, search, and beautiful animations. The app is fully responsive and optimized for both desktop and mobile.

---

## ✨ Features
- Browse trending movies, new collections, all movies, series, and anime
- Filter by genre and release year
- Powerful search bar
- Responsive grid and carousel layouts
- Animated UI with Framer Motion
- Fixed, animated navigation bar with custom highlight colors
- Movie/series details modal
- Built with React functional components and hooks

---

## 📸 Screenshots
<!-- > Add screenshots of the Home, Movies, Series, Anime, and Details modal here -->
- [Home Page](screenshots/home.png)
- [Movies Page](screenshots/movies.png)
- [Series Page](screenshots/series.png)
- [Anime Page](screenshots/anime.png)
- [Details Modal](screenshots/details.png)


---

## 🛠️ Tech Stack
- **React** (Vite or Create React App)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **TMDB API** for movie/TV data
- **Axios** for API requests

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/celestial-movie-app.git
cd celestial-movie-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root with your TMDB API key:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Run the app
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 📁 Folder Structure
```
/ (root)
├── public/
├── src/
│   ├── components/
│   │   ├── NavigationBar/
│   │   ├── HeroSection/
│   │   ├── SectionRow/
│   │   ├── MovieDetails/
│   │   └── ...
│   ├── App.jsx
│   ├── App.css (if any)
│   └── ...
├── .env
├── package.json
└── README.md
```

---

## 🛠️ Customization
- **Change theme colors:** Edit Tailwind config or update color classes in components.
- **Add more filters:** Extend the NavigationBar and filtering logic in `App.jsx`.
- **Add more sections:** Add new `SectionRow` components for other categories.

---

## 🙏 Credits
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Design](https://dribbble.com/shots/19232210-Celestial-Streaming-Web-App)

---

## 📄 License
MIT 