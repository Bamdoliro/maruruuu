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
        .map((item) => (
          <NoticeTableItem id={item.id} title={item.title} updatedAt={item.updatedAt} />
        ))}
    </Column>
  );
};

export default NoticeTable;
