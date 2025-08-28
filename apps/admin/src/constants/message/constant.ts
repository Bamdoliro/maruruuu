export const DROPDOWN_DATA = [
  { value: 'APPROVED', label: '원서 승인 완료자' },
  { value: 'REJECTED', label: '원서 반려자' },
  {
    value: 'FIRST_PASSED',
    label: '1차 합격자',
    children: [
      { value: 'MEISTER_TALENT', label: '마이스터인재전형' },
      { value: 'REGULAR', label: '마이스터 제외 합격자' },
      { value: 'FIRST_PASSED', label: '전체 1차 합격자' },
    ],
  },
  { value: 'PASSED', label: '최종 합격자' },
];

export const MESSAGE_STATUS_VALUES = ['APPROVED', 'REJECTED', 'FIRST_PASSED', 'PASSED'];
