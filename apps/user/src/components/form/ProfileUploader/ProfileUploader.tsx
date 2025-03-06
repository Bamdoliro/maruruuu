import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled, { css } from 'styled-components';
import { Button, Column, Text } from '@maru/ui';

const ProfileUploader = () => {
  return (
    <StyledProfileUploader>
      <Text fontType="context" color={color.gray700}>
        증명사진
      </Text>
      <UploadImageBox onDrop={false} $isDragging={false} $isError={false}>
        <Column gap={12} alignItems="center">
          <Button size="SMALL" onClick={() => {}}>
            파일 선택
          </Button>
          <Text fontType="p2" color={color.gray500}>
            또는
          </Text>
          <Text fontType="p2" color={color.gray500}>
            여기로 사진을 끌어오세요
          </Text>
        </Column>
      </UploadImageBox>
      <Text fontType="p2" color={color.gray500} textAlign='center'>
        20MB 이하, 3개월 이내의
        <br />
        3x4 cm 증명사진
      </Text>
      <input
        type="file"
        ref={() => {}}
        accept=".png, .jpg, .jpeg"
        onChange={() => {}}
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

const UploadImageBox = styled.div<{ $isDragging: boolean; $isError: boolean }>`
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
