import { Column } from '@maru/ui';
import FaqTableHeader from './FaqTableHeader/FaqTableHeader';
import FaqTableItem from './FaqTableItem/FaqTableItem';
import type { Faq } from '@/types/faq/client';

interface FaqTableProps {
  faqList: Faq[];
}

const FaqTable = ({ faqList }: FaqTableProps) => {
  return (
    <Column gap={12}>
      <FaqTableHeader />
      {faqList.map(({ id, title, category, createdAt }) => (
        <FaqTableItem
          key={id}
          id={id}
          title={title}
          category={category}
          createdAt={createdAt}
        />
      ))}
    </Column>
  );
};

export default FaqTable;
