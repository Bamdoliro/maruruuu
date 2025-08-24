import { color, font } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled, { css } from 'styled-components';
import { useDragAndDrop, useOpenFileUploader } from '@/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import SmartCrop from 'smartcrop';
import { useProfileStore } from '@/stores/form/profile';
import { Storage } from '@/apis/storage/storage';
import {
  useRefreshProfileMutation,
  useUploadProfileMutation,
} from '@/services/form/mutations';
import { useFormProfileValueStore } from '@/stores/form/formProfile';

const MIN_WIDTH = 113.4;
const MIN_HEIGHT = 151.2;
const MAX_SIZE = 2 * 1024 * 1024;

interface ProfileUploaderProps {
  isError?: boolean;
}

const ProfileUploader = ({ isError = false }: ProfileUploaderProps) => {
  const [profile, setProfile] = useProfileStore();
  const profileUrl = useFormProfileValueStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { openFileUploader, ref: imageUploaderRef } = useOpenFileUploader();

  const fileName = Storage.getItem('fileName');
  const mediaType = Storage.getItem('mediaType');
  const fileSize = Storage.getItem('fileSize');

  const { refreshProfileMutate } = useRefreshProfileMutation({
    fileName: fileName ?? '',
    mediaType: mediaType ?? '',
    fileSize: Number(fileSize),
  });

  const { uploadProfileMutate } = useUploadProfileMutation(
    {
      fileName: profile.fileName ?? '',
      mediaType: profile.mediaType ?? '',
      fileSize: profile.fileSize ?? 0,
    },
    profile.file ?? null
  );

  const mountedRef = useRef(false);

  useEffect(() => {
    const upload = Storage.getItem('upload');
    if (mountedRef.current) return;
    mountedRef.current = true;

    if (upload === 'true') {
      refreshProfileMutate();
    }

    return;
  }, [refreshProfileMutate]);

  const handleFile = useCallback(
    async (file: File) => {
      if (file.size > MAX_SIZE) {
        alert('파일 용량이 2MB를 초과했습니다.');
        setPreviewUrl(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = async (ev) => {
        const img = new window.Image();
        img.onload = async () => {
          if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
            alert('사진 크기가 너무 작습니다.');
            setPreviewUrl(null);
            return;
          }

          const cropResult = await SmartCrop.crop(img, { width: 3, height: 4 });
          const crop = cropResult.topCrop;

          const cropCanvas = document.createElement('canvas');
          cropCanvas.width = crop.width;
          cropCanvas.height = crop.height;

          const cropCtx = cropCanvas.getContext('2d');
          if (!cropCtx) {
            alert('이미지 편집을 지원하지 않는 브라우저입니다.');
            setPreviewUrl(null);
            return;
          }

          cropCtx.drawImage(
            img,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height
          );

          const TARGET_WIDTH = 117;
          const TARGET_HEIGHT = 156;
          const outputCanvas = document.createElement('canvas');
          outputCanvas.width = TARGET_WIDTH;
          outputCanvas.height = TARGET_HEIGHT;

          const outputCtx = outputCanvas.getContext('2d');
          if (!outputCtx) {
            alert('이미지 편집을 지원하지 않는 브라우저입니다.');
            setPreviewUrl(null);
            return;
          }

          outputCtx.imageSmoothingEnabled = true;
          outputCtx.imageSmoothingQuality = 'high';
          outputCtx.drawImage(
            cropCanvas,
            0,
            0,
            crop.width,
            crop.height,
            0,
            0,
            TARGET_WIDTH,
            TARGET_HEIGHT
          );

          const dataUrl = outputCanvas.toDataURL('image/jpeg', 1.0);
          setPreviewUrl(dataUrl);

          outputCanvas.toBlob((blob) => {
            if (!blob) {
              alert('이미지 처리 실패');
              return;
            }

            const croppedFile = new File([blob], file.name, {
              type: 'image/jpeg',
            });

            setProfile({
              fileName: croppedFile.name,
              mediaType: croppedFile.type,
              fileSize: croppedFile.size,
              file: croppedFile,
            });

            Storage.setItem('fileName', croppedFile.name);
            Storage.setItem('mediaType', croppedFile.type);
            Storage.setItem('fileSize', croppedFile.size.toString());
            Storage.setItem('upload', 'true');

            uploadProfileMutate();
          }, 'image/jpeg');
        };

        img.onerror = () => {
          alert('이미지 파일을 불러올 수 없습니다.');
          setPreviewUrl(null);
        };

        img.src = ev.target?.result as string;
      };

      reader.readAsDataURL(file);
    },
    [setProfile, uploadProfileMutate]
  );

  const { isDragging, onDragOver, onDragLeave, onDrop, onDragEnter } =
    useDragAndDrop(handleFile);

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      handleFile(file);
    },
    [handleFile]
  );

  return (
    <StyledProfileUploader>
      <Text fontType="context" color={color.gray700}>
        증명사진
      </Text>
      {previewUrl ? (
        <ImagePreview src={previewUrl} alt="preview-image" />
      ) : profileUrl?.downloadUrl ? (
        <ImagePreview src={profileUrl.downloadUrl} alt="profile-image" />
      ) : (
        <UploadImageBox
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          $isDragging={isDragging}
          $isError={isError}
        >
          <Column gap={12} alignItems="center">
            <Button size="SMALL" onClick={openFileUploader}>
              파일 선택
            </Button>
            <Text fontType="p2" color={color.gray500}>
              또는 여기로 사진을 끌어오세요
            </Text>
          </Column>
        </UploadImageBox>
      )}
      {(previewUrl || profileUrl?.downloadUrl) && (
        <Button size="SMALL" onClick={openFileUploader}>
          재업로드
        </Button>
      )}
      <Desc>
        2MB 이하, 3개월 이내의
        <br />
        3x4 cm 증명사진 (.jpg, .png)
      </Desc>
      <input
        type="file"
        ref={imageUploaderRef}
        accept=".png, .jpg, .jpeg"
        onChange={handleImageFileChange}
        hidden
      />
    </StyledProfileUploader>
  );
};

export default ProfileUploader;

const StyledProfileUploader = styled.div`
  ${flex({ flexDirection: 'column' })};
  gap: 8px;
`;

const UploadImageBox = styled.div<{ $isDragging: boolean; $isError?: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })};
  width: 225px;
  height: 300px;
  border-radius: 6px;
  border: 1px dashed
    ${(props) =>
      props.$isDragging ? color.maruDefault : props.$isError ? color.red : color.gray400};
  background-color: ${color.gray50};
  ${(props) =>
    props.$isError &&
    css`
      outline: 3px solid rgba(244, 67, 54, 0.25);
    `}
`;

const ImagePreview = styled.img`
  width: 225px;
  height: 300px;
  border-radius: 6px;
  object-fit: cover;
`;

const Desc = styled.p`
  ${font.p2};
  color: ${color.gray500};
  margin: 0 auto;
  text-align: center;
`;
