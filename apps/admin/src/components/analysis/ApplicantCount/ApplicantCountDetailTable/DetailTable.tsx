import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import Competition from './Competition/Competition';
import DetailContent from './Competition/DetailContent/common/DetailContent';
import { ApplicantCountType } from '@/types/analysis/client';
import useCompetitionRate from './DetailTable.hooks';

type DetailTableProps = { formList: ApplicantCountType[] | undefined };

const DetailTable = ({ formList }: DetailTableProps) => {
  const { total, competitionRate } = useCompetitionRate(formList);

  return (
    <Row gap={40}>
      <ApplicantInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="btn2">전체 지원자 수</Text>
              <Text fontType="D2">{total}명</Text>
            </Column>
            <Column>
              <Text fontType="btn2">전체 경쟁률</Text>
              <Text fontType="D2">{competitionRate} : 1</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <Competition formList={formList} />
        </Column>
      </ApplicantInfoWrapper>
      <DetailContent formList={formList} />
    </Row>
  );
};

export default DetailTable;

const ApplicantInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
