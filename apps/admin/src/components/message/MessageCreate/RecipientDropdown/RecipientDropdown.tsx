import { SubDropdown } from '@maru/ui';
import { DROPDOWN_DATA } from '@/constants/message/constant';

interface RecipientDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const RecipientDropdown = ({ value, onChange }: RecipientDropdownProps) => {
  const getLabelByValue = (value: string) => {
    const item = DROPDOWN_DATA.find((item) => {
      if (item.children) {
        return item.children.some((child) => child.value === value);
      }
      return item.value === value;
    });

    if (!item) return value;

    if (item.children) {
      const child = item.children.find((child) => child.value === value);
      return child?.label || value;
    }

    return item.label;
  };

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <SubDropdown
      data={DROPDOWN_DATA}
      value={value ? getLabelByValue(value) : ''}
      onChange={handleChange}
      name="recipient"
      placeholder="받는 사람"
      width={200}
      size="SMALL"
    />
  );
};

export default RecipientDropdown;
