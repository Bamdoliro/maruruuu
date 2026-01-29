import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater11 = () => {
  return (
    <PolicyRoule title="제11조 (개인정보처리방침 변경)">
      <StyledText fontType="p3" color={color.gray900}>
        이 개인정보처리방침은 2023/03/01부터 적용됩니다. 이전의 개인정보처리방침은
        아래에서 확인하실 수 있습니다.
        <br />-{' '}
        <a
          href="https://school.busanedu.net/bssm-h/na/ntt/selectNttInfo.do?nttSn=51632058&mi=1036453"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: color.maruDefault, textDecoration: 'underline' }}
        >
          우리학교 홈페이지 {'>'} 정보공개 {'>'} 개인정보처리방침{'>'}
          「개인정보처리방침 이력」
        </a>
        <br />
        <span style={{ color: color.maruDefault }}>
          (위 링크를 클릭 시, 이전 적용지침을 탑재한 게시판으로 이동할 수 있도록 링크
          적용)
        </span>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater11;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
