import { Column } from '@maru/ui';
import NoticeTableHeader from './FaqTableHeader/FaqTableHeader';
import NoticeTableItem from './FaqTableItem/FaqTableItem';
import { useFaqListQuery } from '@/services/faq/queries';
import { FaqCategory } from '@/types/faq/client';

interface NoticeTableProps {
  selectedCategory: FaqCategory;
}

const NoticeTable = ({ selectedCategory }: NoticeTableProps) => {
  const { data: faqList } = useFaqListQuery();

  const filteredFaqList =
    selectedCategory === 'ALL_FAQS'
      ? faqList
      : faqList?.filter((item) => selectedCategory === item.category);

  return (
    <Column gap={12}>
      <NoticeTableHeader />
      {filteredFaqList
        ?.sort((a, b) => a.id - b.id)
        .map(({ id, title, category, createdAt }) => (
          <NoticeTableItem
            id={id}
            title={title}
            category={category}
            createdAt={createdAt}
          />
        ))}
    </Column>
  );
};

export default NoticeTable;
