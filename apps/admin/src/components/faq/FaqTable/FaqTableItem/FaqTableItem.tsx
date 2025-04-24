import { TableItem } from '@/components/common';
import { ROUTES } from '@/constants/common/constant';
import { FAQ_CATEGORY } from '@/constants/faq/constant';
import type { FaqCategory } from '@/types/faq/client';
import { formatDate } from '@/utils';
import { Row, Text } from '@maru/ui';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

interface FaqTableItemProps {
  id: number;
  title: string;
  category: FaqCategory;
  createdAt: string;
}

const FaqTableItem = ({ id, title, category, createdAt }: FaqTableItemProps) => {
  const router = useRouter();
  const handleMoveFaqDetailPage = () => {
    router.push(`${ROUTES.FAQ}/${id}`);
  };

  return (
    <DirectButton onClick={handleMoveFaqDetailPage}>
      <TableItem key={id}>
        <Row gap={60}>
          <Row gap={48}>
            <Text fontType="p2" width={50} ellipsis>
              {id}
            </Text>
            <Text fontType="p2" width={400} ellipsis>
              {title}
            </Text>
          </Row>
          <Text fontType="p2" width={120} ellipsis>
            {FAQ_CATEGORY[category]}
          </Text>
        </Row>
        <Text fontType="p2" width={100}>
          {formatDate.toDotDate(createdAt)}
        </Text>
      </TableItem>
    </DirectButton>
  );
};

export default FaqTableItem;

const DirectButton = styled.button`
  text-align: start;
  cursor: pointer;
`;
