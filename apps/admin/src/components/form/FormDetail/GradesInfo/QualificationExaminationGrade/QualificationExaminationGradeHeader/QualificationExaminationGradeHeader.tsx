import { Row, Th } from '@maru/ui';

const QualificationExaminationGradeHeader = () => {
  return (
    <Row>
      <Th width={123} height={100} borderTopLeftRadius={12}>
        과목
      </Th>
      <Th width={419} height={100} borderTopRightRadius={12}>
        통합
      </Th>
    </Row>
  );
};

export default QualificationExaminationGradeHeader;
