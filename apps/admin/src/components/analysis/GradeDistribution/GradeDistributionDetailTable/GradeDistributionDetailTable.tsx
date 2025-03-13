import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import DetailContent from '../../common/DetailContent';
import ScoreTable from './ScoreTable';

const GradeDistributionDetailTable = () => {
  return (
    <Row gap={120}>
      <ScoreInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="btn2">최고점 점수</Text>
              <Text fontType="D2">{121} 점</Text>
            </Column>
            <Column>
              <Text fontType="btn2">최하점 점수</Text>
              <Text fontType="D2">{121} 점</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <ScoreTable />
        </Column>
      </ScoreInfoWrapper>
      <DetailContent />
    </Row>
  );
};

export default GradeDistributionDetailTable;

const ScoreInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
