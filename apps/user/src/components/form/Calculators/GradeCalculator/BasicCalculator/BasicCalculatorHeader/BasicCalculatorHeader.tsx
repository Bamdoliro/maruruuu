import { Column, Row, Th } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

const GradeCalculatorHeader = () => {
  return (
    <StyledGradeCalculatorHeader>
      <Th borderTopLeftRadius={12} height={150} width="25%">
        과목
      </Th>
      <Column width="75%">
        <Th width="100%" height={50} borderTopRightRadius={12}>
          성취수준
        </Th>
        <Row>
          <Th width="66.6%" height={50}>
            2학년
          </Th>
          <Th width="33.3%" height={50}>
            3학년
          </Th>
        </Row>
        <Row>
          <Th styleType="SECONDARY" width="33.3%" height={50}>
            1학기
          </Th>
          <Th styleType="SECONDARY" width="33.3%" height={50}>
            2학기
          </Th>
          <Th styleType="SECONDARY" width="33.3%" height={50}>
            1학기
          </Th>
        </Row>
      </Column>
    </StyledGradeCalculatorHeader>
  );
};

export default GradeCalculatorHeader;

const StyledGradeCalculatorHeader = styled.div`
  ${flex({ flexDirection: 'row', alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
