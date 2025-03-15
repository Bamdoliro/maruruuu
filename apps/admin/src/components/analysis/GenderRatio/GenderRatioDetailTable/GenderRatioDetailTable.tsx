import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import AreaGenderRatioContent from '../AreaGenderRatioContent/AreaGenderRatioContent';
import TypeRatioTable from './TypeRatioTable';

const GenderRatioDetailTable = () => {
  return (
    <Row gap={120}>
      <CountInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="H4">최고점 점수</Text>
              <Text fontType="D2">{121} 점</Text>
            </Column>
            <Column>
              <Text fontType="H4">최하점 점수</Text>
              <Text fontType="D2">{121} 점</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <TypeRatioTable />
        </Column>
      </CountInfoWrapper>
      <AreaGenderRatioContent />
    </Row>
  );
};

export default GenderRatioDetailTable;

const CountInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
  gap: 80px;
`;
