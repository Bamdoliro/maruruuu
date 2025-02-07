import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { Row, UnderlineButton } from '@maru/ui';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import Profile from './Profile/Profile';

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();

  const NAVIGATION_LIST = [
    { name: '홈', route: ROUTES.MAIN },
    { name: '원서 접수', route: ROUTES.FORM },
    { name: '원서 관리', route: ROUTES.FORM_MANAGEMENT },
    { name: '공지사항', route: ROUTES.NOTICE },
    { name: '자주묻는질문', route: ROUTES.FAQ },
    { name: '입학 등록', route: ROUTES.ADMISSION_REGISTRATION },
  ];

  return (
    <StyledHeader>
      <HeaderBox>
        <Row
          style={{ padding: '0px 96px' }}
          height={64}
          alignItems="center"
          justifyContent="space-between"
        >
          <Image
            src="/svg/maruLogo.svg"
            width={106}
            height={32}
            style={{ cursor: 'pointer' }}
            alt="logo"
            onClick={() => router.push(ROUTES.MAIN)}
          />
          <Profile />
        </Row>
        <Row style={{ padding: '0px 96px' }} alignItems="center">
          {NAVIGATION_LIST.map(({ route, name }, index) => (
            <UnderlineButton
              key={`navigation ${index}`}
              active={route === pathName}
              onClick={() => router.push(route)}
            >
              {name}
            </UnderlineButton>
          ))}
        </Row>
      </HeaderBox>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  box-shadow: 0 1px 0 0 ${color.gray200};
`;

const HeaderBox = styled.div`
  height: 100%;
  background-color: ${color.white};
  margin: 0 auto;
`;
