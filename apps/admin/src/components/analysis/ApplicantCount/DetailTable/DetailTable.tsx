import { font } from '@maru/design-system';
import { Column, Row, Td, Th } from '@maru/ui';
import styled from 'styled-components';

const DetailTable = () => {
  return (
    <StyledDetailTable>
      <Column>
        <Row>
          <Th width={100} height={44} borderTopLeftRadius={12}>
            전형
          </Th>
          <Th width={160} height={44}>
            유형
          </Th>
          <Th width={200} height={44}>
            구분
          </Th>
          <Th width={80} height={44} borderTopRightRadius={12}>
            지원자
          </Th>
        </Row>
        <Row>
          <Td width={100} height={44}>
            일반 전형
          </Td>
          <Td width={160} height={44}>
            일반 전형
          </Td>
          <Td width={200} height={44}>
            65
          </Td>
          <Td width={80} height={44}>
            37
          </Td>
        </Row>
        <Row>
          <Td width={160} height={44}>
            마이스터 인재전형
          </Td>
          <Td width={200} height={44}>
            65
          </Td>
          <Td width={80} height={44}>
            59
          </Td>
        </Row>
        <Row>
          <Td width={100} height={44}>
            특별 전형
          </Td>
          <Td width={160} height={44}>
            기회균등 전형
          </Td>
          <Td width={200} height={44}>
            국민기초생활수급자
          </Td>
          <Td width={80} height={44}>
            5
          </Td>
        </Row>
        <Row>
          <Td width={200} height={44}>
            차상위계층
          </Td>
          <Td width={80} height={44}>
            3
          </Td>
        </Row>
        <Row>
          <Td width={200} height={44}>
            국가보훈대상자 (국가유공자)
          </Td>
          <Td width={80} height={44}>
            4
          </Td>
        </Row>
        <Row>
          <Td width={200} height={44}>
            한부모가정보호대상자
          </Td>
          <Td width={80} height={44}>
            2
          </Td>
        </Row>
        <Row>
          <Td width={200} height={44}>
            북한이탈주민 또는 그 자녀
          </Td>
          <Td width={80} height={44}>
            0
          </Td>
        </Row>
        <Row>
          <Td width={160} height={44}>
            사회다양성 전형
          </Td>
          <Td width={200} height={44}>
            다문화가정 자녀
          </Td>
          <Td width={80} height={44}>
            1
          </Td>
        </Row>
        <Row>
          <Td width={200} height={44}>
            소년·소녀가장
          </Td>
          <Td width={80} height={44}>
            2
          </Td>
        </Row>
      </Column>
    </StyledDetailTable>
  );
};

export default DetailTable;

const StyledDetailTable = styled.div`
  ${font.caption}
`;
