import { SubDropdown } from '@maru/ui';

// TODO: SubDropdown 컴포넌트 사용 시 디자인/퍼블리싱 이슈 있음
// - 현재: 직접 구현한 버전에서 패키지 컴포넌트로 변경
// - 확인 필요: 호버 시 사이드 메뉴 표시 방식, 스타일링

interface RecipientDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const DROPDOWN_DATA = [
  { value: 'FINAL_SUBMITTED', label: '최종 제출된 원서' },
  { value: 'RECEIVED', label: '원서 승인 완료자' },
  { value: 'REJECTED', label: '원서 반려자' },
  {
    value: 'FIRST_PASSED',
    label: '1차 합격자',
    children: [
      { value: 'MEISTER_TALENT', label: '마이스터인재전형' },
      { value: 'REGULAR', label: '일반전형' },
      { value: 'FIRST_PASSED', label: '전체 1차 합격자' },
    ],
  },
  { value: 'PASSED', label: '최종 합격자' },
];

const RecipientDropdown = ({ value, onChange }: RecipientDropdownProps) => {
  const handleChange = (value: string, _: string) => {
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
