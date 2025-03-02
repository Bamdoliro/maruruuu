import { useFormValueStore } from '@/stores';
import { Certificate } from '@/types/form/client';
import { CheckBox, Row, Td } from '@maru/ui';

interface CertificateCalculatorItemProps {
  name: string;
  organization: string;
  score: string;
  value: Certificate;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CertificateCalculatorItem = ({
  name,
  organization,
  score,
  value,
  onChange,
}: CertificateCalculatorItemProps) => {
  const form = useFormValueStore();

  return (
    <Row>
      <Td width="51%" height={56}>
        {name}
      </Td>
      <Td width="24.5%" height={56}>
        {organization}
      </Td>
      <Td width="14.7%" height={56}>
        {score}
      </Td>
      <Td width="9.8%" height={56}>
        <CheckBox
          checked={form.grade.certificateList?.includes(value)}
          value={value}
          onChange={onChange}
        />
      </Td>
    </Row>
  );
};

export default CertificateCalculatorItem;
