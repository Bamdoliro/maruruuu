import { Column } from '@maru/ui';
import NoticeTableHeader from './NoticeTableHeader/NoticeTableHeader';
import NoticeTableItem from './NoticeTableItem/NoticeTableItem';
import { useNoticeListQuery } from '@/services/notice/queries';

const NoticeTable = () => {
  const { data: noticeList } = useNoticeListQuery();

  return (
    <Column gap={12}>
      <NoticeTableHeader />
      {noticeList
        ?.sort((a, b) => a.id - b.id)
        .map(({ id, title, updatedAt }) => (
          <NoticeTableItem id={id} title={title} updatedAt={updatedAt} />
        ))}
    </Column>
  );
};

export default NoticeTable;
