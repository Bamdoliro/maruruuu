import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater09 = () => {
  return (
    <PolicyRoule title="제9조 (개인정보 열람청구 및 고충사항을 접수ㆍ처리하는 부서)">
      <StyledText fontType="p3" color={color.gray900}>
        ① 정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 개인정보파일
        보유부서에 할 수 있습니다.
        <br />② 이외에 개인정보보호위원회의 '개인정보 포털'(www.privacy.go.kr)를 통해서도
        개인정보 열람청구를 하실 수 있습니다.
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater09;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
