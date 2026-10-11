// Strips metadata by redrawing image pixels onto an HTML5 Canvas while maintaining original format
export const cleanImageMetadata = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    // Preserve exact MIME type, defaulting to image/jpeg if undetectable
    const mimeType = file.type || 'image/jpeg';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) {
            // Retain original filename structure
            const cleanFileName = `cleaned_${file.name}`;
            const cleanFile = new File([blob], cleanFileName, {
              type: mimeType,
              lastModified: Date.now(),
            });
            resolve(cleanFile);
          } else {
            reject(new Error("Failed to process image on Canvas."));
          }
        },
        mimeType,
        0.95 // Maintain maximum quality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Unable to load image for cleaning."));
    };
    
    img.src = url;
  });
};