import { LEVEL_LIST } from '@/constants/form/data';
import { useFormValueStore } from '@/stores';
import { CheckBox, Column, Row, Td } from '@maru/ui';

interface ComputerSpeciallistItemProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
