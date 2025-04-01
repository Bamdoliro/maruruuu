import { Column } from '@maru/ui';
import RegistrationTableHeader from './RegistrationTableHeader/RegistrationTableHeader';
import { useRegistrationListQuery } from '@/services/registration/queries';
import RegistrationTableItem from './RegistrationTableItem/RegistrationTableItem';

const RegistartonTable = () => {
  const { data: registrationList } = useRegistrationListQuery();

  return (
    <Column gap={12}>
      <RegistrationTableHeader />
      {registrationList?.map(({ examinationNumber, name, admissionAndPledgeUrl }) => (
        <RegistrationTableItem
          examinationNumber={examinationNumber}
          name={name}
          admissionAndPledgeUrl={admissionAndPledgeUrl}
        />
      ))}
    </Column>
  );
};

export default RegistartonTable;
