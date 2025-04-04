'use client';

import FairDetail from '@/components/fair/FairDetail/FairDetail';
import { ROUTES } from '@/constants/common/constant';
import AppLayout from '@/layouts/AppLayout';
import { color, font } from '@maru/design-system';
import { IconArrowLeft } from '@maru/icon';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import Link from 'next/link';
import { Suspense } from 'react';
import { styled } from 'styled-components';

interface FairDetailProps {
  params: { id: number };
}

const FairDetailPage = ({ params: { id } }: FairDetailProps) => {
  return (
    <AppLayout>
      <StyledFairDetail>
        <DirectLink href={ROUTES.FAIR}>
          <IconArrowLeft width={18} height={18} />
          돌아가기
        </DirectLink>
        <Suspense fallback={<Loader />}>
          <FairDetail id={id} />
        </Suspense>
      </StyledFairDetail>
    </AppLayout>
  );
};

export default FairDetailPage;

const StyledFairDetail = styled.div`
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
