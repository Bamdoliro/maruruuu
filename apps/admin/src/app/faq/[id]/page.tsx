'use client';

import { ROUTES } from '@/constants/common/constant';
import AppLayout from '@/layouts/AppLayout';
import { IconArrowLeft } from '@maru/icon';
import { color, font } from '@maru/design-system';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import { Suspense } from 'react';
import { styled } from 'styled-components';
import FaqDetail from '@/components/faq/FaqDetail/FaqDetail';

interface FaqDetailProps {
  params: { id: number };
}

const FaqDetailPage = ({ params: { id } }: FaqDetailProps) => {
  return (
    <AppLayout>
      <StyledFaqDetail>
        <DirectLink href={ROUTES.FAQ}>
          <IconArrowLeft width={18} height={18} />
          돌아가기
        </DirectLink>
        <Suspense fallback={<Loader />}>
          <FaqDetail id={id} />
        </Suspense>
      </StyledFaqDetail>
    </AppLayout>
  );
};

export default FaqDetailPage;

const StyledFaqDetail = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
  width: 100%;
  min-height: 100vh;
  padding: 48px 60px;
`;

const DirectLink = styled(Link)`
  ${flex({ alignItems: 'center' })};
  gap: 2px;
  ${font.p2};
  color: ${color.gray600};
`;
