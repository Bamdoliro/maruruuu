export interface EntrollmentDocumentPresignedUrlData {
  uploadUrl: string;
  downloadUrl: string;
  fields: {
    [key: string]: string | Blob;
  };
}
