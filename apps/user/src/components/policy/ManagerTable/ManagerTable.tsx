import { Column, Row, Td, Th } from '@maru/ui';

const ManagerTable = () => {
  return (
    <Column>
      <Row>
        <Th borderTopLeftRadius={12} width="33.3%" height={56}>
          구분
        </Th>
        <Th width="33.3%" height={56}>
          직위
        </Th>
        <Th borderTopRightRadius={12} width="33.3%" height={56}>
          전화번호
        </Th>
      </Row>
      <Row>
        <Td width="33.3%" height={56}>
          개인정보 보호책임자
        </Td>
        <Td width="33.3%" height={56}>
          교장
        </Td>
        <Td width="33.3%" height={56}>
          051-970-1701
        </Td>
      </Row>
      <Row>
        <Td borderBottomLeftRadius={12} width="33.3%" height={56}>
          개인정보 보호담당자
        </Td>
        <Td width="33.3%" height={56}>
          교사
        </Td>
        <Td borderBottomRightRadius={12} width="33.3%" height={56}>
          051-970-1744
        </Td>
      </Row>
    </Column>
  );
};

export default ManagerTable;
