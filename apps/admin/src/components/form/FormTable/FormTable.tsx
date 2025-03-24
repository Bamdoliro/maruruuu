import { Column } from '@maru/ui';

import FormTableHeader from './FormTableHeader/FormTableHeader';
import FormTableItem from './FormTableItem/FormTableItem';

const fromList = [
  {
    id: 1,
    examinationNumber: 1001,
    name: '이민준',
    birthday: '2007-09-19',
    graduationType: 'EXPECTED',
    school: '재송중학교',
    status: 'SUBMITTED',
    type: 'REGULAR',
    isChangedToRegular: false,
    totalScore: null,
    hasDocument: false,
    firstRoundPassed: null,
    secondRoundPassed: null,
  },
];

const FormTable = () => {
  return (
    <Column gap={12}>
      <FormTableHeader />
      {fromList &&
        fromList.map((item) => (
          <FormTableItem
            id={item.id}
            examinationNumber={item.examinationNumber}
            name={item.name}
            graduationType={item.graduationType}
            school={item.school}
            status={item.status}
            type={item.type}
            isChangedToRegular={item.isChangedToRegular}
            totalScore={item.totalScore}
            firstRoundPassed={item.firstRoundPassed}
            secondRoundPassed={item.secondRoundPassed}
          />
        ))}
    </Column>
  );
};

export default FormTable;
