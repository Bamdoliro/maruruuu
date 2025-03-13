import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import Competition from './Competition';
import DetailContent from '../../common/DetailContent';

const DetailTable = () => {
  return (
    <Row gap={40}>
      <ApplicantInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="btn2">전체 지원자 수</Text>
              <Text fontType="D2">{121}명</Text>
            </Column>
            <Column>
              <Text fontType="btn2">전체 경쟁률</Text>
              <Text fontType="D2">1.89 : 1</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <Competition />
        </Column>
      </ApplicantInfoWrapper>
      <DetailContent />
    </Row>
  );
};

export default DetailTable;

const ApplicantInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
