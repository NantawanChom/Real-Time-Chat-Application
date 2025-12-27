# Real-Time-Chat-Application

## Overview

แอปแชท (Chat Application) แบบเรียลไทม์ UI ทันสมัย รองรับหลายภาษา (i18n) และรองรับการจัดการสถานะผู้ใช้ (login/logout)

### Features

- ระบบล็อกอิน/สมัครสมาชิก (mock)
- รายชื่อห้องสนทนาและข้อความตัวอย่าง
- ส่งข้อความในแต่ละห้องแชท (local state)
- เปลี่ยนภาษา (i18n)
- Responsive UI

## Tech Stack & Tools

- [React 18 + TypeScript](https://react.dev/learn)
- [Vite](https://vitejs.dev/) (dev/build tool)
- [Zustand](https://github.com/pmndrs/zustand) (state management)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [React Router](https://reactrouter.com/) (routing)
- [i18next](https://www.i18next.com/) (multi-language)

## Theme Color Palette

```
#6a4a3c
#7b5a43
#5a3f31
#b08969
#d8c3a5
```

## Getting Started

### 1. ติดตั้ง dependencies

```sh
pnpm install
# หรือ
npm install
```

### 2. รันแอปพลิเคชัน

```sh
pnpm dev
# หรือ
npm run dev
```

### 3. Build สำหรับ production

```sh
pnpm build
# หรือ
npm run build
```

### 4. Preview production build

```sh
pnpm preview
# หรือ
npm run preview
```

---

**หมายเหตุ:**

- ตัวอย่างนี้ยังไม่เชื่อมต่อ backend จริง (mock data)
- สามารถปรับแต่ง/ขยายฟีเจอร์ได้ตามต้องการ

---

## State Management (Zustand)

โปรเจกต์นี้ใช้ [Zustand](https://github.com/pmndrs/zustand) สำหรับจัดการ global state เช่น ข้อมูลการ login และ user

### โครงสร้างไฟล์

- `src/stores/authStore.ts` — store สำหรับ auth state (login/logout, user info)

### การ persist login state

ใช้ middleware `persist` ของ zustand เพื่อเก็บสถานะ login/user ลง localStorage อัตโนมัติ

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: "auth-storage" }
  )
);
```

> **หมายเหตุ:** เมื่อ login แล้ว สามารถ refresh หน้าเว็บได้โดยไม่หลุด session
