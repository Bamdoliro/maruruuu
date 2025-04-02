import { Column, Row, Text } from '@maru/ui';
import DetailContent from './DetailContent/DetailContent';
import RatioTable from './RatioTable/RatioTable';
import styled from 'styled-components';
import { flex } from '@maru/utils';
import type { ApplicantCountType } from '@/types/analysis/client';
import useRatio from './DetailTable.hooks';

type DetailTableProps = { formList: ApplicantCountType[] | undefined };

const DetailTable = ({ formList }: DetailTableProps) => {
  const { regularRatio, specialAdmissionRatio } = useRatio(formList);

  return (
    <Row gap={40}>
      <RatioInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="btn2">일반 전형 지원 비율</Text>
              <Text fontType="D2">{regularRatio} %</Text>
            </Column>
            <Column>
              <Text fontType="btn2">특별 전형 지원 비율</Text>
              <Text fontType="D2">{specialAdmissionRatio} %</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <RatioTable formList={formList} />
        </Column>
      </RatioInfoWrapper>
      <DetailContent formList={formList} />
    </Row>
  );
};

export default DetailTable;

const RatioInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
