import { useFaqListQuery } from '@/services/faq/queries';
import styled from 'styled-components';
import FaqBoxItem from './FaqBoxItem/FaqBoxItem';

const FaqBoxList = () => {
  const { data: mainFaqListData } = useFaqListQuery('TOP_QUESTION');
  const sliceFaqData = mainFaqListData.slice(0, 3);

  return (
    <StyledFaqBoxList>
      {mainFaqListData
        ? sliceFaqData.map(({ title }, index) => (
            <FaqBoxItem key={`faq item ${index}`} title={title} />
          ))
        : null}
    </StyledFaqBoxList>
  );
};

export default FaqBoxList;

const StyledFaqBoxList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
