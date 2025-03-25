import { GenderRatioCount } from '@/types/analysis/client';
import { Column, Row, Td, Text, Th } from '@maru/ui';

interface TypeRatioTableProps {
  totalCounts: GenderRatioCount;
}
const TypeRatioTable = ({ totalCounts }: TypeRatioTableProps) => {
  const empty = '';

  return (
    <Column gap={24}>
      <Text fontType="H5">전형별 학생 성비</Text>
      <Column>
        <Row>
          <Th width={120} height={44} borderTopLeftRadius={12} styleType="ANALYSIS">
            {empty}
          </Th>
          <Th width={120} height={44} styleType="ANALYSIS">
            남학생
          </Th>
          <Th width={120} height={44} styleType="ANALYSIS" borderTopRightRadius={12}>
            여학생
          </Th>
        </Row>
        <Row>
          <Td width={120} height={44} styleType="ANALYSIS_SECONDARY">
            일반 전형
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.regularRatio.totalMale}
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.regularRatio.totalFemale}
          </Td>
        </Row>
        <Row>
          <Td width={120} height={44} styleType="ANALYSIS_SECONDARY">
            특별 전형
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.specialRatio.totalMale}
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.specialRatio.totalFemale}
          </Td>
        </Row>
        <Row>
          <Td width={120} height={44} styleType="ANALYSIS_SECONDARY">
            정원 외 전형
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.supernumeraryRatio.totalMale}
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.supernumeraryRatio.totalFemale}
          </Td>
        </Row>
        <Row>
          <Td
            width={120}
            height={44}
            styleType="ANALYSIS_SECONDARY"
            borderBottomLeftRadius={12}
          >
            전체 (정원 외 전형)
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS">
            {totalCounts.maleCount}
          </Td>
          <Td width={120} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            {totalCounts.femaleCount}
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default TypeRatioTable;
