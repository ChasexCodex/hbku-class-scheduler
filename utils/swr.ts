export const localStorageProvider = <K, V>() => {
  if (typeof window === 'undefined') return new Map<K, V>();

  const map = new Map<K, V>(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  return map;
};
