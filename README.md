# yehor.dev — портфоліо

Статичне портфоліо Python-розробника ботів і веб-розробника. Сайт не потребує
збірки чи сторонніх JavaScript-бібліотек: HTML, CSS і нативний JavaScript.

## Структура

```
PortFolioWeb3/
├── index.html            # головна сторінка
├── cv.html               # резюме (print-ready → «Зберегти як PDF»)
├── assets/
│   ├── css/styles.css    # дизайн-система, червона тема, адаптив
│   └── js/main.js        # bot-консоль, scroll-reveal, лічильники, меню
└── README.md
```

## Дизайн

- **Палітра:** тепло-чорний `#140607` + crimson `#E6332A` / ember `#FF6B4A`, oxblood `#7A1216`, тепло-білий `#F5EEE6`.
- **Шрифти:** системні стекові шрифти — без додаткових мережевих запитів.
- **Анімації:** CSS keyframes/transitions і JavaScript Intersection Observer,
  лічильники та консоль із ефектом набору; враховується `prefers-reduced-motion`.
- **Продуктивність:** без залежностей, зовнішніх шрифтів і важких медіафайлів;
  скрипт відкладається до завершення розбору HTML.

## Як відкрити

Просто відкрийте `index.html` у браузері. Для локального сервера (необов'язково):

```bash
# Python
python -m http.server 5500
# потім відкрийте http://localhost:5500
```

## Резюме у PDF

Відкрийте `cv.html` → кнопка **«Зберегти як PDF / Друк»** → у діалозі друку оберіть
«Зберегти як PDF». Готовий файл можна кріпити на біржах (Upwork, Freelancehunt, Fiverr).

## Деплой

Будь-який статичний хостинг: **GitHub Pages**, Netlify, Vercel, Cloudflare Pages.
Для GitHub Pages: відкрийте **Settings → Pages**, виберіть гілку `main` і папку
`/ (root)`. Після збереження GitHub опублікує `index.html` автоматично.
