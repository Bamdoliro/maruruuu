const bitmapToBlob = (bitmap: ImageBitmap): Promise<Blob> => {
  return new Promise((resolve) => {
    const offscreenCanvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = offscreenCanvas.getContext('2d');
    ctx?.drawImage(bitmap, 0, 0);
    offscreenCanvas.convertToBlob({ type: 'image/png' }).then(resolve);
  });
};

export default bitmapToBlob;
