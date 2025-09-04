# ExcellenceHub 🎓  
_A student resource web application for Nigerian students_

## Overview  
ExcellenceHub is a web application designed to provide Nigerian students with access to study resources, downloads, and interactive tools.  
It features user authentication, resource uploads, ratings, and a personalized dashboard.  

👉 Live Site: [ExcellenceHub](https://excellence-hub-web-app-6k7h.vercel.app/login)  

---

## Screenshots 📸  

### 🔑 Login Page  
![Login Page](./screenshots/login.png)  

### 📊 Dashboard  
![Dashboard](./screenshots/dashboard.png)  

### 📂 Resources Page  
![Resources Page](./screenshots/resources.png)  

*(Save screenshots inside a `/screenshots` folder in your project and update the file paths if needed.)*  

---

## Features ✨  
- 🔑 **Authentication** – secure login & signup with Supabase  
- 📂 **Resources Page** – students can browse and download study resources  
- ⬆️ **Upload** – authenticated users can contribute their own resources  
- ⭐ **Ratings & Reviews** – students can rate and give feedback on resources  
- 📊 **Dashboard** – personalized user dashboard showing downloads, activity, and subscriptions  
- 🔍 **Searchable Universities** – easily search and select universities from a curated list  
- 🛡 **Security** – protected routes and Supabase security rules  

---

## Tech Stack ⚙️  
- **Frontend**: [Next.js](https://nextjs.org/) + [React](https://react.dev/)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)  
- **Icons**: [lucide-react](https://lucide.dev/)  
- **Backend**: [Supabase](https://supabase.com/) (authentication, database, storage)  
- **Deployment**: [Vercel](https://vercel.com/)  

---

## Installation 🛠  

1. Clone the repository:  
   ```bash
   git clone https://github.com/Itunu12/ExcellenceHubWebApp.git
   cd ExcellenceHubWebApp

2. Install dependencies:

npm install


3. Set up environment variables:
Create a .env.local file and add your Supabase keys:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key


4. Run the development server:

npm run dev


5. Open http://localhost:3000 in your browser 🚀




---

Folder Structure 📁

ExcellenceHub/
│── components/      # Reusable UI components
│── lib/             # Utilities and helpers (universities list, supabase client)
│── pages/           # Next.js pages (login, dashboard, resources, etc.)
│── public/          # Static assets (logos, icons)
│── screenshots/     # Project screenshots for README
│── styles/          # Global CSS / Tailwind setup
│── .env.local       # Environment variables


---

Contributing 🤝

1. Fork the repository


2. Create a new branch (git checkout -b feature-name)


3. Commit your changes (git commit -m 'Added feature X')


4. Push to your branch (git push origin feature-name)


5. Open a Pull Request




---

License 📜

This project is licensed under the MIT License – feel free to use and modify.


---

👨‍💻 Author

Itunu Kazeem

GitHub

LinkedIn (https://www.linkedin.com/in/kazeem-itunu?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)


