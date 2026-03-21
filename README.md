# Digital Resume & Portfolio

Portfolio website xây dựng theo thiết kế Figma [Digital Resume - Portfolio](https://www.figma.com/design/wfsim3PTWDH1OkNSwjU4mM/), sử dụng Next.js, React Icons và Framer Motion.

## Công nghệ

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** React Icons (Si, Fa6)
- **Animation:** Framer Motion

## Cấu trúc thư mục

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Trang chủ
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # UI components tái sử dụng
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   ├── sections/       # Section components
│   │   ├── SectionWrapper.tsx  # Wrapper với animation
│   │   ├── MyJourney.tsx
│   │   ├── WorkHistory.tsx
│   │   ├── Education.tsx
│   │   ├── SkillSet.tsx
│   │   ├── Toolbox.tsx
│   │   └── Portfolio.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   └── BackgroundPattern.tsx
└── data/
    └── portfolio.ts    # Dữ liệu nội dung
```

## Responsive Layout

- **Mobile (< 768px):** 
  - Menu hamburger
  - Single column layout
  - Sections stack theo chiều dọc
  - Grid 1 cột cho Portfolio

- **Tablet (768px - 1024px):**
  - Nav inline
  - 2 cột cho sections (title bên trái, content bên phải)
  - Grid 2 cột cho Portfolio

- **Desktop (> 1024px):**
  - Layout đầy đủ
  - Max-width 1200px, centered
  - Floating recommendation cards trong Hero

## Framer Motion Animations

1. **Header:** Fade-in khi load
2. **Hero:** Staggered fade-in cho avatar, badges, name, bio, CTA
3. **Floating cards:** Y-axis oscillation (floating effect)
4. **Sections:** `whileInView` fade + slide-up khi scroll
5. **Cards (Work, Education, Portfolio):** Hover scale, shadow
6. **Toolbox icons:** Hover scale + lift
7. **Badges:** Hover scale
8. **Button:** Hover scale, tap scale

## Chạy dự án

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem.

## Tùy chỉnh nội dung

Chỉnh sửa file `src/data/portfolio.ts` để cập nhật:
- Thông tin cá nhân
- Work history
- Education
- Skills
- Portfolio projects
- Social links (trong `Footer.tsx`)
