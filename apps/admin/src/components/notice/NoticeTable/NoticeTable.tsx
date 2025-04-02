import { Column } from '@maru/ui';
import NoticeTableHeader from './NoticeTableHeader/NoticeTableHeader';
import NoticeTableItem from './NoticeTableItem/NoticeTableItem';
import { Notice } from '@/types/notice/client';

interface Props {
  noticeList: Notice[];
}

const NoticeTable = ({ noticeList }: Props) => {
  return (
    <Column gap={12}>
      <NoticeTableHeader />
      {noticeList.map(({ id, title, updatedAt }) => (
        <NoticeTableItem key={id} id={id} title={title} updatedAt={updatedAt} />
      ))}
    </Column>
  );
};

export default NoticeTable;
