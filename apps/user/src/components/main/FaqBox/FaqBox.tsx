import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconArrowRight } from '@maru/icon';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import styled from 'styled-components';
import FaqBoxList from './FaqBoxList/FaqBoxList';

const FaqBox = () => {
  return (
    <StyledFaqBox>
      <DirectLink href={ROUTES.FAQ}>
        <Text fontType="H3" color={color.gray900}>
          자주묻는 질문
        </Text>
        <IconArrowRight width={22} height={22} color={color.gray900} />
      </DirectLink>
      <FaqBoxList />
    </StyledFaqBox>
  );
};

export default FaqBox;

const StyledFaqBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 596px;
  height: 100%;
  gap: 16px;
  position: relative;
`;

const DirectLink = styled(Link)`
  ${flex({ alignItems: 'center' })}
  gap: 8px;
`;
