// Ported from includes/functions.php's flash()/get_flash(), which stashed a
// one-time message in $_SESSION for the next page load. Client-side there's
// no full page reload, so this is a tiny pub-sub the PageLayout subscribes to.
let listener = null;

export function flash(message, type = 'success') {
  if (listener) listener({ message, type });
}

export function onFlash(fn) {
  listener = fn;
  return () => { if (listener === fn) listener = null; };
}
