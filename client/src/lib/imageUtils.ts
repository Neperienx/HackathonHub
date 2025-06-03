export const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 600, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to base64 with compression
      const base64 = canvas.toDataURL('image/jpeg', quality);
      
      // Check if the base64 string is too large (Firestore has ~1MB document limit)
      if (base64.length > 500000) { // ~500KB limit to be safe
        // Try with lower quality
        if (quality > 0.3) {
          resizeImage(file, maxWidth * 0.8, maxHeight * 0.8, quality - 0.2)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error('Image too large even after compression'));
        }
      } else {
        resolve(base64);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB original file limit
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};