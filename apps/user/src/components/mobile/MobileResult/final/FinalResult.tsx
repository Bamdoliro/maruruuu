import { Column } from '@maru/ui';
import FinalResultItem from './FianlResultItem';
import { useFinalResultQuery } from '@/services/result/queries';
import FailBox from '../FailBox';
import PassBox from './PassBox';

const FinalResult = () => {
  const { data: finalResultData } = useFinalResultQuery();

  return (
    <Column gap={16} alignItems="center">
      <FinalResultItem isPassed={finalResultData?.passed} />
      {finalResultData?.passed ? <PassBox /> : <FailBox />}
    </Column>
  );
};

export default FinalResult;
