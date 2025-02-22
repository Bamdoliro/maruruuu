import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useFinalResultQuery } from '@/services/result/queries';
import FinalResultItem from './FinalResultItem/FinalResultItem';
import FailBox from './FinalResultContent/FailBox/FailBox';
import PassBox from './FinalResultContent/PassBox/PassBox';

const FinalResultBox = () => {
  const { data: finalResultData } = useFinalResultQuery();

  return (
    <StyledFinalResultBox>
      <FinalResultItem isPassed={finalResultData?.passed} />
      {finalResultData?.passed ? <PassBox /> : <FailBox />}
    </StyledFinalResultBox>
  );
};

export default FinalResultBox;

const StyledFinalResultBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  gap: 8px;
`;
