import { Column, Row, Td, Text, Th } from '@maru/ui';
import useScoreRatio from './RatioTable.hooks';
import type { ApplicantCountType } from '@/types/analysis/client';
import { EMPTY_VALUE } from '@/constants/common/constant';

type RatioTableProps = {
  formList: ApplicantCountType[] | undefined;
};

const RatioTable = ({ formList }: RatioTableProps) => {
  const {
    regularCount,
    specialAdmissionCount,
    otherCount,
    regularRatio,
    specialAdmissionRatio,
    otherRatio,
  } = useScoreRatio(formList);

  return (
    <Column gap={24}>
      <Text fontType="H5">전형별 지원자 수와 경쟁률</Text>
      <Column>
        <Row>
          <Th width={88} height={44} borderTopLeftRadius={12} styleType="ANALYSIS">
            {EMPTY_VALUE}
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
            {specialAdmissionCount}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {otherCount}
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
            {regularRatio} %
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {specialAdmissionRatio} %
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            {otherRatio} %
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default RatioTable;
