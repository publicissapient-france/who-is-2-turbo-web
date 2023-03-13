export const isBrowser = () => typeof window !== 'undefined';

export const preloadImage = async (picture: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = picture;
    img.onload = resolve;
  });
}
