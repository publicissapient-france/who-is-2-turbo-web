export const isBrowser = () => typeof window !== 'undefined';

export const capitalize = (s: String) => s && s[0].toUpperCase() + s.slice(1).toLowerCase();
