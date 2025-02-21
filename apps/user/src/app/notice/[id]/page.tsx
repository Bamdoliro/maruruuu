'use client';

import { NoticeDetailContent } from '@/components/notice';
import { ROUTES } from '@/constants/common/constants';
import AppLayout from '@/layouts/AppLayout';
import { color } from '@maru/design-system';
import { IconArrowLeft } from '@maru/icon';
import { Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import styled from 'styled-components';

interface NoticeDetailProps {
  params: { id: number };
}

const NoticeDetail = ({ params: { id } }: NoticeDetailProps) => {
  const router = useRouter();

  const handleMoveBackPage = () => {
    router.push(ROUTES.NOTICE);
  };

  return (
    <AppLayout header footer>
      <StyledNoticeDetail>
        <BackLink onClick={handleMoveBackPage}>
          <IconArrowLeft width={24} height={24} color={color.gray600} />
          <Text fontType="H5" color={color.gray900}>
            공지사항
          </Text>
        </BackLink>
        <Suspense fallback={<Loader />}>
          <NoticeDetailContent id={id} />
        </Suspense>
      </StyledNoticeDetail>
    </AppLayout>
  );
};

export default NoticeDetail;

const StyledNoticeDetail = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  position: relative;
  gap: 36px;
  margin: 0 auto;
  padding: 52px 204px 99px 204px;
`;

const BackLink = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  max-width: 89px;
  gap: 2px;
  cursor: pointer;
`;
