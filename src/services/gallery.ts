import { isBrowser } from './common';
import { User } from '../components/Gallery/GalleryPage';

export const saveGalleryPage = (offset: number, limit: number, users: User[]) => isBrowser() && window.localStorage.setItem(`galleryPage:${offset}:${limit}`, JSON.stringify(users));
export const clearGalleryPage = (offset: number, limit: number) => isBrowser() && window.localStorage.removeItem(`galleryPage:${offset}:${limit}`);
export const getGalleryPage = (offset: number, limit: number) => isBrowser() && JSON.parse(window.localStorage.getItem(`galleryPage:${offset}:${limit}`) || '[]');
