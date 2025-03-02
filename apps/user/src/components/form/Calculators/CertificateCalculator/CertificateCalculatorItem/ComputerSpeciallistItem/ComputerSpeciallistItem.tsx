import { useFormValueStore } from '@/stores';
import { Certificate } from '@/types/form/client';
import { CheckBox, Column, Row, Td } from '@maru/ui';

interface ComputerSpeciallistItemProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LEVEL_LIST: { name: string; value: Certificate }[] = [
  { name: '1급(3점)', value: 'COMPUTER_SPECIALIST_LEVEL_1' },
  { name: '2급(2점)', value: 'COMPUTER_SPECIALIST_LEVEL_2' },
  { name: '3급(1점)', value: 'COMPUTER_SPECIALIST_LEVEL_3' },
];

const ComputerSpeciallistItem = ({ onChange }: ComputerSpeciallistItemProps) => {
  const form = useFormValueStore();

  return (
    <Row>
      <Td borderBottomLeftRadius={12} width="51%" height={168}>
        컴퓨터활용능력
      </Td>
      <Td width="24.5%" height={168}>
        한국산업인력공단
      </Td>
      <Column width="24.5%">
        {LEVEL_LIST.map((item, key) => (
          <Row>
            <Td width="60%" height={56}>
              {item.name}
            </Td>
            <Td borderBottomRightRadius={12} width="40%" height={56}>
              <CheckBox
                checked={form.grade.certificateList?.includes(item.value)}
                value={item.value}
                onChange={onChange}
              />
            </Td>
          </Row>
        ))}
      </Column>
    </Row>
  );
};

export default ComputerSpeciallistItem;
