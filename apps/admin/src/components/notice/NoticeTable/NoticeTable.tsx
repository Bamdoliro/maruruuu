import { Column } from '@maru/ui';
import NoticeTableHeader from './NoticeTableHeader/NoticeTableHeader';
import NoticeTableItem from './NoticeTableItem/NoticeTableItem';

const tempData = [
  { id: 1, title: '공지사항 제목 1', updatedAt: '2025-03-07' },
  { id: 2, title: '공지사항 제목 2', updatedAt: '2025-03-06' },
  { id: 3, title: '공지사항 제목 3', updatedAt: '2025-03-05' },
];

const NoticeTable = () => {
  return (
    <Column gap={12}>
      <NoticeTableHeader />
      {tempData.map((item) => (
        <NoticeTableItem id={item.id} title={item.title} updatedAt={item.updatedAt} />
      ))}
    </Column>
  );
};

export default NoticeTable;
