import { useNoticeListQuery } from '@/services/notice/queries';
import styled from 'styled-components';
import NoticeBoxItem from './NoticeBoxItem/NoticeBoxItem';

const NoticeBoxList = () => {
  const { data: mainNoticeListData } = useNoticeListQuery();
  const sliceNoticeData = mainNoticeListData?.slice(0, 3);

  return (
    <StyledNoticeBoxList>
      {mainNoticeListData
        ? sliceNoticeData?.map(({ title, id }, index) => (
            <NoticeBoxItem id={id} title={title} key={`notice box ${index}`} />
          ))
        : null}
    </StyledNoticeBoxList>
  );
};

export default NoticeBoxList;

const StyledNoticeBoxList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
