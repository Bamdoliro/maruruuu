import { color, font } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled, { css } from 'styled-components';
import { useDragAndDrop, useOpenFileUploader } from '@/hooks';
import { useCallback, useState } from 'react';
import SmartCrop from 'smartcrop';
import { useSetProfileStore } from '@/stores/form/profile';
import { Storage } from '@/apis/storage/storage';

const MIN_WIDTH = 113.4;
const MIN_HEIGHT = 151.2;
const MAX_SIZE = 2 * 1024 * 1024;

const ProfileUploader = () => {
  const setProfile = useSetProfileStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { openFileUploader, ref: imageUploaderRef } = useOpenFileUploader();

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
            alert('사진 크기가 작습니다.');
            setPreviewUrl(null);
            return;
          }
          const cropResult = await SmartCrop.crop(img, { width: 3, height: 4 });
          const crop = cropResult.topCrop;

          const canvas = document.createElement('canvas');
          canvas.width = crop.width;
          canvas.height = crop.height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            alert('이미지 편집을 지원하지 않는 브라우저입니다.');
            setPreviewUrl(null);
            return;
          }

          ctx.drawImage(
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
          const dataUrl = canvas.toDataURL('image/jpeg');
          setPreviewUrl(dataUrl);
          setProfile({
            fileName: file.name,
            mediaType: file.type,
            fileSize: file.size,
            file: file,
          });
          Storage.setItem('fileName', file.name);
          Storage.setItem('mediaType', file.type);
          Storage.setItem('fileSize', file.size.toString());
          Storage.setItem('upload', 'true');
        };
        img.onerror = () => {
          alert('이미지 파일을 읽을 수 없습니다.');
          setPreviewUrl(null);
        };
        img.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [setProfile]
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
        <ImagePreview src={previewUrl} alt="profile-image" />
      ) : (
        <UploadImageBox
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          $isDragging={isDragging}
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
      {previewUrl && (
        <Button size="SMALL" onClick={openFileUploader}>
          재업로드
        </Button>
      )}
      <Desc>
        2MB 이하, 3개월 이내의
        <br />
        3x4 cm 증명사진(.jpg, .png)
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
`;

const Desc = styled.p`
  ${font.p2};
  color: ${color.gray500};
  margin: 0 auto;
  text-align: center;
`;
