# VentiSwipe - Mobile-First UX Plan

## Goal
Сделать лендинг VentiSwipe безупречным на смартфонах: устранить текущие мобильные дефекты (десктоп-first вёрстка, конфликт скролла с карточками, авто-зум iOS, фиксированные высоты, отсутствие safe-area, недоступная навигация) и внедрить новые мобильные UX-решения для одной руки.

## Locked decisions
- Скоуп новых фич: gesture quiz navigation, sticky bottom action bar, haptics + undo, mobile drawer menu, snap carousels. PWA НЕ входит в скоуп.
- Зависимости: разрешены малые библиотеки.
  - Жесты: `@use-gesture/vanilla` (только для свайпов между вопросами квиза и уточнения drag-направления карточек).
  - Карусели: нативный CSS `scroll-snap` (без библиотеки).
  - Тактильная отдача: нативный `navigator.vibrate()`.
  - Drawer: чистый CSS + JS (без библиотеки).
- Архитектура: новый слой `mobile.css`, подключаемый после `style.css` и `motion.css`. Существующие десктоп-стили не переписываются.
- JS-логика мобильных фич выносится в новый модуль `mobile.js` (импортируется из `app.js`), чтобы не раздувать `app.js`.

## Out of scope
- PWA / offline / manifest.
- Смена дизайн-системы или палитры Radix.
- Изменение алгоритмов скоринга и датасета (`univer.txt`).
- Редизайн десктопной версии (меняем только регрессии, если всплывут).

## Files touched
- `index.html` - meta viewport/theme-color, подключение `mobile.css` и `mobile.js`, разметка drawer, sticky bottom bar, undo-кнопки, gesture-хинта.
- `style.css` - только минимальные правки токенов/конфликтов (например `touch-action`), если нельзя решить в `mobile.css`.
- `motion.css` - исправить `touch-action: none` у `.swipe-card` (строка 77) и ограничить тяжёлые анимации.
- `app.js` - исправить движок drag (направление/порог), история свайпов для undo, точки вызова haptics.
- `mobile.css` (новый) - весь мобильный слой.
- `mobile.js` (новый) - drawer, gesture-навигация квиза, undo, haptics, хинт.
- `package.json` - добавить `@use-gesture/vanilla`.

## Current problems (evidence)
- Только 3 downscale-брейкпоинта `900/640/480` в `style.css:1673-1719`; нет `min-width`, нет coarse-pointer запросов.
- `motion.css:77` `.swipe-card { touch-action: none }` перекрывает `style.css:873 pan-y` и блокирует вертикальный скролл страницы, когда палец на карточке.
- `.card-stage-container` фиксированная высота `480px` -> `520px` на <=640 (`style.css:845, 1702`), не учитывает `dvh`.
- `.input-box` `font-size: 14px` (`style.css:739`) вызывает авто-зум в iOS Safari при фокусе.
- `.header-nav` скрыт <=640 (`style.css:1711`) без замены -> навигация недоступна.
- `.match-summary-stats` без `wrap`, `.stat-pill` `min-width:160px` (`style.css:1238-1253`) -> переполнение на 320px.
- `.matches-grid` вложенный скролл `max-height:340px` (`style.css:1328`) -> scroll-trap на телефоне.
- Нет `viewport-fit=cover` (`index.html:6`) и `env(safe-area-inset-*)`; Venti bubble `fixed` перекрывает thumb-зону (`style.css:1745-1762`).
- JS-эффекты курсора/aurora/magnetic уже отключены на coarse pointer (`app.js:1310,1460,1555`), но CSS-анимации `.cursor-aurora-blob` продолжают крутиться.

## Ordered implementation tasks

### 1. Foundation (meta, safe-area, tokens)
- [ ] `index.html:6`: viewport -> `width=device-width, initial-scale=1.0, viewport-fit=cover`.
- [ ] Добавить `<meta name="theme-color" content="#fcfcfc">` и `<meta name="color-scheme" content="light">`.
- [ ] `index.html`: подключить `mobile.css` после `motion.css`; подключить `mobile.js` (модуль) после `app.js`.
- [ ] В `mobile.css` завести токены: `--safe-top/right/bottom/left: env(safe-area-inset-*)`, `--touch-target: 44px`, `--tap-highlight: transparent`.
- [ ] `html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }`, `body { overscroll-behavior-y: none; }` (точечно).

### 2. Header + mobile drawer menu
- [ ] Добавить кнопку-гамбургер в `.header-actions` (`index.html:42`), видимую <=900, с `aria-expanded`, `aria-controls`, `aria-label`.
- [ ] Разметка drawer: `role="dialog"`, `aria-modal="true"`, ссылки из `.header-nav` + CTA «Начать выбор».
- [ ] `mobile.js`: open/close, backdrop, Esc, focus trap, возврат фокуса, `body` scroll-lock (с сохранением позиции).
- [ ] `mobile.css`: slide-in справа, safe-area, крупные tap-targets >=44px, анимация `translate`/`opacity`.
- [ ] Уменьшить высоту хедера на мобиле (~60px) + `padding-top: var(--safe-top)`.

### 3. Hero + quiz responsive
- [ ] Hero: `clamp()` для `.hero-title`/`.hero-subtitle`, уменьшить `padding` секции (`style.css:334`).
- [ ] `.interactive-panel`: padding 16px (<=480), 12px (<=360), меньший radius (`style.css:363`).
- [ ] `.quiz-tile` / `.quiz-option-row`: увеличить tap-area, убрать hover-only аффордансы, добавить `:active`.
- [ ] Все `.btn` в мобильном слое: `min-height: 48px`; primary-кнопки футеров квиза - full-width.
- [ ] `.input-box`: `font-size: 16px` (анти-зум), `inputmode="decimal"` для SAT/IELTS.
- [ ] Range slider: thumb 28px, track 10px, увеличенная зона захвата (`style.css:665-703`).
- [ ] SAT/IELTS: добавить кнопки-степперы `-/+` (одной рукой) с haptics.
- [ ] Убрать `-webkit-tap-highlight-color` на интерактивных элементах.

### 4. Gesture quiz navigation
- [ ] Установить `@use-gesture/vanilla`; новый `mobile.js` подключает `drag` на контейнер `#step-1-form` (или `.interactive-panel`).
- [ ] Свайп влево = следующий вопрос, вправо = предыдущий; только когда активен шаг 1..4; не на последнем -> переход в свайпер.
- [ ] Игнорировать жесты, начавшиеся на `input`, `.range-input`, `.preset-btn`, кнопках (проверка `event.target.closest`).
- [ ] Порог/velocity через `@use-gesture`, анимация смены шага согласована с `.quiz-screen` transitions.
- [ ] Обновлять `appState.currentQuizStep` через существующие `updateQuizUI()`/обработчики, не дублировать логику.

### 5. Swiper: фикс скролла + адаптивная сцена
- [ ] `motion.css:77`: `touch-action: pan-y` (вертикальный скролл страницы, горизонтальный свайп - наш).
- [ ] `app.js:1758` `onPointerMove`: определить ось; при вертикальном интенте не трансформировать карточку и не мешать скроллу.
- [ ] `.card-stage-container`: высота через `min(72dvh, 520px)` + fallback `vh`; учесть безопасные зоны (`style.css:845, 1702`).
- [ ] Карточка на узких экранах: уменьшить padding/шрифты, при переполнении `overflow-y:auto` + `-webkit-overflow-scrolling:touch`, не обрезать контент (`overflow:hidden` сейчас `style.css:877`).
- [ ] Проверить `.card-metrics-grid` на 320px (возможно 1 колонка), уменьшить `.chance-percent`.

### 6. Sticky bottom action bar + undo + haptics
- [ ] Разметка `#swiper-mobile-bar` (виден только на шаге 2 и только coarse pointer): Мимо | Undo | Хочу, с `padding-bottom: var(--safe-bottom)`.
- [ ] `mobile.css`: fixed bottom, blur/solid bg, крупные кнопки, `z-index` ниже drawer, выше контента.
- [ ] Скрыть/сдвинуть `.swiper-controls` и `.venti-bubble` на мобиле, чтобы не дублировать и не перекрывать bar.
- [ ] `app.js`: история свайпов (стек `{item, action}`); Undo возвращает карточку, откатывает `currentIndex` и `likedUniversities`, перерисовывает через `renderDeckDOM()`.
- [ ] Haptics: `navigator.vibrate(10)` на like/skip, `(25)` на undo; feature-detect, no-op на iOS.
- [ ] Одноразовый gesture-хинт (стрелки/подсказка) при первом входе в свайпер; скрыть после первого свайпа; флаг в `sessionStorage`.

### 7. Match screen
- [ ] `.match-summary-stats`: `flex-wrap` + `.stat-pill { flex:1; min-width:0 }` (`style.css:1238`).
- [ ] `.matches-grid`: `max-height:none` на мобиле, убрать вложенный скролл (`style.css:1328`).
- [ ] `.match-item-card`: на <=400px колонкой; `.match-item-meta` с переносом; проверить длинные названия вузов.
- [ ] Sticky bottom CTA (register) с safe-area, чтобы кнопка всегда достижима.
- [ ] `.btn-cta-main`: full-width, `min-height:52px`.

### 8. Snap carousels (features / stats)
- [ ] `mobile.css`: `.features-grid` и `.stats-grid` -> `display:flex; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none;` дети `flex:0 0 84%; scroll-snap-align:start;`.
- [ ] `scroll-padding-inline` под padding контейнера; скрыть скроллбар.
- [ ] Точки-индикаторы (опционально) или плавный `scroll-behavior`; учесть `.reveal` (IntersectionObserver уже сработает вертикально).
- [ ] Проверить, что `partner-box`, `finance-card-wrapper` не ломаются на узких экранах.

### 9. Venti bubble + performance
- [ ] На мобиле: `cursor-aurora { display:none }`, остановить анимации `.cursor-aurora-blob`.
- [ ] Header `backdrop-filter` уменьшить до `blur(10px)` или заменить на непрозрачный фон на мобиле.
- [ ] Venti bubble: поднять над sticky bar / уменьшить, убрать `venti-idle-drift` на мобиле.
- [ ] `@media (prefers-reduced-motion: reduce)` в `mobile.css`: отключить drift/aurora/pulse (CSS), не трогая JS-флаг десктопа.
- [ ] `content-visibility: auto` для секций ниже сгиба (опционально).

### 10. Accessibility
- [ ] Drawer: focus trap, `aria-modal`, возврат фокуса, `Esc`.
- [ ] `aria-label` для icon-only кнопок (гамбургер, undo, like/skip).
- [ ] Видимый `:focus-visible` для клавиатуры.
- [ ] Проверить контраст реакций Venti (зелёный/красный) и текста на плашках.
- [ ] Все интерактивные элементы >=44x44px.

## Risks & mitigations
- Свайп квиза конфликтует со слайдером/инпутами -> строгий игнор жестов на интерактивных элементах + direction lock.
- Изменение `touch-action` карточек ломает десктоп-drag -> проверить mouse-сценарий, `pan-y` не влияет на мышь.
- Rewrite движка карточек библиотекой рискован -> библиотеку применяем только к квизу, движок карточек правим точечно.
- Sticky bar + drawer + bubble конфликт по `z-index` -> задать явную шкалу `z-index` и проверить вложенность.
- Новая зависимость в Vite/Vercel -> проверить `npm ci` + `npm run build`; `@use-gesture/vanilla` без postinstall-скриптов.
- Вложенные скроллы -> минимизировать (match list), не создавать scroll-trap.

## Validation
- Ручное тестирование в эмуляторе на ширинах 320 / 360 / 390 / 414 и в landscape.
- iOS Safari: отсутствие авто-зума на инпутах, safe-area, скролл страницы поверх карточки, momentum-scroll каруселей.
- Android Chrome: haptics, свайпы, undo, drawer.
- `npm run build` и `npm run preview` без ошибок; проверить `dist`.
- Нет горизонтального переполнения (`document.scrollWidth <= innerWidth`).
- Lighthouse Mobile: цели Performance/Accessibility/Best-Practices >= 90.
- Сценарии: полный проход квиза свайпами, свайпер + undo + haptics, пустой результат, drawer, карусели.
- Регресс-чек десктопа: drag карточек мышью, hover-эффекты, cursor-field.

## Open questions
- Нужны ли точки-индикаторы у snap-каруселей или достаточно нативного скролла? (рекомендация: без точек, минимум).
- Показывать ли Venti bubble на мобиле вообще, или скрыть на шаге 2? (рекомендация: скрыть на шаге 2, показать на остальных).
