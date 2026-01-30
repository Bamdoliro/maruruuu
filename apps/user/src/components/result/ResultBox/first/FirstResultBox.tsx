import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import FirstResultItem from './FirstResultItem/FirstResultItem';
import { useFirstResultQuery } from '@/services/result/queries';
import PassBox from './FirstResultContent/PassBox/PassBox';
import FailBox from './FirstResultContent/FailBox/FailBox';

const FirstResultBox = () => {
  const { data: firstResultData } = useFirstResultQuery();

  return (
    <StyledFirstResultBox>
      <FirstResultItem
        type={firstResultData?.type}
        isPassed={firstResultData?.passed}
        changedToRegular={firstResultData?.changedToRegular}
      />
      {firstResultData?.passed ? <PassBox /> : <FailBox />}
    </StyledFirstResultBox>
  );
};

export default FirstResultBox;

const StyledFirstResultBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  gap: 8px;
`;
