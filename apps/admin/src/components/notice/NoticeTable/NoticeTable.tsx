import { Column } from '@maru/ui';
import NoticeTableHeader from './NoticeTableHeader/NoticeTableHeader';
import NoticeTableItem from './NoticeTableItem/NoticeTableItem';
import { useNoticeListQuery } from '@/services/notice/queries';

interface Props {
  debouncedNoticeTitle: string;
}

const NoticeTable = ({ debouncedNoticeTitle }: Props) => {
  const { data: noticeList } = useNoticeListQuery();

  const filteredNoticeList = noticeList?.filter((notice) =>
    (notice.title ?? '').toLowerCase().includes(debouncedNoticeTitle.toLowerCase())
  );

  return (
    <Column gap={12}>
      <NoticeTableHeader />
      {filteredNoticeList?.map(({ id, title, updatedAt }) => (
        <NoticeTableItem id={id} title={title} updatedAt={updatedAt} />
      ))}
    </Column>
  );
};

export default NoticeTable;
