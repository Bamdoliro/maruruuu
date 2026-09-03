import { MENTORING_PROGRAM } from '@/constants/form/constants';
import { formAtom } from '@/stores';
import { useAtomValue } from 'jotai';
import { color } from '@maru/design-system';
import { CheckBox, Column, Row, Td, Text, Th } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useInput } from './MentoringProgramCalculator.hook';

const MentoringProgramCalculator = () => {
  const form = useAtomValue(formAtom);
  const { handleMentoringProgramChange } = useInput();

  return (
    <StyledMentoringProgramCalculator>
      <Text fontType="p3" color={color.red}>
        *멘토·멘티 프로그램 가산점은 자격증 가산점과 합산하여 최대 4점까지 인정됩니다.
      </Text>
      <Column>
        <Row>
          <Th borderTopLeftRadius={12} width="51%" height={56}>
            프로그램명
          </Th>
          <Th width="24.5%" height={56}>
            시행기관
          </Th>
          <Th width="14.7%" height={56}>
            반영점수
          </Th>
          <Th borderTopRightRadius={12} width="9.8%" height={56}>
            선택
          </Th>
        </Row>
        <Row>
          <Td borderBottomLeftRadius={12} width="51%" height={56}>
            {MENTORING_PROGRAM.name}
          </Td>
          <Td width="24.5%" height={56}>
            {MENTORING_PROGRAM.organization}
          </Td>
          <Td width="14.7%" height={56}>
            {MENTORING_PROGRAM.score}
          </Td>
          <Td borderBottomRightRadius={12} width="9.8%" height={56}>
            <CheckBox
              checked={form.grade.mentoringProgram}
              onChange={handleMentoringProgramChange}
            />
          </Td>
        </Row>
      </Column>
    </StyledMentoringProgramCalculator>
  );
};

export default MentoringProgramCalculator;

const StyledMentoringProgramCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  gap: 16px;
`;
