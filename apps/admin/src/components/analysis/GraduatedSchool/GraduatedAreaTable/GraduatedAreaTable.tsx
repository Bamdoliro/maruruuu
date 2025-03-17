import { Column } from '@maru/ui';
import GraduatedAreaTableHeader from './GraduatedAreaTableHeader/GraduatedAreaTableHeader';
import GraduatedAreaTableItem from './GraduatedAreaTableItem/GraduatedAreaTableItem';

const GraduatedAreaTable = () => {
  const noticeList = [
    { id: 1, title: '공지사항 1', school: '2025-03-17', location: '부산' },
    { id: 2, title: '공지사항 2', school: '2025-03-17', location: '부산' },
    { id: 3, title: '공지사항 3', school: '2025-03-17', location: '부산' },
  ];

  return (
    <Column gap={12}>
      <GraduatedAreaTableHeader />
      {noticeList
        .sort((a, b) => a.id - b.id)
        .map(({ id, title, school, location }) => (
          <GraduatedAreaTableItem
            id={id}
            title={title}
            school={school}
            location={location}
          />
        ))}
    </Column>
  );
};

export default GraduatedAreaTable;
