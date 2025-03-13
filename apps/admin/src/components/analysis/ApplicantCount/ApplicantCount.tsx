import styled from 'styled-components';
import { Column, Text, Td, Th, Row } from '@maru/ui';
import { flex } from '@maru/utils';
import DetailTable from './DetailTable/DetailTable';

const ApplicantCount = () => {
  return (
    <StyledApplicantCount>
      <Row justifyContent="space-between">
        <ApplicantInfoWrapper>
          <TextContainer>
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
          </TextContainer>
          <Column justifyContent="space-between">
            <Row>
              <Th width={80} height={48} borderTopLeftRadius={10}>
                1
              </Th>
              <Th width={80} height={48}>
                1
              </Th>
              <Th width={80} height={48}>
                1
              </Th>
              <Th width={80} height={48} borderTopRightRadius={10}>
                1
              </Th>
            </Row>
            <Row>
              <Td width={80} height={36}>
                12
              </Td>
            </Row>
          </Column>
        </ApplicantInfoWrapper>
        <DetailTable />
      </Row>
    </StyledApplicantCount>
  );
};

export default ApplicantCount;

const StyledApplicantCount = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
`;

const TextContainer = styled.div``;

const ApplicantInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  height: 100%;
`;
