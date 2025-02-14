import { useFaqListQuery } from '@/services/faq/queries';
import styled from 'styled-components';
import FaqBoxItem from './FaqBoxItem/FaqBoxItem';

const FaqBoxList = () => {
  const { data: mainFaqListData } = useFaqListQuery('TOP_QUESTION');

  return (
    <StyledFaqBoxList>
      {mainFaqListData.slice(0, 3).map(({ title }, index) => (
        <FaqBoxItem key={`faq item ${index}`} title={title} />
      ))}
    </StyledFaqBoxList>
  );
};

export default FaqBoxList;

const StyledFaqBoxList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
