'use client';

import NoticeEdit from '@/components/notice/NoticeEdit/NoticeEdit';
import { ROUTES } from '@/constants/common/constant';
import AppLayout from '@/layouts/AppLayout';
import { IconArrowLeft } from '@maru/icon';
import { color, font } from '@maru/design-system';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import { Suspense } from 'react';
import styled from '@emotion/styled';

interface NoticeEditPageProps {
  params: { id: number };
}

const NoticeEditPage = ({ params: { id } }: NoticeEditPageProps) => {
  return (
    <AppLayout>
      <StyledNoticeEdit>
        <DirectLink href={`${ROUTES.NOTICE}/${id}`}>
          <IconArrowLeft width={18} height={18} />
          돌아가기
        </DirectLink>
        <Suspense fallback={<Loader />}>
          <NoticeEdit id={id} />
        </Suspense>
      </StyledNoticeEdit>
    </AppLayout>
  );
};

export default NoticeEditPage;

const StyledNoticeEdit = styled.div`
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
  ${font.p3}
  color: ${color.gray900};
`;
