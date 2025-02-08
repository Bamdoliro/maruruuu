import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconArrowOutward } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const ApplicationBox = () => {
  const date = '7월 8일, 8월 26일, 9월 16일, 10월 4일';
  const place = '본교 SRC관 1층';
  const router = useRouter();

  return (
    <StyledApplicationBox
      onClick={() => {
        router.push(ROUTES.FAIR);
      }}
    >
      <Row gap={8} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          입학전형 설명회 신청
        </Text>
        <IconArrowOutward width={36} height={36} color={color.maruDefault} />
      </Row>
      <Text fontType="p2" color={color.gray500}>
        일시: {date} <br />
        장소: {place}
      </Text>
    </StyledApplicationBox>
  );
};

export default ApplicationBox;

const StyledApplicationBox = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 384px;
  height: 180px;
  padding: 28px 32px;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  cursor: pointer;
`;
