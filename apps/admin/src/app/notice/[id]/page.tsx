'use client';

import NoticeDetail from '@/components/notice/NoticeDetail/NoticeDetail';
import AppLayout from '@/layouts/AppLayout';
import { IconArrowLeft } from '@maru/icon';
import { color, font } from '@maru/design-system';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import { Suspense } from 'react';
import styled from '@emotion/styled';

interface NoticeDetailPageProps {
  params: { id: number };
}

const NoticeDetailPage = ({ params: { id } }: NoticeDetailPageProps) => {
  return (
    <AppLayout>
      <StyledNoticeDetail>
        <DirectLink href="/notice">
          <IconArrowLeft width={18} height={18} />
          돌아가기
        </DirectLink>
        <Suspense fallback={<Loader />}>
          <NoticeDetail id={id} />
        </Suspense>
      </StyledNoticeDetail>
    </AppLayout>
  );
};

export default NoticeDetailPage;

const StyledNoticeDetail = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
  width: 100%;
  min-height: 100vh;
  padding: 48px 60px;
`;

const DirectLink = styled(Link)`
  ${flex({ alignItems: 'center' })}
  gap: 2px;
  ${font.p2}
  color: ${color.gray900};
`;
