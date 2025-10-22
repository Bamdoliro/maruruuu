import { Column } from '@maru/ui';
import FirstResultItem from './FirstResultItem';
import PassBox from './PassBox';
import FailBox from '../FailBox';
import { useFirstResultQuery } from '@/services/result/queries';

const FirstResult = () => {
  const { data: firstResultData } = useFirstResultQuery();

  return (
    <Column gap={16} alignItems="center">
      <FirstResultItem
        type={firstResultData?.type}
        isPassed={firstResultData?.passed}
        changedToRegular={firstResultData?.changedToRegular}
      />
      {firstResultData?.passed ? <PassBox /> : <FailBox />}
    </Column>
  );
};

export default FirstResult;
