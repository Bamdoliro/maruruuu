import { TableItem } from '@/components/common';
import { FAQ_CATEGORY } from '@/constants/faq/constant';
import type { FaqCategory } from '@/types/faq/client';
import { Row, Text } from '@maru/ui';

interface FaqTableItemProps {
  id: number;
  title: string;
  category: FaqCategory;
  createdAt: string;
}

const FaqTableItem = ({ id, title, category, createdAt }: FaqTableItemProps) => {
  return (
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
      <Text fontType="p2" width={100} ellipsis>
        {createdAt}
      </Text>
    </TableItem>
  );
};

export default FaqTableItem;
