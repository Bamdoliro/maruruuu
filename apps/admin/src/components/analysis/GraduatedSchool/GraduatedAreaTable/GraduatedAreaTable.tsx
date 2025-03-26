import { Column } from '@maru/ui';
import GraduatedAreaTableHeader from './GraduatedAreaTableHeader/GraduatedAreaTableHeader';
import GraduatedAreaTableItem from './GraduatedAreaTableItem/GraduatedAreaTableItem';
import { GraduatedSchoolStatus } from '@/types/analysis/client';

interface GraduatedAreaTableProps {
  formList: GraduatedSchoolStatus[] | undefined;
}

const GraduatedAreaTable = ({ formList }: GraduatedAreaTableProps) => {
  return (
    <Column gap={12}>
      <GraduatedAreaTableHeader />
      {formList?.map((item, index) => (
        <GraduatedAreaTableItem
          key={index + 1}
          id={index + 1}
          applicantName={item.applicantName}
          schoolName={item.schoolName}
          schoolAddress={item.schoolAddress}
        />
      ))}
    </Column>
  );
};

export default GraduatedAreaTable;
