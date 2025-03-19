import { Column } from '@maru/ui';
import FairTableHeader from './FairTableHeader/FairTableHeader';
import FairTableItem from './FairTableItem/FairTableItem';
import { useFairDetailQuery } from '@/services/fair/queries';

interface FairTableProps {
  id: number;
}

const FairTable = ({ id }: FairTableProps) => {
  const { data: FairDetail } = useFairDetailQuery(id);
  const FairAttendeeList = FairDetail?.attendeeList;

  return (
    <Column gap={12}>
      <FairTableHeader />
      {FairAttendeeList?.map(
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
