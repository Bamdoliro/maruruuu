import { useState, useMemo, useCallback, useEffect } from 'react';
import SmartCrop from 'smartcrop';
import { Storage } from '@/apis/storage/storage';
import {
  useUploadProfileImageMutation,
  useRefreshProfileImageMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { bitmapToBlob } from '@/utils';
import { toast } from 'react-toastify';

export const useProfileUploader = (
  onPhotoUpload: (success: boolean, url?: string) => void
) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { data } = useFormStatusQuery();
  const { mutate: upload } = useUploadProfileImageMutation();
  const { mutate: refresh } = useRefreshProfileImageMutation();

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
      setImgSrc(downloadUrl);
      Storage.setItem('isUploadPicture', 'true');
      setIsUploading(false);
    },
    [onPhotoUpload]
  );

  const startUploading = useCallback(
    (file: File) => {
      setIsUploading(true);
      upload(file, {
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
    [upload, handleUploadSuccess, onPhotoUpload]
  );

  const cropImage = useCallback(
    (file: File) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        try {
          const cropResult = await SmartCrop.crop(img, { width: 117, height: 156 });
          const { x, y, width, height } = cropResult.topCrop;

          const bitmap = await createImageBitmap(img, x, y, width, height);
          const croppedBlob = await bitmapToBlob(bitmap);
          const croppedFile = new File([croppedBlob], `profile.png`, {
            type: 'image/png',
          });

          startUploading(croppedFile);
        } finally {
          URL.revokeObjectURL(img.src);
        }
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

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          toast('파일 용량은 2MB 이하로 업로드 해주세요.', { type: 'error' });
          return;
        }

        if (!file.name || file.name.length > 20) {
          toast('파일 이름은 비어 있을 수 없고, 20자 이하이어야 합니다.', {
            type: 'error',
          });
          return;
        }

        processImageFile(file);
      }
    },
    [processImageFile]
  );

  const refreshProfileImage = useCallback(() => {
    const fileName = Storage.getItem('fileName');
    const mediaType = Storage.getItem('mediaType');
    const fileSize = Storage.getItem('fileSize');
    const storedImageUrl = Storage.getItem('downloadUrl');

    const isValidStoredFile =
      Boolean(fileName) && Boolean(mediaType) && Boolean(fileSize);
    const handleRefreshImage = () => {
      refresh(undefined, {
        onSuccess: (newDownloadUrl) => handleUploadSuccess(newDownloadUrl),
        onError: () => onPhotoUpload(false),
      });
    };

    if (storedImageUrl) {
      setImgSrc(storedImageUrl);
    }

    if (!isValidStoredFile) {
      return;
    }

    if ((!isUploadPictureStored && !isUploading) || data?.status === 'REJECTED') {
      handleRefreshImage();
    }
  }, [
    isUploadPictureStored,
    isUploading,
    data?.status,
    refresh,
    handleUploadSuccess,
    onPhotoUpload,
  ]);

  useEffect(() => {
    refreshProfileImage();
  }, [refreshProfileImage]);

  return { imgSrc, isUploading, handleImageFileChange };
};
