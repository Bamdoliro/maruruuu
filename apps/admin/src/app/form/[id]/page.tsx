'use client';

import FormDetail from '@/components/form/FormDetail/FormDetail';
import { ROUTES } from '@/constants/common/constant';
import AppLayout from '@/layouts/AppLayout';
import { color, font } from '@maru/design-system';
import { IconArrowLeft } from '@maru/icon';
import { flex } from '@maru/utils';
import Link from 'next/link';
import { styled } from 'styled-components';

interface FormDetailPageProps {
  params: { id: number };
}

const FormDetailPage = ({ params: { id } }: FormDetailPageProps) => {
  return (
    <AppLayout>
      <StyledFormDetail>
        <DirectLink href={ROUTES.FORM}>
          <IconArrowLeft width={18} height={18} />
          돌아가기
        </DirectLink>
        <FormDetail id={id} />
      </StyledFormDetail>
    </AppLayout>
  );
};

export default FormDetailPage;

const StyledFormDetail = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
  width: 100%;
  min-height: 100vh;
  padding: 48px 60px 82px;
`;

const DirectLink = styled(Link)`
  ${flex({ alignItems: 'center' })}
  gap: 2px;
  ${font.p3}
  color: ${color.gray600};
`;
