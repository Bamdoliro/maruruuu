'use client';

import NoticeTable from '@/components/notice/NoticeTable/NoticeTable';
import { ROUTES } from '@/constants/common/constant';
import AppLayout from '@/layouts/AppLayout';
import { useNoticeListQuery } from '@/services/notice/queries';
import { useDebounceInput } from '@maru/hooks';
import { Button, Column, Loader, Row, Text, SearchInput } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import { styled } from 'styled-components';

const NoticePage = () => {
  const router = useRouter();
  const { data: noticeList } = useNoticeListQuery();

  const {
    value: noticeTitle,
    onChange: handleNoticeTitleDataChange,
    debouncedValue: debouncedNoticeTitle,
  } = useDebounceInput({ initialValue: '' });

  const filteredNoticeList = useMemo(() => {
    return noticeList?.filter((notice) =>
      (notice.title ?? '').toLowerCase().includes(debouncedNoticeTitle.toLowerCase())
    );
  }, [noticeList, debouncedNoticeTitle]);

  const handleMoveNoticeCreatePage = () => {
    router.push(ROUTES.NOTICE_CREATE);
  };

  return (
    <AppLayout>
      <StyledNoticePage>
        <Text fontType="H1">공지사항</Text>
        <Column gap={36}>
          <Row justifyContent="space-between" alignItems="center">
            <SearchInput
              placeholder="검색어를 입력하세요"
              value={noticeTitle}
              onChange={handleNoticeTitleDataChange}
            />
            <Button size="SMALL" icon="ADD_ICON" onClick={handleMoveNoticeCreatePage}>
              공지사항 작성
            </Button>
          </Row>
          <Suspense fallback={<Loader />}>
            <NoticeTable noticeList={filteredNoticeList ?? []} />
          </Suspense>
        </Column>
      </StyledNoticePage>
    </AppLayout>
  );
};
export default NoticePage;

const StyledNoticePage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px 0 60px;
`;
