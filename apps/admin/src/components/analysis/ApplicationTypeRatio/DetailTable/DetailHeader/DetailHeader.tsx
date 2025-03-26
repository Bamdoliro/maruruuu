import { Row, Th } from '@maru/ui';

const DetailHeader = () => {
  return (
    <Row>
      <Th width={140} height={44} borderTopLeftRadius={12} styleType="ANALYSIS">
        전형
      </Th>
      <Th width={160} height={44} styleType="ANALYSIS">
        유형
      </Th>
      <Th width={160} height={44} styleType="ANALYSIS">
        구분
      </Th>
      <Th width={80} height={44} borderTopRightRadius={12} styleType="ANALYSIS">
        비율
      </Th>
    </Row>
  );
};

export default DetailHeader;
