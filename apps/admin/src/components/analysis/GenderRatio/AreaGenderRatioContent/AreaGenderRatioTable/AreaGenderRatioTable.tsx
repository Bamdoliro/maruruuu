import { GenderRatioType } from '@/types/analysis/client';
import { Column, Row, Td, Text, Th } from '@maru/ui';

interface AreaGenderRatioTableProps {
  title: string;
  formList: GenderRatioType[] | undefined;
}

const AreaGenderRatioTable = ({ title, formList }: AreaGenderRatioTableProps) => {
  const empty = '';

  const data = formList || [];

  const calculateTotals = (data: GenderRatioType[]) => {
    const busanMaleTotal = data.reduce((acc, item) => acc + item.busanMale, 0);
    const busanFemaleTotal = data.reduce((acc, item) => acc + item.busanFemale, 0);
    const otherLocationMaleTotal = data.reduce(
      (acc, item) => acc + item.otherLocationMale,
      0
    );
    const otherLocationFemaleTotal = data.reduce(
      (acc, item) => acc + item.otherLocationFemale,
      0
    );

    const totalMale = busanMaleTotal + otherLocationMaleTotal;
    const totalFemale = busanFemaleTotal + otherLocationFemaleTotal;
    const total = totalMale + totalFemale;

    return {
      busanMaleTotal,
      busanFemaleTotal,
      otherLocationMaleTotal,
      otherLocationFemaleTotal,
      totalMale,
      totalFemale,
      total,
    };
  };

  const {
    busanMaleTotal,
    busanFemaleTotal,
    otherLocationMaleTotal,
    otherLocationFemaleTotal,
    totalMale,
    totalFemale,
    total,
  } = calculateTotals(data);

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
