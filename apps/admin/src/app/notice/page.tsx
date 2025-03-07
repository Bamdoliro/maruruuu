import NoticeTable from '@/components/notice/NoticeTable/NoticeTable';
import AppLayout from '@/layouts/AppLayout';
import { Button, Column, Loader, Row, Text, SearchInput } from '@maru/ui';
import { flex } from '@maru/utils';
import { Suspense } from 'react';
import { styled } from 'styled-components';

const NoticePage = () => {
  return (
    <AppLayout>
      <StyledNoticePage>
        <Text fontType="H1">공지사항</Text>
        <Column gap={36}>
          <Row justifyContent="space-between" alignItems="center">
            <SearchInput placeholder="검색어를 입력하세요" />
            <Button size="SMALL" icon="ADD_ICON">
              공지사항 작성
            </Button>
          </Row>
          <Suspense fallback={<Loader />}>
            <NoticeTable />
          </Suspense>
        </Column>
      </StyledNoticePage>
    </AppLayout>
  );
};
export default NoticePage;

const StyledNoticePage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px 0 60px;
`;
