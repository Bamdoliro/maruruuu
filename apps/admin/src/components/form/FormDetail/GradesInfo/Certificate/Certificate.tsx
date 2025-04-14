import { convertToResponsive } from '@/utils';
import { CheckBox, Column, Row, Td, Th } from '@maru/ui';

interface CertificateProps {
  certificateList: string[];
}

const Certificate = ({ certificateList }: CertificateProps) => {
  const isCraftsmanIncluded =
    certificateList.includes('CRAFTSMAN_INFORMATION_PROCESSING') ||
    certificateList.includes('CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION') ||
    certificateList.includes('CRAFTSMAN_COMPUTER');

  return (
    <Column>
      <Row>
        <Th width={convertToResponsive(200, 340)} height={56} borderTopLeftRadius={12}>
          자격증명
        </Th>
        <Th width={convertToResponsive(100, 200)} height={56}>
          시행기관
        </Th>
        <Th width={convertToResponsive(80, 120)} height={56}>
          반영점수
        </Th>
        <Th width={80} height={56} borderTopRightRadius={12}>
          선택
        </Th>
      </Row>
      <Row>
        <Td width={convertToResponsive(200, 340)} height={56}>
          정보처리기능사, 정보기기운용기능사, <br /> 전자계산기기능사
        </Td>
        <Td width={convertToResponsive(100, 200)} height={56}>
          한국산업인력공단
        </Td>
        <Td width={convertToResponsive(80, 120)} height={56}>
          4점
        </Td>
        <Td width={80} height={56}>
          <CheckBox checked={isCraftsmanIncluded} />
        </Td>
      </Row>
      <Row>
        <Td
          width={convertToResponsive(200, 340)}
          height={168}
          borderBottomLeftRadius={12}
        >
          컴퓨터활용능력
        </Td>
        <Td width={convertToResponsive(100, 200)} height={168}>
          한국산업인력공단
        </Td>
        <Column>
          <Row>
            <Td width={convertToResponsive(80, 120)} height={56}>
              1급(3점)
            </Td>
            <Td width={80} height={56}>
              <CheckBox
                checked={certificateList.includes('COMPUTER_SPECIALIST_LEVEL_1')}
              />
            </Td>
          </Row>
          <Row>
            <Td width={convertToResponsive(80, 120)} height={56}>
              2급(2점)
            </Td>
            <Td width={80} height={56}>
              <CheckBox
                checked={certificateList.includes('COMPUTER_SPECIALIST_LEVEL_2')}
              />
            </Td>
          </Row>
          <Row>
            <Td width={convertToResponsive(80, 120)} height={56}>
              3급(1점)
            </Td>
            <Td width={80} height={56} borderBottomRightRadius={12}>
              <CheckBox
                checked={certificateList.includes('COMPUTER_SPECIALIST_LEVEL_3')}
              />
            </Td>
          </Row>
        </Column>
      </Row>
    </Column>
  );
};

export default Certificate;
