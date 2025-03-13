import { Column, Row, Td, Text, Th } from '@maru/ui';

const RatioTable = () => {
  const empty = '';

  return (
    <Column gap={24}>
      <Text fontType="H5">전형별 지원자 수와 경쟁률</Text>
      <Column>
        <Row>
          <Th width={88} height={44} borderTopLeftRadius={12} styleType="ANALYSIS">
            {empty}
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS">
            일반 전형
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS">
            특별 전형
          </Th>
          <Th width={80} height={44} borderTopRightRadius={12} styleType="ANALYSIS">
            정원 외 전형
          </Th>
        </Row>
        <Row>
          <Td width={88} height={44} styleType="ANALYSIS_SECONDARY">
            지원자 수
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            37
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            59
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            0
          </Td>
        </Row>
        <Row>
          <Td
            width={88}
            height={44}
            styleType="ANALYSIS_SECONDARY"
            borderBottomLeftRadius={12}
          >
            지원 비율
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            103.31
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            59
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            0
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default RatioTable;
