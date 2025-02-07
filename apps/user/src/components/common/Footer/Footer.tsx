import { ROUTES } from '@/constants/common/constants';
import { color, font } from '@maru/design-system';
import { IconRoundBamdoliro, IconRoundInstagram } from '@maru/icon';
import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Footer = () => {
  const router = useRouter();

  return (
    <StyledFooter>
      <FooterBox>
        <Column gap={40} height={262}>
          <Image src="/svg/maruGrayLogo.svg" width={107} height={32} alt="logo" />
          <Column gap={8}>
            <InfoBox>
              <Text fontType="p2" color={color.gray600}>
                주소: 부산광역시 강서구 가락대로 1393 봉림동 15 (46708)
              </Text>
              <Text fontType="p2" color={color.gray600}>
                교무실(입학처): 051-971-2153, Fax: 051-971-2061
              </Text>
              <Text fontType="p2" color={color.gray600}>
                입학담당자: 051-970-1725, Fax: 051-971-2061
              </Text>
              <Text fontType="p2" color={color.gray600}>
                행정실: 051-971-2152, Fax: 051-971-6325
              </Text>
            </InfoBox>
            <Text fontType="p3" color={color.gray600}>
              Copyright © 밤돌이로 all rights reserved.
            </Text>
          </Column>
        </Column>
        <Row gap={105} alignItems="flex-start">
          <Row gap={125} alignItems="flex-start">
            <Column gap={24}>
              <StyledLink href={ROUTES.FORM}>원서접수</StyledLink>
              <StyledLink href={ROUTES.NOTICE}>공지사항</StyledLink>
              <StyledLink href={ROUTES.FAQ}>자주묻는질문</StyledLink>
              <StyledLink href="http://bssm.hs.kr">학교 홈페이지</StyledLink>
            </Column>
          </Row>
          <Row gap={125} alignItems="flex-start">
            <Column gap={24}>
              <StyledLink href={ROUTES.TERMS_OF_SERVICE}>이용약관</StyledLink>
              <StyledLink href={ROUTES.PRIVACY_POLCY}>개인정보처리방침</StyledLink>
              <StyledLink href={ROUTES.PERSONAL_INFO_COLLECTION}>
                개인정보 수집
              </StyledLink>
            </Column>
          </Row>
          <Row gap={17} alignItems="center">
            <HoverdIconRoundInstagram
              width={36}
              height={36}
              onClick={() => router.push('https://www.instagram.com/bamdoliro')}
            />
            <HoveredIconRoundBamdoliro
              width={36}
              height={36}
              onClick={() => router.push('https://bamdoliro.com/')}
            />
          </Row>
        </Row>
      </FooterBox>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: ${color.gray100};
  padding: 40px 174px 48px 96px;
`;

const FooterBox = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })}
  height: 262px;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 8px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 20px;
`;

const StyledLink = styled(Link)`
  ${font.p2}
  color: ${color.gray600};
`;

const HoveredIconRoundBamdoliro = styled(IconRoundBamdoliro)`
  :hover :first-child {
    fill: ${color.bamdoliro};
  }

  cursor: pointer;
`;

const HoverdIconRoundInstagram = styled(IconRoundInstagram)`
  :hover :first-child {
    fill: ${color.bamdoliro};
  }

  cursor: pointer;
`;
