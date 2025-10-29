# turbo-debug

A lightweight JavaScript library to visually debug [Turbo Frames](https://turbo.hotwired.dev/) on your web pages. It marks visible frames with a red dashed border and shows their `id` and `src` for quick inspection.

---

## Features

* Highlights all visible `<turbo-frame>` elements.
* Shows frame `id` and `src` using a small overlay.
* Automatically updates when frames are added, removed, or loaded dynamically.
* Non-intrusive: only sets `position: relative` on frames that are statically positioned.
* Supports automatic enabling on page load.

---

## Installation

### Using npm

```bash
npm install turbo-debug
```

### Using CDN

```html
<script type="module" src="https://unpkg.com/turbo-debug@x.y.z/dist/turbo-debug-auto.min.js"></script>
```

This will automatically enable turbo-debug on page load. Replace x.y.z with the latest version found in the releases.

---

## Usage

### Manually Enable

```js
import { enableTurboDebug } from 'turbo-debug';

// enable debugging on demand
enableTurboDebug();
```

### Automatic Enable (on page load)

```js
import 'turbo-debug/auto';
```

This will automatically enable turbo-debug once the DOM is ready.

---

## API

### `enableTurboDebug()`

Highlights all visible turbo frames and starts observing DOM changes and frame loads.

### `disableTurboDebug()`

Removes highlights and stops observing changes.

---

## Behavior

* Frames already positioned `absolute` or `fixed` will **not** have their position overridden.
* Observes the DOM using `MutationObserver` and throttles updates to prevent performance issues.
* Supports dynamic addition/removal of frames.

---

## Development

### Build

```bash
npm run build
```

This generates both minified and unminified builds in the `dist` folder:

* `dist/turbo-debug.js` – unminified
* `dist/turbo-debug.min.js` – minified
* `dist/turbo-debug-auto.js` – auto-enable variant

### Tests

```bash
npm test
```

### Watch mode

```bash
npm run watch
```

---

## License

MIT © 2025 Ricardo van Hoepen
