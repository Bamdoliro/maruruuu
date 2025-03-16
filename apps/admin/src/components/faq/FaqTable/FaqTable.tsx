import { Column } from '@maru/ui';
import FaqTableHeader from './FaqTableHeader/FaqTableHeader';
import FaqTableItem from './FaqTableItem/FaqTableItem';
import { useFaqListQuery } from '@/services/faq/queries';
import { ExtendedFaqCategory } from '@/types/faq/client';

interface FaqTableProps {
  selectedCategory: ExtendedFaqCategory;
}

const FaqTable = ({ selectedCategory }: FaqTableProps) => {
  const { data: faqList } = useFaqListQuery();

  const filteredFaqList =
    selectedCategory === 'ALL_FAQS'
      ? faqList
      : faqList?.filter((item) => selectedCategory === item.category);

  return (
    <Column gap={12}>
      <FaqTableHeader />
      {filteredFaqList?.map(({ id, title, category, createdAt }) => (
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
