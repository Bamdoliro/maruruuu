import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import TermsItem from './TermsItem/TermsItem';
import { ROUTES } from '@/constants/common/constants';
import type { Dispatch, SetStateAction } from 'react';
import { useCheckTerms } from './Terms.hook';

interface TermsProps {
  setTermsAgree: Dispatch<SetStateAction<boolean>>;
}

const Terms = ({ setTermsAgree }: TermsProps) => {
  const { checks, handleCheckAll, handleCheckOne, handleCheckTwo, handleCheckThree } =
    useCheckTerms(setTermsAgree);

  const terms = [
    {
      id: 'agreement1',
      checked: checks[0],
      onChange: handleCheckOne,
      link: ROUTES.TERMS_OF_SERVICE,
      label: '이용약관 동의',
    },
    {
      id: 'agreement2',
      checked: checks[1],
      onChange: handleCheckTwo,
      link: ROUTES.PERSONAL_INFO_COLLECTION,
      label: '개인정보 수집 이용동의',
    },
    {
      id: 'agreement3',
      checked: checks[2],
      onChange: handleCheckThree,
      link: ROUTES.PRIVACY_POLCY,
      label: '개인정보 처리 방침 동의',
    },
  ];

  return (
    <StyledTerms>
      <TermsItem
        id="all"
        checked={checks.every(Boolean)}
        onChange={handleCheckAll}
        link={ROUTES.TERMS_OF_SERVICE}
        label="약관 전체동의"
        enabled={false}
      />
      <hr />
      {terms.map(({ id, checked, onChange, link, label }) => (
        <TermsItem
          key={id}
          id={id}
          checked={checked}
          onChange={onChange}
          link={link}
          label={label}
        />
      ))}
    </StyledTerms>
  );
};

export default Terms;

const StyledTerms = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 10px;
`;
