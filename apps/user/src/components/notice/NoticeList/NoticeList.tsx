import { useNoticeListQuery } from '@/services/notice/queries';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import NoticeItem from './NoticeItem/NoticeItem';

const NoticeList = () => {
  const { data: noticeListData } = useNoticeListQuery();

  return (
    <StyledNoticeList>
      {noticeListData.map((props) => (
        <NoticeItem id={props.id} title={props.title} updatedAt={props.updatedAt} />
      ))}
    </StyledNoticeList>
  );
};

export default NoticeList;

const StyledNoticeList = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 20px;
`;
