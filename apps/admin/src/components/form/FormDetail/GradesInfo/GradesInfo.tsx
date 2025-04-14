import { SideMenu } from '@/components/common';
import { GRADES_FIELDS } from '@/constants/form/constant';
import { Column } from '@maru/ui';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';

const GradesInfo = () => {
  const [currentGradeField, setCurrentGradeField] = useState('교과 성적');

  return (
    <StyledGradesInfo>
      <Column gap={10}>
        {GRADES_FIELDS.map((gradeField) => (
          <SideMenu
            key={gradeField}
            isActive={currentGradeField === gradeField}
            onClick={() => setCurrentGradeField(gradeField)}
          >
            {gradeField}
          </SideMenu>
        ))}
      </Column>
      <SwitchCase value={currentGradeField} caseBy={{}} />
    </StyledGradesInfo>
  );
};
export default GradesInfo;

const StyledGradesInfo = styled.div`
  display: flex;
  gap: 48px;
  width: 100%;
  padding: 48px 0;
`;
