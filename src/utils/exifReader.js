import exifr from 'exifr';

export const extractMetadata = async (file) => {
  try {
    // exifr automatically parses standard EXIF, GPS, etc.
    const data = await exifr.parse(file);
    return data || {};
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return {};
  }
};

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};