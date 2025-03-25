import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chapter02 = () => {
  return (
    <Column gap={32}>
      <Column gap={4}>
        <StyledText fontType="H3" color={color.gray900}>
          제2장 회원가입
        </StyledText>
        <PolicyRoule title="제7조 (서비스 이용 계약의 성립청)">
          <StyledText fontType="p3" color={color.gray900}>
            <ol style={{ marginLeft: '20px' }}>
              <li>
                서비스 이용계약은 회원 서비스를 이용하고자 하는 자(이하 “이용희망자”라
                합니다)의 본 약관과 개인정보 처리방침의 내용에 대한 동의 및 회원 가입
                신청에 대하여 우리학교가 승낙함으로써 성립합니다.
              </li>
              <li>
                사이트를 통한 회원 가입 시 이용희망자는 본 약관 및 개인정보 처리방침에
                대한 동의 표시 및 회원 가입 신청을 하여야 하며, 우리학교는 이용희망자가 본
                약관 및 개인정보 처리방침의 내용을 읽고 동의한 것으로 봅니다.
              </li>
              <li>
                이용자는 본 약관 및 우리학교의 개인정보 처리방침에서 정한 항목을
                제공하여야 합니다.
              </li>
              <li>
                회원의 경우 회원이 '동의' 버튼을 누르면 이 약관에 동의하는 것으로
                간주됩니다. 약관 변경 시에도 이와 동일하며, 변경된 약관에 동의하지 않을
                경우 회원 등록 취소가 가능합니다.
              </li>
            </ol>
          </StyledText>
        </PolicyRoule>
      </Column>
      <PolicyRoule title="제8조 (회원 가입 신청의 승낙과 제한)">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              우리학교는 전조의 규정에 의한 이용희망자에 대하여 다음 각 호의 사유를 모두
              충족할 경우 우리학교가 제공하는 절차에 따라 회원 가입을 승낙합니다.
            </li>
            <ol type="a" style={{ marginLeft: '20px' }}>
              <li>
                우리학교의 업무수행 및 서비스 제공을 위한 설비의 여유•기술상 지장이 없는
                경우
              </li>
              <li>
                본 약관에서 정하는 승낙 제한 또는 거절, 보류 사유에 해당하지 않는 경우
              </li>
              <li>기타 사이트의 사정상 필요하다고 인정되는 경우</li>
            </ol>
            <li>
              다음 각 호 중 어느 하나에 해당할 경우, 우리학교는 이용희망자의 회원 가입
              신청을 승낙하지 아니하며, 회원이 제1호 또는 제2호에 해당하는 행위를 한 경우,
              우리학교는 이에 대한 민사상 손해배상청구, 관계법령에 따른 형사처벌이나
              행정제재를 위한 법적 절차를 진행할 수 있습니다.
            </li>
            <ol type="a" style={{ marginLeft: '20px' }}>
              <li>
                회원 가입 신청 및/또는 실명인증 시에 실명이 아닌 이름을 이용하였거나
                타인의 명의를 도용한 경우
              </li>
              <li>회원 가입 신청 시에 회원 정보를 허위로 기재한 경우</li>
            </ol>
          </ol>
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제9조 (서비스 이용 계약의 변경)">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              회원은 개인정보관리를 통해 언제든지 본인의 개인정보를 열람하고 수정할 수
              있습니다.
            </li>
            <li>
              회원은 이용 신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정하여야 하며
              회원정보의 미변경으로 인하여 발생되는 문제의 책임은 본인에게 있습니다.
            </li>
          </ol>
        </StyledText>
      </PolicyRoule>
    </Column>
  );
};

export default Chapter02;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
