import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chapter04 = () => {
  return (
    <Column gap={32}>
      <Column gap={4}>
        <StyledText fontType="H3" color={color.gray900}>
          제4장 기타
        </StyledText>
        <PolicyRoule title="제19조 (손해배상 및 면책)">
          <StyledText fontType="p3" color={color.gray900}>
            <ol style={{ marginLeft: '20px' }}>
              <li>
                회원이 본 약관의 제7조, 제16조 등의 규정에 위반한 행위로 우리학교 및
                제3자에게 손해를 입히거나 회원의 책임 있는 사유에 의해 우리학교 및
                제3자에게 손해를 입힌 경우에는 회원은 그 손해를 배상하여야 합니다.
              </li>
              <li>
                우리학교는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할
                수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.
              </li>
              <li>
                우리학교는 서비스 이용과 관련하여 회원에게 발생한 손해 가운데 회원의 고의
                또는 과실로 인한 서비스 이용의 장애 및 손해에 대하여 어떠한 책임도
                부담하지 않습니다.
              </li>
            </ol>
          </StyledText>
        </PolicyRoule>
      </Column>
      <PolicyRoule title="제20조 (회원의 개인정보보호)">
        <StyledText fontType="p3" color={color.gray900}>
          우리학교는 이용자의 개인정보를 보호하기 위하여 노력합니다. 우리학교는 정보통신망
          이용 촉진 및 정보 보호 등에 관한 법률, 개인정보 보호법을 준수하고, 개인정보
          보호를 위하여 사이트 등에 개인정보 처리방침을 고지합니다.
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제21조 (쿠키 및 기타 추적 기술의 사용)">
        <StyledText fontType="p3" color={color.gray900}>
          우리학교는 이용자의 편의성 증대를 위하여 쿠키 및 기타 추적 기술을 사용할 수
          있으며, 이에 대한 자세한 내용은 개인정보 처리방침에 명시합니다. 회원은 쿠키
          사용에 대해 동의하지 않을 권리가 있으며, 쿠키 설정을 거부할 경우 일부 서비스
          이용에 제한이 있을 수 있습니다.
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제22조 (불만 처리 및 분쟁 해결)">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              우리학교와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여
              필요한 모든 노력을 하여야 합니다.
            </li>
            <li>
              회원이 서비스 이용과 관련하여 불만이 있는 경우, 우리학교의 고객지원팀에
              연락하여 불만을 제기할 수 있으며, 우리학교는 이를 신속하게 처리하기 위해
              노력합니다. 불만 처리 결과는 회원에게 통보합니다.
            </li>
            <li>
              전항의 노력에도 불구하고, 우리학교와 회원 간에 발생한 분쟁에 관한 소송이
              제기될 경우, 민사소송법에 따른 관할법원을 제1심 관할법원으로 지정합니다.
            </li>
          </ol>
        </StyledText>
      </PolicyRoule>
    </Column>
  );
};

export default Chapter04;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
