import { useFormValueStore } from '@/stores';
import { color } from '@maru/design-system';
import { CheckBox, Column, Row, Td, Text, Th } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useInput } from './CertificateCalculator.hook';
import CertificateCalculatorHeader from './CertificateCalculatorHeader/CertificateCalculatorHeader';
import CertificateCalculatorItem from './CertificateCalculatorItem/CertificateCalculatorItem';
import { Certificate } from '@/types/form/client';
import ComputerSpeciallistItem from './CertificateCalculatorItem/ComputerSpeciallistItem/ComputerSpeciallistItem';

const CERTIFICATE_LIST: {
  name: string;
  organization: string;
  score: string;
  value: Certificate;
}[] = [
  {
    name: '정보처리기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_INFORMATION_PROCESSING',
  },
  {
    name: '정보기기운용기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION',
  },
  {
    name: '전자계산기기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_COMPUTER',
  },
];

const CertificateCalculator = () => {
  const form = useFormValueStore();
  const { handleCertificateListChange } = useInput();

  return (
    <StyledCertificateCalculator>
      <Text fontType="p3" color={color.red}>
        *자격증을 중복 선택한 경우, 최고 수준의 자격증 1개만 인정됩니다.
      </Text>
      <Column>
        <CertificateCalculatorHeader />
        <Column>
          {CERTIFICATE_LIST.map((item, key) => (
            <CertificateCalculatorItem
              key={key}
              name={item.name}
              organization={item.organization}
              score={item.score}
              value={item.value}
              onChange={handleCertificateListChange}
            />
          ))}
          <ComputerSpeciallistItem onChange={handleCertificateListChange} />
        </Column>
      </Column>
    </StyledCertificateCalculator>
  );
};

export default CertificateCalculator;

const StyledCertificateCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  gap: 16px;
`;
