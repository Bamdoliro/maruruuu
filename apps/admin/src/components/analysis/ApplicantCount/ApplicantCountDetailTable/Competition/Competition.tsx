import { ApplicantCount } from '@/types/analysis/client';
import { Column, Row, Td, Th, Text } from '@maru/ui';
import useCompetiton from './Competition.hooks';

type DetailTableProps = { formList: ApplicantCount[] | undefined };

const Competition = ({ formList }: DetailTableProps) => {
  const empty = '';
  const {
    regularCount,
    specialCount,
    theOtherCount,
    regularCompetitionRate,
    specialCompetitionRate,
    theOtherCompetitionRate,
  } = useCompetiton(formList);

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
            {regularCount}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {specialCount}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {theOtherCount}
          </Td>
        </Row>
        <Row>
          <Td
            width={88}
            height={44}
            styleType="ANALYSIS_SECONDARY"
            borderBottomLeftRadius={12}
          >
            경쟁률
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {regularCompetitionRate}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {specialCompetitionRate}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            {theOtherCompetitionRate}
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default Competition;
