import { Column, Row, Td, Text, Th } from '@maru/ui';

interface AreaGenderRatioTableProps {
  title: string;
}

const AreaGenderRatioTable = ({ title }: AreaGenderRatioTableProps) => {
  const empty = '';

  return (
    <Column gap={24}>
      <Text fontType="H5">{title}</Text>
      <Column>
        <Row>
          <Th width={88} height={44} borderTopLeftRadius={12} styleType="ANALYSIS">
            {empty}
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS">
            남학생
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS">
            여학생
          </Th>
          <Th width={80} height={44} styleType="ANALYSIS" borderTopRightRadius={12}>
            합계
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
            37
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            37
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
            37
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            37
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
          <Td width={240} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            0
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default AreaGenderRatioTable;
