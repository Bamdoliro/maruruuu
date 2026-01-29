import { color } from '@maru/design-system';
import { IconArrowOutward } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const GuidelineBox = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_ADMISSION_GUIDELINES || '/';
  const handleMoveGuidelinePdf = () => {
    router.push(url);
  };

  return (
    <StyledGuidelineBox onClick={handleMoveGuidelinePdf}>
      <Row gap={8} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          입학 전형 요강
        </Text>
        <IconArrowOutward width={36} height={36} color={color.maruDefault} />
      </Row>
      <Text fontType="p2" color={color.gray500}>
        클릭해서 입학 전형 요강을 확인하세요
      </Text>
    </StyledGuidelineBox>
  );
};

export default GuidelineBox;

const StyledGuidelineBox = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 384px;
  height: 180px;
  padding: 28px 32px;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  cursor: pointer;
`;
