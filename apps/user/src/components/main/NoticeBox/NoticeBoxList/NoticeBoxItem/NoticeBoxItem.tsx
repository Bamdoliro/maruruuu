import { ROUTES } from '@/constants/common/constants';
import { color, font } from '@maru/design-system';
import { IconFaq } from '@maru/icon';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

interface NoticeBoxItemProps {
  title: string;
  id: number;
}

const NoticeBoxItem = ({ title, id }: NoticeBoxItemProps) => {
  const router = useRouter();

  const handleMoveNoticeDetail = () => {
    router.push(`${ROUTES.NOTICE}/${id}`);
  };

  return (
    <StyledNoticeBoxItem onClick={handleMoveNoticeDetail}>
      <Title>{title}</Title>
    </StyledNoticeBoxItem>
  );
};

export default NoticeBoxItem;

const StyledNoticeBoxItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 64px;
  padding: 0px 4px;
  border-bottom: 1px solid ${color.gray300};
  cursor: pointer;
`;

const Title = styled.a`
  ${font.p1}
  color: ${color.gray750};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
