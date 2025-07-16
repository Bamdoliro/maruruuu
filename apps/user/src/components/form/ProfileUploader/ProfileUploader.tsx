import { color, font } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled, { css } from 'styled-components';
import ProfileUploadLoader from '../ProfileUploadLoader/ProfileUploadLoader';
import { useProfileUploader } from './ProfileUploader.hook';
import { useDragAndDrop, useOpenFileUploader } from '@/hooks';

type ProfileUploaderProps = {
  isError?: boolean;
};

const ProfileUploader = ({ isError }: ProfileUploaderProps) => {
  const { imgSrc, isUploading, handleImageFileChange } = useProfileUploader();
  const { openFileUploader, ref: imageUploaderRef } = useOpenFileUploader();
  const { isDragging, onDragOver, onDragLeave, onDrop, onDragEnter } = useDragAndDrop(
    () => handleImageFileChange
  );

  return (
    <StyledProfileUploader>
      <Text fontType="context" color={color.gray700}>
        증명사진
      </Text>
      {isUploading ? (
        <ProfileUploadLoader isOpen={true} />
      ) : (
        <>
          {imgSrc ? (
            <ImagePreview src={imgSrc} alt="profile-image" />
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
          {imgSrc && (
            <Button size="SMALL" onClick={openFileUploader}>
              재업로드
            </Button>
          )}
          <Desc>
            2MB 이하, 3개월 이내의
            <br />
            3x4 cm 증명사진(.jpg, .png)
          </Desc>
        </>
      )}
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
