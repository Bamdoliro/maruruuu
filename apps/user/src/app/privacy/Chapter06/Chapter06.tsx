import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater06 = () => {
  return (
    <PolicyRoule title="제6조 (개인정보의 파기절차 및 파기방법)">
      <StyledText fontType="p3" color={color.gray900}>
        ① 우리학교는 원칙적으로 개인정보의 처리목적이 달성된 개인정보는 지체 없이
        파기합니다. 다만, 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는
        개인정보 처리방침을 통하여 해당 개인정보 항목과 보존근거를 공개하겠습니다. 파기의
        절차, 기한 및 방법은 다음과 같습니다.
        <ol style={{ marginLeft: '20px' }}>
          <li>
            파기절차
            <br />
            불필요한 개인정보 및 개인정보파일은 개인정보 보호책임자의 책임 하에 우리학교의
            내부 관리계획 절차에 따라 다음과 같이 처리하고 있습니다.
          </li>
        </ol>
        <li style={{ marginLeft: '27px' }}>
          가. 개인정보의 파기: 보유기간이 경과한 개인정보는 종료일로부터 지체 없이
          파기합니다.
        </li>
        <li style={{ marginLeft: '27px' }}>
          나. 개인정보파일의 파기: 개인정보파일의 처리 목적 달성, 해당 서비스의 폐지,
          사업의 종료 등 그 개인정보파일이 불필요하게 되었을 때에는 개인정보의 처리가
          불필요한 것으로 인정 되는 날로부터 지체 없이 그 개인정보파일을 파기합니다.
        </li>
        <ol start={2} style={{ marginLeft: '20px' }}>
          <li>파기방법</li>
        </ol>
        <li style={{ marginLeft: '27px' }}>
          가. 전자적 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
        </li>
        <li style={{ marginLeft: '27px' }}>
          나. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
        </li>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater06;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
