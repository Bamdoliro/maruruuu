import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconArrowRight } from '@maru/icon';
import { Column, Text } from '@maru/ui';
import { flex, formatCreatedAt } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

interface NoticeItemProps {
  id: number;
  title: string;
  updatedAt: string;
}

const NoticeItem = ({ id, title, updatedAt }: NoticeItemProps) => {
  const router = useRouter();

  const handleMoveDetailNoticePAge = () => {
    router.push(`${ROUTES.NOTICE}/${id}`);
  };

  return (
    <StyledNoticeItem onClick={handleMoveDetailNoticePAge}>
      <Column gap={12}>
        <Text fontType="H5" color={color.gray900}>
          {title}
        </Text>
        <Text fontType="p3" color={color.gray750}>
          {formatCreatedAt(updatedAt)}
        </Text>
      </Column>
      <IconArrowRight color={color.gray600} width={24} height={24} />
    </StyledNoticeItem>
  );
};

export default NoticeItem;

const StyledNoticeItem = styled.div`
  ${flex({ justifyContent: 'space-between' })}
  width: 100%;
  height: 75px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 16px;
  cursor: pointer;
`;
