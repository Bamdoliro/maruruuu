'use client';

import { ROUTES } from '@/constants/common/constant';
import { useLogoutAdminMutation } from '@/services/auth/mutations';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { css, styled } from 'styled-components';

const NAVIGATION_DATA = [
  {
    name: '원서 관리',
    route: ROUTES.FORM,
  },
  {
    name: '공지사항',
    route: ROUTES.NOTICE,
  },
  {
    name: '자주 묻는 질문',
    route: ROUTES.FAQ,
  },
  {
    name: '단체 메시지 발송',
    route: ROUTES.MESSAGE,
  },
  {
    name: '입학 설명회 관리',
    route: ROUTES.FAIR,
  },
  {
    name: '입학 등록원',
    route: ROUTES.REGISTRATION,
  },
  {
    name: '분석',
    route: ROUTES.ANALYSIS,
  },
] as const;

const SideBar = () => {
  const pathName = usePathname();
  const { logoutAdminMutate } = useLogoutAdminMutation();

  const handleLogoutAdmin = () => {
    logoutAdminMutate();
  };

  return (
    <StyledSideBar>
      <StyledImageBox>
        <Image src="/svg/maruLogoDark.svg" width={120} height={36} alt="logo" />
      </StyledImageBox>
      <Column alignItems="flex-start">
        {NAVIGATION_DATA.map(({ route, name }) => (
          <StyledLink
            key={`navigation ${name}`}
            href={route}
            $active={route === pathName}
          >
            {name}
          </StyledLink>
        ))}
      </Column>
      <StyledLogoutBox>
        <LogoutButton onClick={handleLogoutAdmin}>로그아웃</LogoutButton>
      </StyledLogoutBox>
    </StyledSideBar>
  );
};

export default SideBar;

const commonStyles = css`
  ${font.H5}
  ${flex({ alignItems: 'center' })}
  height: 56px;
  padding: 0 36px;
  color: ${color.white};
`;

const StyledSideBar = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  min-width: 240px;
  height: 100vh;
  background: ${color.gray900};
  flex-shrink: 0;
`;

const StyledImageBox = styled.div`
  margin: 48px 0 36px 36px;
`;

const StyledLogoutBox = styled.div`
  margin-top: 110px;
`;

const StyledLink = styled(Link).attrs<{ $active: boolean }>((props) => ({
  style: props.$active
    ? {
        background:
          'linear-gradient(90deg, rgba(37, 124, 255, 0.15) 0%, rgba(37, 124, 255, 0) 100%)',
      }
    : {},
}))<{ $active: boolean }>`
  ${commonStyles}
  width: 100%;
  position: relative;
  box-sizing: border-box;

  ${(props) =>
    props.$active &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: ${color.maruDefault};
      }
    `}
`;

const LogoutButton = styled.button`
  ${commonStyles}
  background: transparent;
  border: none;
  cursor: pointer;
`;
