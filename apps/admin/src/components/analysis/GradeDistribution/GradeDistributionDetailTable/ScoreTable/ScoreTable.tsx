import { Column, Row, Td, Text, Th } from '@maru/ui';

const ScoreTable = () => {
  const empty = '';

  return (
    <Column gap={24}>
      <Text fontType="H5">모든 전형의 점수와 평균</Text>
      <Column>
        <Row>
          <Th width={88} height={44} borderTopLeftRadius={12} styleType="ANALYSIS">
            {empty}
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS">
            일반 전형
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS" borderTopRightRadius={12}>
            특별 전형
          </Th>
        </Row>
        <Row>
          <Td width={88} height={44} styleType="ANALYSIS_SECONDARY">
            최고 점수
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            37
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            59
          </Td>
        </Row>
        <Row>
          <Td width={88} height={44} styleType="ANALYSIS_SECONDARY">
            최하 점수
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            37
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            59
          </Td>
        </Row>
        <Row>
          <Td
            width={88}
            height={44}
            styleType="ANALYSIS_SECONDARY"
            borderBottomLeftRadius={12}
          >
            평균
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            103.31
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            0
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default ScoreTable;
