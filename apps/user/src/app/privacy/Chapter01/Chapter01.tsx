import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater01 = () => {
  return (
    <PolicyRoule title="제1조 (개인정보의 처리목적, 개인정보의 처리 및 보유기간, 처리하는 개인정보의 항목)">
      <Column gap={8}>
        <StyledText fontType="p3" color={color.gray900}>
          우리학교가 개인정보 보호법 제32조에 따라 등록·공개하는 개인정보파일은
          개인정보보호위원회 개인정보 포털(www.privacy.go.kr) ⇨ 개인서비스 ⇨ 정보주체
          권리행사 ⇨ 개인정보 열람등요구 ⇨ 개인정보파일 검색 메뉴를 통해 공개하고
          있습니다.
        </StyledText>
        <StyledText fontType="p3" color={color.gray900}>
          ▶ 기관명에{' '}
          <span style={{ color: color.maruDefault }}>
            '부산소프트웨어마이스터고등학교'
          </span>
          를 입력하면 조회가 가능합니다.
        </StyledText>
      </Column>
    </PolicyRoule>
  );
};

export default Chpater01;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
