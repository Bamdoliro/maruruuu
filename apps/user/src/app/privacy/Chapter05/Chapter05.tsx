import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater05 = () => {
  return (
    <PolicyRoule title="제5조 (개인정보 자동 수집 및 거부)">
      <StyledText fontType="p3" color={color.gray900}>
        ① 우리학교 홈페이지는 이용자 편의성을 제공하기 위해 이용정보를 저장하고 불러오는
        '쿠키(cookie)'를 사용합니다.
        <br />② 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게
        보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
        <li style={{ marginLeft: '10px' }}>
          1. 법률에 따라 열람이 금지되거나 제한되는 경우
        </li>
        <li style={{ marginLeft: '10px' }}>
          2. 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구 {'>'} 인터넷 옵션 {'>'}{' '}
          개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
        </li>
        <li style={{ marginLeft: '10px' }}>
          3. 쿠키 저장을 거부할 경우 홈페이지 팝업차단 및 방문통계 정보 제공이 안 될 수
          있습니다.
        </li>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater05;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
