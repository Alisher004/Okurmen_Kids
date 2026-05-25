# Okurmen Kids — IT Academy Website

Next.js 14 + Firebase. Лендинг, админ панель, менеджер кабинети.

## Тез баштоо

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

- Сайт: http://localhost:3000
- Админ: http://localhost:3000/admin
- Менеджер: http://localhost:3000/manager

## Firebase жана ролдор

1. `.env.local` — Firebase маанилери + `NEXT_PUBLIC_ADMIN_EMAILS`
2. `npm run deploy:rules` — Firestore эрежелерин жайгаштыруу
3. **users/{uid}** документи:
   - `role: "admin"` — толук админ панель
   - `role: "manager"` — менеджер кабинети гана
4. Legacy: `admins/{uid}` — админ уруксаты (артка шайкештик)

## Firestore коллекциялары

| Коллекция | Максат |
|-----------|--------|
| `banners` | Hero carousel |
| `faq` | Көп берилүүчү суроолор |
| `testQuestions` | IT тест |
| `videoReviews` | Видео пикирлер |
| `leads` | Жазылуу формалары |
| `trialLessons` | Пробный урок |
| `testResults` | Тест жыйынтыктары |
| `courses`, `teachers`, `students`, `projects` | Контент |

## Deploy

```bash
npm run build
npm run deploy:rules   # Firestore rules
# Vercel же: firebase deploy
```
