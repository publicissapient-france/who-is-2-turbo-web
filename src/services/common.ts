export const isBrowser = () => typeof window !== 'undefined';

export const preloadImage = async (picture: string, data: object[], index: number, callback: () => void) => {
  return await new Promise<void>((resolve, reject) => {
    const img = new Image();

    img.src = picture;
    img.onload = () => {
      resolve();

      if (data.length -1 === index) {
        callback();
      }
    };
  });
}
