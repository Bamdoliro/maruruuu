import { SubDropdown } from '@maru/ui';
import { DROPDOWN_DATA } from '@/constants/message/constant';

// TODO: SubDropdown 컴포넌트 사용 시 디자인/퍼블리싱 이슈 있음
// - 현재: 직접 구현한 버전에서 패키지 컴포넌트로 변경
// - 확인 필요: 호버 시 사이드 메뉴 표시 방식, 스타일링

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
