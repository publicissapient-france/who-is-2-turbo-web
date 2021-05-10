import {isBrowser} from './common';
import {User} from '../components/Gallery/Gallery';

const GALLERY_PAGE_KEY = `galleryPage`;

export const saveGalleryPage = (users: User[]) => isBrowser() && window.localStorage.setItem(GALLERY_PAGE_KEY, JSON.stringify(users));
export const clearGalleryPage = () => isBrowser() && window.localStorage.removeItem(GALLERY_PAGE_KEY);
export const getGalleryPage = () => isBrowser() && JSON.parse(window.localStorage.getItem(GALLERY_PAGE_KEY) || '[]');
