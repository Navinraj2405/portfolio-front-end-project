 # 🚀 Personal Portfolio — MERN Stack + Firebase Auth

A modern, fast, and fully responsive **portfolio website** built using the **MERN Stack** with **Firebase Authentication** for admin controls.  
This portfolio showcases my **skills**, **projects**, and includes a **resume download** feature along with an **admin-only upload system**.

---

## Live Demo : https://navinraj.netlify.app

## 🌟 Features

### 🎨 **Modern UI / UX**
- Built using **React + TailwindCSS**
- Fully responsive on Desktop, Tablet & Mobile
- Smooth animations, gradients, and hover effects

### 📄 **Resume Section**
- Public users can **download** the latest resume
- Admin can **upload/replace resume** (frontend-only mode)
- Resume stored in React `/public/` folder  
  `public/Navinraj_CV.pdf`

### 🔐 **Admin Authentication (Firebase)**
- Login system powered by **Firebase Auth**
- Admin-only:
  - Upload new resume (manual replace)
  - Add new projects

### 🧩 **Projects Showcase**
- Add projects with:  
  ✔ Title  
  ✔ Description  
  ✔ GitHub Link  
  ✔ Live Demo Link  
- Displays all projects in a beautiful grid UI

### 💡 **Skills Section**
- Well-designed skill cards for:
  - Frontend (HTML, CSS, TailwindCSS, React)
  - Backend (Node.js, Express.js)
  - Database (MongoDB)

### 🖼 Auto Scrolling Tech Stack Banner
- Continuous horizontal scrolling animation  
- Displays logos of MERN and major frontend tools

---

## 🛠 Tech Stack

### **Frontend**
- React.js
- TailwindCSS
- Firebase Authentication
- Axios (used for projects if backend enabled)

### **Backend (Optional for Projects)**
- Node.js
- Express.js
- MongoDB (Atlas)
- Multer / Cloudinary (for image uploads)

### **Deployment Platforms**
- **Frontend:** Vercel / Netlify  
- **Backend:** Render / Cyclic / Railway

---

## 📁 Project Structure

portfolio/
│── client/ # React Frontend
│ ├── public/
│ │ ├── Navinraj_CV.pdf
│ │ ├── images...
│ ├── src/
│ ├── components/
│ ├── pages/
│ ├── config/Firebase.js
│ └── App.js
│
│── server/ (optional backend)
│ ├── server.js
│ ├── models/
│ ├── routes/
│ ├── uploads/
│
└── README.md
