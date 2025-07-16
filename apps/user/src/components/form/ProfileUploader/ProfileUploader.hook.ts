import { useState, useCallback } from 'react';

export const useProfileUploader = () => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const startUploading = useCallback(() => {
    setIsUploading(true);
  }, []);

  const cropImage = useCallback(
    (file: File) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        startUploading();
      };
      URL.revokeObjectURL(img.src);
    },
    [startUploading]
  );

  const processImageFile = useCallback(
    (file: File) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < 117 || img.height < 156) {
          alert('사진 크기가 너무 작습니다.');
        } else {
          cropImage(file);
        }
      };
    },
    [cropImage]
  );

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert('2MB 이하의 파일을 업로드 해주세요.');
          return;
        }

        if (!file.name || file.name.length > 20) {
          alert('파일 이름은 비어 있을 수 없고, 20자 이하이어야 합니다.');
          return;
        }

        processImageFile(file);
      }
    },
    [processImageFile]
  );

  return { imgSrc, isUploading, handleImageFileChange };
};
