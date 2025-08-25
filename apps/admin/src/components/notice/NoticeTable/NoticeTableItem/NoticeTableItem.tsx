import { TableItem } from '@/components/common';
import { ROUTES } from '@/constants/common/constant';
import { formatDate } from '@/utils';
import { Row, Text } from '@maru/ui';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

interface NoticeTableItemProps {
  id: number;
  title: string;
  updatedAt: string;
}

const NoticeTableItem = ({ id, title, updatedAt }: NoticeTableItemProps) => {
  const router = useRouter();
  const handleMoveNoticeDetailPage = () => {
    router.push(`${ROUTES.NOTICE}/${id}`);
  };

  return (
    <DirectButton onClick={handleMoveNoticeDetailPage}>
      <TableItem key={id}>
        <Row gap={48}>
          <Text fontType="p2" width={50}>
            {id}
          </Text>
          <Text fontType="p2" width={540} ellipsis>
            {title}
          </Text>
        </Row>
        <Text fontType="p2" width={100}>
          {formatDate.toDotDate(updatedAt)}
        </Text>
      </TableItem>
    </DirectButton>
  );
};

export default NoticeTableItem;

const DirectButton = styled.button`
  text-align: start;
  cursor: pointer;
`;
