import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import FirstResultItem from './FirstResultItem/FirstResultItem';
import FirstResultFooter from './FirstResultFooter/FirstResultFooter';
import { useFirstResultQuery } from '@/services/result/queries';

const FirstResultTable = () => {
  const { data: firstResultData } = useFirstResultQuery();

  return (
    <StyledFirstResultTable>
      <FirstResultItem
        type={firstResultData?.type}
        isPassed={firstResultData?.passed}
        changedToRegular={firstResultData?.changedToRegular}
      />
      <FirstResultFooter isPassed={firstResultData?.passed} />
    </StyledFirstResultTable>
  );
};

export default FirstResultTable;

const StyledFirstResultTable = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  gap: 8px;
`;
