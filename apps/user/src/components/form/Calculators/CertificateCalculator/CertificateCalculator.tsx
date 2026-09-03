import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useInput } from './CertificateCalculator.hook';
import CertificateCalculatorHeader from './CertificateCalculatorHeader/CertificateCalculatorHeader';
import CertificateCalculatorItem from './CertificateCalculatorItem/CertificateCalculatorItem';
import ComputerSpecialistItem from './CertificateCalculatorItem/ComputerSpecialistItem/ComputerSpecialistItem';
import { CERTIFICATE_LIST } from '@/constants/form/constants';

const CertificateCalculator = () => {
  const { handleCertificateListChange } = useInput();

  return (
    <StyledCertificateCalculator>
      <Text fontType="p3" color={color.red}>
        *자격증은 1개만 선택할 수 있습니다. 최고 수준의 자격증을 선택해주세요.
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
          <ComputerSpecialistItem onChange={handleCertificateListChange} />
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
