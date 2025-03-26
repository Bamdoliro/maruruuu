import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import ScoreTable from './ScoreTable/ScoreTable';
import { GradeDistributionType } from '@/types/analysis/client';
import DetailContent from './DetailContent/DetailContent';
import useMaxMin from './GradeDistributionDetailTable.hooks';

type DetailTableProps = { formList: GradeDistributionType[] | undefined };

const GradeDistributionDetailTable = ({ formList }: DetailTableProps) => {
  const { max, min } = useMaxMin(formList);

  return (
    <Row gap={60}>
      <ScoreInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="btn2">최고점 점수</Text>
              <Text fontType="D2">{max} 점</Text>
            </Column>
            <Column>
              <Text fontType="btn2">최하점 점수</Text>
              <Text fontType="D2">{min} 점</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <ScoreTable formList={formList} />
        </Column>
      </ScoreInfoWrapper>
      <DetailContent formList={formList} />
    </Row>
  );
};

export default GradeDistributionDetailTable;

const ScoreInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
