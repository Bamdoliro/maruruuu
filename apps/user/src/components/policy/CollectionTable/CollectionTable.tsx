import { Column, Row, Td, Th } from '@maru/ui';

const CollectionTable = () => {
  return (
    <Column>
      <Row>
        <Th borderTopLeftRadius={12} width="20%" height={56}>
          구분
        </Th>
        <Th borderTopRightRadius={12} width="80%" height={56}>
          수집항목
        </Th>
      </Row>
      <Row>
        <Td width="20%" height={111}>
          지원자
        </Td>
        <Td width="80%" height={111}>
          필수 : 지원자 이름, 생년월일, 전화번호, 성별, 학교생활기록부 내 정보
        </Td>
      </Row>
      <Row>
        <Td width="20%" height={56}>
          보호자
        </Td>
        <Td width="80%" height={56}>
          필수 : 보호자 이름, 전화번호, 주소
        </Td>
      </Row>
      <Row>
        <Td borderBottomLeftRadius={12} width="20%" height={112}>
          일반
        </Td>
        <Column width="80%">
          <Td width="100%" height={56}>
            필수 : 가입자 이름, 전화번호
          </Td>
          <Td borderBottomRightRadius={12} width="100%" height={56}>
            선택 : 소속기관
          </Td>
        </Column>
      </Row>
    </Column>
  );
};

export default CollectionTable;
