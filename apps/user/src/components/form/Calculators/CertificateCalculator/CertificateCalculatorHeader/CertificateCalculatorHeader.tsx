import { Row, Th } from '@maru/ui';

const CertificateCalculatorHeader = () => {
  return (
    <Row>
      <Th borderTopLeftRadius={12} width="51%" height={56}>
        자격증명
      </Th>
      <Th width="24.5%" height={56}>
        시행기관
      </Th>
      <Th width="14.7%" height={56}>
        반영점수
      </Th>
      <Th borderTopRightRadius={12} width="9.8%" height={56}>
        선택
      </Th>
    </Row>
  );
};

export default CertificateCalculatorHeader;
