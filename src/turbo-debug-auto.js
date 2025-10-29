import { enableTurboDebug } from "./turbo-debug";

// automatically enable when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enableTurboDebug);
} else {
  enableTurboDebug();
}
