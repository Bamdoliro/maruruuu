import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import DetailContent from '../ApplicantCount/ApplicantCountDetailTable/Competition/DetailContent/common/DetailContent';
import ScoreTable from '../GradeDistribution/GradeDistributionDetailTable/ScoreTable/ScoreTable';
import RatioTable from './RatioTable/RatioTable';

const ApplicationTypeRatio = () => {
  return (
    <StyledApplicationTypeRatio>
      <Row gap={40}>
        <RatioInfoWrapper>
          <Column>
            <Column gap={40}>
              <Column>
                <Text fontType="btn2">일반 전형 지원 비율</Text>
                <Text fontType="D2">{121} %</Text>
              </Column>
              <Column>
                <Text fontType="btn2">특별 전형 지원 비율</Text>
                <Text fontType="D2">1.89 : 1 %</Text>
              </Column>
            </Column>
          </Column>
          <Column justifyContent="space-between">
            <RatioTable />
          </Column>
        </RatioInfoWrapper>
        {/* <DetailContent formList={formList} /> */}
      </Row>
    </StyledApplicationTypeRatio>
  );
};

export default ApplicationTypeRatio;

const StyledApplicationTypeRatio = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  padding-top: 60px;
`;

const RatioInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
