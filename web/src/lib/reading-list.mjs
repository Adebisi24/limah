export function readList(storage, key) {
  try {
    const value = JSON.parse(storage.getItem(key) || '[]');
    return Array.isArray(value)
      ? value.filter((x) => typeof x === 'string')
      : [];
  } catch {
    return [];
  }
}
export function toggleItem(storage, key, id) {
  const list = readList(storage, key);
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  storage.setItem(key, JSON.stringify(next));
  return next.includes(id);
}
export function safeRetailerUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
