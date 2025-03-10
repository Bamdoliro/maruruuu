import { useState, useMemo, useCallback, useEffect } from 'react';
import SmartCrop from 'smartcrop';
import { Storage } from '@/apis/storage/storage';
import {
  useUploadProfileImageMutation,
  useRefreshProfileImageMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { bitmapToBlob } from '@/utils';

export const useProfileUploader = (
  onPhotoUpload: (success: boolean, url?: string) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: formStatusData } = useFormStatusQuery();
  const { mutate: uploadProfileImage } = useUploadProfileImageMutation();
  const { mutate: refreshProfileImage } = useRefreshProfileImageMutation();

  const isUploadPictureStored = useMemo(
    () => Storage.getItem('isUploadPicture') === 'true',
    []
  );

  const handleUploadSuccess = useCallback(
    (downloadUrl: string | null) => {
      if (!downloadUrl) {
        setIsUploading(false);
        return;
      }

      onPhotoUpload(true, downloadUrl);
      setImageSrc(downloadUrl);
      Storage.setItem('downloadUrl', downloadUrl);
      Storage.setItem('isUploadPicture', 'true');
      setIsUploading(false);
    },
    [onPhotoUpload]
  );

  const startUploading = useCallback(
    (file: File) => {
      setIsUploading(true);
      uploadProfileImage(file, {
        onSuccess: (data: unknown) => {
          const downloadUrl = typeof data === 'string' ? data : null;
          handleUploadSuccess(downloadUrl);
        },
        onError: () => {
          setIsUploading(false);
          onPhotoUpload(false);
        },
      });
    },
    [uploadProfileImage, handleUploadSuccess, onPhotoUpload]
  );

  const cropImage = useCallback(
    (file: File) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const cropResult = await SmartCrop.crop(img, { width: 117, height: 156 });
        const { x, y, width, height } = cropResult.topCrop;

        const bitmap = await createImageBitmap(img, x, y, width, height);
        const croppedBlob = await bitmapToBlob(bitmap);
        const croppedFile = new File([croppedBlob], 'cropped-image.jpg', {
          type: 'image/jpeg',
        });

        startUploading(croppedFile);
      };
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

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) processImageFile(file);
      setIsDragging(false);
    },
    [processImageFile]
  );

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processImageFile(file);
    },
    [processImageFile]
  );

  useEffect(() => {
    if (
      (!isUploadPictureStored && !isUploading) ||
      formStatusData?.status === 'REJECTED'
    ) {
      refreshProfileImage(undefined, {
        onSuccess: (newDownloadUrl) => handleUploadSuccess(newDownloadUrl),
        onError: () => onPhotoUpload(false),
      });
    } else {
      const storedImageUrl = Storage.getItem('downloadUrl');
      if (storedImageUrl) setImageSrc(storedImageUrl);
      refreshProfileImage(undefined, {
        onSuccess: (newDownloadUrl) => handleUploadSuccess(newDownloadUrl),
        onError: () => onPhotoUpload(false),
      });
    }
  }, [
    isUploadPictureStored,
    refreshProfileImage,
    handleUploadSuccess,
    onPhotoUpload,
    isUploading,
    formStatusData?.status,
  ]);

  return {
    imageSrc,
    isUploading,
    isDragging,
    setIsDragging,
    onDrop,
    handleImageFileChange,
  };
};
