This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 📬 Periskope Chat App

A real-time, pixel-perfect WhatsApp-style chat UI built as part of the Periskope SDE-1 assignment.  
Built with **Next.js 15**, **Supabase**, **Tailwind CSS**, and **TypeScript**.

## 🔗 Live Demo

👉 https://periskope-chat-app.vercel.app

## 🧑‍💻 Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Supabase
  - Auth (email/password login)
  - PostgreSQL DB
  - Realtime via `postgres_changes`
- React Icons

## ✨ Features

- 🔐 User authentication using Supabase Auth
- 💬 Real-time 1-to-1 chat functionality
- 📱 Clean, responsive, WhatsApp-style UI
- 🚀 Messages update instantly across users
- 🧠 Auto-scrolls to latest message
- 💡 Message input with Enter key support
- 🎨 Pixel-perfect design from provided mock
- ✅ Deployed on Vercel

## 📁 Folder Structure

src/  
├── app/  
│   ├── login/        → Login page  
│   ├── chats/        → Chat screen (main UI)  
│   └── layout.tsx    → App-wide layout with AuthProvider  
├── context/          → Supabase auth context provider  
├── lib/              → Supabase client instance  
├── utils/            → DB queries (getChatsForUser)  
└── styles/           → Tailwind global styles

## 🔧 How to Run Locally

git clone https://github.com/Mrakshaymehta/periskope-chat-app.git  
cd periskope-chat-app  
npm install  
npm run dev

Then open: http://localhost:3000/login

## 🛠 Supabase Setup

1. Create a project at https://supabase.io  
2. Add the following tables:

### chats table

| column       | type     |
|--------------|----------|
| id           | uuid     |
| title        | text     |
| participants | uuid[]   |
| created_at   | timestamp|

### messages table

| column     | type     |
|------------|----------|
| id         | uuid     |
| chat_id    | uuid     |
| sender_id  | uuid     |
| content    | text     |
| created_at | timestamp|

3. Enable **Row Level Security** and apply policies for both tables.

## 📫 Contact

Made with 💻 by Akshay Mehta  
GitHub: https://github.com/Mrakshaymehta
