import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconArrowRight } from '@maru/icon';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import styled from '@emotion/styled';
import NoticeBoxList from './NoticeBoxList/NoticeBoxList';

const NoticeBox = () => {
  return (
    <StyledNoticeBox>
      <DirectLink href={ROUTES.NOTICE}>
        <Text fontType="H3" color={color.gray900}>
          공지사항
        </Text>
        <IconArrowRight width={22} height={22} color={color.gray900} />
      </DirectLink>
      <NoticeBoxList />
    </StyledNoticeBox>
  );
};

export default NoticeBox;

const StyledNoticeBox = styled.div`
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
