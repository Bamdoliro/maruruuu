import { TableItem } from '@/components/common';
import { formatPhoneNumber } from '@/utils';
import { Row, Text, TextButton } from '@maru/ui';
import FairQuestionModal from '../FairQuestionModal/FairQuestionModal';
import { useOverlay } from '@toss/use-overlay';

interface FairTableItemProps {
  schoolName: string;
  name: string;
  type: string;
  phoneNumber: string;
  headcount: number;
  question: string;
}

const FairTableItem = ({
  schoolName,
  name,
  type,
  phoneNumber,
  headcount,
  question,
}: FairTableItemProps) => {
  const overlay = useOverlay();

  const handleFairQuestionModalButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <FairQuestionModal
        name={name}
        question={question}
        isOpen={isOpen}
        onClose={close}
      />
    ));
  };

  return (
    <TableItem>
      <Row gap={48}>
        <Text fontType="p2" width={60}>
          {name}
        </Text>
        <Text fontType="p2" width={60}>
          {headcount}
        </Text>
        <Text fontType="p2" width={60}>
          {type}
        </Text>
        <Text fontType="p2" width={293}>
          {schoolName}
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={120}>
          {formatPhoneNumber(phoneNumber)}
        </Text>
        <TextButton
          fontType="p2"
          width={120}
          ellipsis={true}
          onClick={handleFairQuestionModalButtonClick}
        >
          {question}
        </TextButton>
      </Row>
    </TableItem>
  );
};

export default FairTableItem;
