import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import TermsItem from './TermsItem/TermsItem';
import { ROUTES } from '@/constants/common/constants';

const Terms = () => {
  return (
    <StyledTerms>
      <TermsItem
        id="all"
        checked={false}
        onChange={() => {}}
        link={ROUTES.TERMS_OF_SERVICE}
        label="약관 전체동의"
        enabled={false}
      />
      <hr />
      <TermsItem
        id="agreement1"
        checked={false}
        onChange={() => {}}
        link={ROUTES.TERMS_OF_SERVICE}
        label="이용약관 동의"
      />
      <TermsItem
        id="agreement2"
        checked={false}
        onChange={() => {}}
        link={ROUTES.PERSONAL_INFO_COLLECTION}
        label="개인정보 수집 이용동의"
      />
      <TermsItem
        id="agreement1"
        checked={false}
        onChange={() => {}}
        link={ROUTES.PRIVACY_POLCY}
        label="개인정보 처리 방침 동의"
      />
    </StyledTerms>
  );
};

export default Terms;

const StyledTerms = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 10px;
`;

const Agreement = styled.div`
  ${font.btn3};
  color: ${color.gray500};
  display: flex;
  gap: 5px;
`;
