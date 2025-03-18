/**
 * It's not recommended to use spaces in S3 key names due to potential
 * issues with URL encoding and compatibility across different systems.
 * Thus replace spaces in filename with underscores, get presignedUrl
 * using the modified fileName, and then upload it to S3.
 */
export function sanitizeFileName(file: File) {
  const sanitizedFileName = file.name.replace(/\s+/g, '_');
  const newFile = new File([file], sanitizedFileName, { type: file.type });
  return newFile;
}
