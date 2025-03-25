import { Column } from '@maru/ui';
import FairTableHeader from './FairTableHeader/FairTableHeader';
import FairTableItem from './FairTableItem/FairTableItem';
import { AttendeeData } from '@/types/fair/client';

interface FairTableProps {
  dataList: AttendeeData[];
}

const FairTable = ({ dataList }: FairTableProps) => {
  return (
    <Column gap={12}>
      <FairTableHeader />
      {dataList?.map(
        ({ schoolName, name, type, phoneNumber, headcount, question }, index) => (
          <FairTableItem
            key={index}
            schoolName={schoolName}
            name={name}
            type={type}
            phoneNumber={phoneNumber}
            headcount={headcount}
            question={question}
          />
        )
      )}
    </Column>
  );
};

export default FairTable;
