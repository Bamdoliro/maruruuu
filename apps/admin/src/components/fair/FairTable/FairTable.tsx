import { Column } from '@maru/ui';
import FairTableHeader from './FairTableHeader/FairTableHeader';
import FairTableItem from './FairTableItem/FairTableItem';

const fairList = [
  {
    schoolName: '비전중학교',
    name: '곰밤돌',
    type: '학생',
    phoneNumber: '01028610200',
    headcount: 2,
    question: '내신 커트라인 몇인가요?',
  },
  {
    schoolName: '비전중학교',
    name: '곰밤돌',
    type: '학생',
    phoneNumber: '01030050921',
    headcount: 2,
    question: '내신 커트라인 몇인가요?',
  },
  {
    schoolName: '비전중학교',
    name: '곰밤돌',
    type: '학생',
    phoneNumber: '01049463364',
    headcount: 2,
    question: '내신 커트라인 몇인가요?',
  },
];

const FairTable = () => {
  return (
    <Column gap={12}>
      <FairTableHeader />
      {fairList.map(
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
