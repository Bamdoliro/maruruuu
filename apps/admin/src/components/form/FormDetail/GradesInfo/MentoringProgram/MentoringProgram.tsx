import { convertToResponsive } from '@/utils';
import { CheckBox, Column, Row, Td, Th } from '@maru/ui';

interface MentoringProgramProps {
  mentoringProgram: boolean;
}

const MentoringProgram = ({ mentoringProgram }: MentoringProgramProps) => {
  return (
    <Column>
      <Row>
        <Th width={convertToResponsive(200, 340)} height={56} borderTopLeftRadius={12}>
          프로그램명
        </Th>
        <Th width={convertToResponsive(100, 200)} height={56}>
          시행기관
        </Th>
        <Th width={convertToResponsive(80, 120)} height={56}>
          반영점수
        </Th>
        <Th width={convertToResponsive(60, 80)} height={56} borderTopRightRadius={12}>
          선택
        </Th>
      </Row>
      <Row>
        <Td width={convertToResponsive(200, 340)} height={56} borderBottomLeftRadius={12}>
          본교 재학생들과 함께하는 <br /> 멘토·멘티 프로그램
        </Td>
        <Td width={convertToResponsive(100, 200)} height={56}>
          부산소프트웨어마이스터고등학교
        </Td>
        <Td width={convertToResponsive(80, 120)} height={56}>
          1점
        </Td>
        <Td width={convertToResponsive(60, 80)} height={56} borderBottomRightRadius={12}>
          <CheckBox checked={mentoringProgram} />
        </Td>
      </Row>
    </Column>
  );
};

export default MentoringProgram;
