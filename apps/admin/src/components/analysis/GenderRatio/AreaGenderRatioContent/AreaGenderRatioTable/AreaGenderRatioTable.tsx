import { GenderRatioType } from '@/types/analysis/client';
import { Column, Row, Td, Text, Th } from '@maru/ui';
import useCalculateGenderRatio from './AreaGenderRatioTable.hooks';

interface AreaGenderRatioTableProps {
  title: string;
  formList: GenderRatioType[] | undefined;
}

const AreaGenderRatioTable = ({ title, formList }: AreaGenderRatioTableProps) => {
  const empty = '';

  const {
    busanMaleTotal,
    busanFemaleTotal,
    otherLocationMaleTotal,
    otherLocationFemaleTotal,
    total,
  } = useCalculateGenderRatio(formList);

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
            부산 지역
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {busanMaleTotal}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {busanFemaleTotal}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {busanMaleTotal + busanFemaleTotal}
          </Td>
        </Row>
        <Row>
          <Td width={88} height={44} styleType="ANALYSIS_SECONDARY">
            타 지역
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {otherLocationMaleTotal}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {otherLocationFemaleTotal}
          </Td>
          <Td width={80} height={44} styleType="ANALYSIS">
            {otherLocationMaleTotal + otherLocationFemaleTotal}
          </Td>
        </Row>
        <Row>
          <Td
            width={88}
            height={44}
            styleType="ANALYSIS_SECONDARY"
            borderBottomLeftRadius={12}
          >
            지역합계
          </Td>
          <Td width={240} height={44} styleType="ANALYSIS" borderBottomRightRadius={12}>
            {total}
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default AreaGenderRatioTable;
