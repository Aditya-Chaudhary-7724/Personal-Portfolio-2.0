// Arrow / Home / End navigation for an ARIA tablist with a roving tabindex.
// Tab ids must be `${idPrefix}${key}`.
export function handleTabKeys(event, keys, current, select, idPrefix) {
  const i = keys.indexOf(current);
  let next = null;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = keys[(i + 1) % keys.length];
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = keys[(i - 1 + keys.length) % keys.length];
  if (event.key === 'Home') next = keys[0];
  if (event.key === 'End') next = keys[keys.length - 1];
  if (next === null) return;
  event.preventDefault();
  select(next);
  document.getElementById(`${idPrefix}${next}`)?.focus();
}
