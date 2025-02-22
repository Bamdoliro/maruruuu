import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import FirstResultItem from './FirstResultItem/FirstResultItem';
import { useFirstResultQuery } from '@/services/result/queries';
import PassBox from './FirstResultContent/PassBox/PassBox';
import FailBox from './FirstResultContent/FailBox/FailBox';

const FirstResultTable = () => {
  const { data: firstResultData } = useFirstResultQuery();

  return (
    <StyledFirstResultTable>
      <FirstResultItem
        type={firstResultData?.type}
        isPassed={firstResultData?.passed}
        changedToRegular={firstResultData?.changedToRegular}
      />
      {firstResultData?.passed ? <PassBox /> : <FailBox />}
    </StyledFirstResultTable>
  );
};

export default FirstResultTable;

const StyledFirstResultTable = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  gap: 8px;
`;
