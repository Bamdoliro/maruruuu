import { SubDropdown } from '@maru/ui';
import { DROPDOWN_DATA } from '@/constants/message/constant';

interface RecipientDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const RecipientDropdown = ({ value, onChange }: RecipientDropdownProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <SubDropdown
      data={DROPDOWN_DATA}
      value={value}
      onChange={handleChange}
      name="recipient"
      placeholder="받는 사람"
      width={200}
      size="SMALL"
    />
  );
};

export default RecipientDropdown;
