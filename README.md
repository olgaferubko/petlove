# Petlove

## About the project

Petlove is a full-featured web application for pet lovers.  
It allows users to explore pet-related news, view and filter notices about pets, find partner organizations, register/login, manage their profile and add personal pets.  
The app supports both authorized and unauthorized users with different navigation flows, provides a clean responsive UI, and interacts with a backend API.

## Key Features

- Responsive layout:
  - Mobile: 320px+ (fluid), 375px+ (adaptive)
  - Tablet: 768px+
  - Desktop: 1280px+
- Semantic HTML5 markup
- Connected fonts & favicon
- Optimized images (raster & vector), retina support
- SVG sprite icons
- Optimized static assets loading
- Authentication & private routes
- User can manage pets and favorite notices
- News & notices pages with server-side pagination & filters
- Fully integrated with backend API

## Tech Stack

- React + Vite — build & development
- React Router — navigation
- React Hook Form + Yup — validation
- Redux Toolkit — global state management
- CSS Modules — styling
- REST API — backend integration
- TypeScript — static typing & type safety

## Pages and Routes

- `/` — Main layout with Header and Loader
- `/home` — Home page with main title, description and static image
- `/news` — News page with search, pagination and news list
- `/notices` — Notices page with filters, list of notices and pagination
- `/friends` — Our Friends page with partners list and contacts
- `/register` — Registration page with form validation
- `/login` — Login page with form validation
- `/profile` — Private Profile page with user data, pets and personal notices
- `/add-pet` — Private Add Pet page with a validated form

## How It Works

- All data (news, notices, friends, user data, pets) is fetched from the backend via REST API
- Global state is managed with Redux Toolkit, with localStorage sync for persistence
- Authentication uses JWT tokens stored in Redux + localStorage (login, register, logout)
- Favorites and viewed notices are stored per user (if logged in) or locally (if guest)
- Pagination is server-side, requesting data with `page` and `limit` parameters
- Loader is displayed during all async requests
- Forms (register, login, edit user, add pet, appointment) are validated with React Hook Form + Yup
- Modals (auth, attention, notice, edit user, approve action) close on backdrop click, Esc or close icon
- Responsive layout supports mobile (320px+), tablet (768px+) and desktop (1280px+)

## Getting Started:

```bash
Clone the repository:
git clone <your-repo-url>

Install dependencies:
npm install

Run locally:
npm run dev

Build for production:
npm run build
```

## About Me:

Hi! I'm Olga Ferubko, a Front-End Developer passionate about crafting intuitive and responsive user interfaces. I'm constantly leveling up my skills in JavaScript and React and enjoy writing clean, maintainable code.

Feel free to connect with me:

GitHub: https://github.com/olgaferubko

Email: ferubko.olga@gmail.com

LinkedIn: https://www.linkedin.com/in/olga-ferubko/

Check it out:
Deployed and live here: https://petlove-gilt.vercel.app/
