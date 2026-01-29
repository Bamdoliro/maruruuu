import { color, font } from '@maru/design-system';
import { IconArrowRight } from '@maru/icon';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

interface TermsItemProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  link?: string;
  label: string;
  enabled?: boolean;
}

const TermsItem = ({
  id,
  checked,
  onChange,
  link,
  label,
  enabled = true,
}: TermsItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <Agreement>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
      {enabled ? (
        <AgreementLink onClick={handleClick}>
          [ 필수 ] <IconArrowRight color={color.maruDefault} width={12} height={12} />
        </AgreementLink>
      ) : (
        <></>
      )}
    </Agreement>
  );
};

export default TermsItem;

const Agreement = styled.div`
  ${font.btn3};
  color: ${color.gray500};
  display: flex;
  gap: 5px;
`;

const AgreementLink = styled.div`
  ${flex({ alignItems: 'center' })}
  ${font.btn3};
  color: ${color.maruDefault};
  display: flex;
  cursor: pointer;
`;
