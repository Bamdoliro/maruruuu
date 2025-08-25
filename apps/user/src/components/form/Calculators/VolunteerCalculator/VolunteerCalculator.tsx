import { useFormValueStore } from '@/stores';
import { color, font } from '@maru/design-system';
import { CellInput, Column, Row, Td, Text, Th } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useInput } from './VolunteerCalculator.hook';
import { SCHEDULE } from '@/constants/form/constants';
import { formatYear } from '@/utils';

const VolunteerCalculator = () => {
  const form = useFormValueStore();
  const { handleVolunteerTimeChange } = useInput();

  const isReadOnly = form.education.graduationType === 'QUALIFICATION_EXAMINATION';
  const scoreEndYear = formatYear(SCHEDULE.원서_접수);
  const volunteerData = [
    { grade: '1학년', name: 'volunteerTime1', value: form.grade.volunteerTime1 },
    { grade: '2학년', name: 'volunteerTime2', value: form.grade.volunteerTime2 },
    { grade: '3학년', name: 'volunteerTime3', value: form.grade.volunteerTime3 },
  ];

  return (
    <StyledVolunteerCalculator>
      <Text fontType="p3" color={color.red}>
        *{scoreEndYear}.09.30까지의 봉사시간을 기재해주세요. 졸업생은 졸업일 기준으로
        기재해주세요.
      </Text>
      <Column>
        <Row>
          <Th borderTopLeftRadius={12} width="20%" height={56}>
            학년
          </Th>
          <Th borderTopRightRadius={12} width="80%" height={56}>
            봉사시간
          </Th>
        </Row>
        {volunteerData.map(({ grade, name, value }, index) => (
          <Row key={name}>
            <Td
              width="20%"
              height={56}
              styleType="SECONDARY"
              borderBottomLeftRadius={index === volunteerData.length - 1 ? 12 : 0}
            >
              {grade}
            </Td>
            <Td
              width="80%"
              height={56}
              borderBottomRightRadius={index === volunteerData.length - 1 ? 12 : 0}
            >
              <CellInput
                name={name}
                onChange={handleVolunteerTimeChange}
                value={value}
                isError={Number(value) < 0}
                readOnly={isReadOnly}
              />
              <Hour>시간</Hour>
            </Td>
          </Row>
        ))}
      </Column>
    </StyledVolunteerCalculator>
  );
};

export default VolunteerCalculator;

const StyledVolunteerCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  gap: 16px;
`;

const Hour = styled.p`
  ${font.p2}
  color: ${color.gray900};
  margin-left: 8px;
`;
