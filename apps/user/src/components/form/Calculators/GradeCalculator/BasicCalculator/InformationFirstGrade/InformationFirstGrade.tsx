import { color, font } from '@maru/design-system';
import { Dropdown, RadioGroup } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useInformationFirstGrade } from './InformationFirstGrade.hook';

interface InformationFirstGradeProps {
  achievementLevels: string[];
}

const SEMESTERS = [
  { key: 'achievementLevel11', label: '1학기' },
  { key: 'achievementLevel12', label: '2학기' },
] as const;

const HAS_FIRST_GRADE_ITEMS = [
  { label: '있음', value: 'EXISTS' },
  { label: '이수한 학기 없음', value: 'NONE' },
];

const InformationFirstGrade = ({ achievementLevels }: InformationFirstGradeProps) => {
  const {
    hasFirstGrade,
    isOpen,
    informationSubject,
    handleHasFirstGradeChange,
    handleAchievementLevelChange,
  } = useInformationFirstGrade();

  const getDisplayValue = (achievementLevel?: string) => {
    if (achievementLevel === 'F') return '미이수';
    return achievementLevel ?? '-';
  };

  return (
    <StyledInformationFirstGrade>
      <RadioGroup
        label={
          <>
            <Title>정보 교과 1학년 성적</Title>
            <SubTitle>
              정보 교과 가중치 산출에만 반영됩니다. 1학년에 정보 교과를 이수한 경우에만
              입력해주세요.
            </SubTitle>
          </>
        }
        name="hasInformationFirstGrade"
        value={hasFirstGrade}
        onChange={handleHasFirstGradeChange}
        items={HAS_FIRST_GRADE_ITEMS}
      />
      {isOpen && (
        <Semesters>
          {SEMESTERS.map(({ key, label }) => (
            <Semester key={key}>
              <SemesterLabel>{label}</SemesterLabel>
              <Dropdown
                value={getDisplayValue(informationSubject?.[key])}
                size="SMALL"
                data={achievementLevels}
                width={96}
                name={key}
                onChange={handleAchievementLevelChange}
              />
            </Semester>
          ))}
        </Semesters>
      )}
    </StyledInformationFirstGrade>
  );
};

export default InformationFirstGrade;

const StyledInformationFirstGrade = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 16px;
  width: 100%;
  padding: 20px 24px;
  background-color: ${color.gray50};
  border: 1px solid ${color.gray300};
  border-radius: 12px;
`;

const Title = styled.span`
  display: block;
  color: ${color.gray900};
  ${font.H6}
`;

const SubTitle = styled.span`
  display: block;
  margin-top: 4px;
  color: ${color.gray600};
  ${font.p3}
`;

const Semesters = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 24px;
`;

const Semester = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 8px;
`;

const SemesterLabel = styled.p`
  color: ${color.gray700};
  ${font.p2}
`;
