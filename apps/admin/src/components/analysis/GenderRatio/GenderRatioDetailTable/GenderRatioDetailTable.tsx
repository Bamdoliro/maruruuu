import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import AreaGenderRatioContent from '../AreaGenderRatioContent/AreaGenderRatioContent';
import TypeRatioTable from './TypeRatioTable/TypeRatioTable';
import type {
  FormTypeMainCategory,
  GenderRatioCount,
  GenderRatioType,
} from '@/types/analysis/client';

interface GenderRatioDetailTableProps {
  onDataUpdate: (newData: FormTypeMainCategory) => void;
  formList?: GenderRatioType[] | undefined;
  totalCounts: GenderRatioCount;
}

const GenderRatioDetailTable: React.FC<GenderRatioDetailTableProps> = ({
  onDataUpdate,
  formList,
  totalCounts,
}) => {
  const handleDataChange = (newData: FormTypeMainCategory) => {
    onDataUpdate(newData);
  };

  return (
    <Row gap={120}>
      <CountInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="H4">전체 남학생 지원 인원</Text>
              <Text fontType="D2">{totalCounts?.maleCount} 명</Text>
            </Column>
            <Column>
              <Text fontType="H4">전체 여학생 지원 인원</Text>
              <Text fontType="D2">{totalCounts?.femaleCount} 명</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <TypeRatioTable totalCounts={totalCounts} />
        </Column>
      </CountInfoWrapper>
      <AreaGenderRatioContent onDataUpdate={handleDataChange} formList={formList} />
    </Row>
  );
};

export default GenderRatioDetailTable;

const CountInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
  gap: 80px;
`;
