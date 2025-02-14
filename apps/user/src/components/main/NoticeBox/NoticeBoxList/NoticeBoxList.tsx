import { useNoticeListQuery } from '@/services/notice/queries';
import styled from 'styled-components';
import NoticeBoxItem from './NoticeBoxItem/NoticeBoxItem';

const NoticeBoxList = () => {
  const { data: mainNoticeListData } = useNoticeListQuery();

  return (
    <StyledNoticeBoxList>
      {mainNoticeListData.slice(0, 3).map(({ title, id }, index) => (
        <NoticeBoxItem id={id} title={title} key={`notice box ${index}`} />
      ))}
    </StyledNoticeBoxList>
  );
};

export default NoticeBoxList;

const StyledNoticeBoxList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
