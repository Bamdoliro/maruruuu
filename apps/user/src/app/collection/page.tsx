'use client';

import { CollectionTable, PolicyRoule } from '@/components/policy';
import { AppLayout } from '@/layouts';
import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Collection = () => {
  return (
    <AppLayout header footer>
      <StyledCollection>
        <Text fontType="H1" color={color.gray900}>
          이용약관
        </Text>
        <Column alignItems="center" style={{ marginBottom: '39px' }}>
          <Divider />
          <StyledText fontType="H1" color={color.gray900}>
            개인정보 선택 항목 수집 및 이용에 대한 동의
          </StyledText>
        </Column>
        <Column gap={32}>
          <PolicyRoule title="개인정보의 수집 및 이용 목적">
            <StyledText fontType="p3" color={color.gray900}>
              <li>마루는 홈페이지 운영을 위하여 개인정보를 수집·이용합니다.</li>
              <li>
                수집한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이
                변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </li>
              ㅤㅤ- 개인정보 이용 : 회원가입, 로그인, 원서 접수 등 마루 내에서 사용될
              예정입니다.
            </StyledText>
          </PolicyRoule>
          <PolicyRoule title="개인정보 수집 항목">
            <StyledText fontType="p3" color={color.gray900}>
              마루에서 수집하는 개인정보 항목은 다음과 같습니다.
            </StyledText>
            <CollectionTable />
            <StyledText fontType="caption" color={color.gray500}>
              ※ 서비스 이용과정에서 방문날짜, 방문시간, IP주소, 쿠키, 접속 기기정보 등의
              서비스의 이용 기록이 자동으로 생성되어 수집 될 수 있습니다.
            </StyledText>
          </PolicyRoule>
          <PolicyRoule title="개인정보의 보유 및 이용 기간">
            <StyledText fontType="p3" color={color.red}>
              가. 개인정보 보유기간: 입학 전형일 종료시 폐기
              <StyledText fontType="p3" color={color.gray900}>
                나. 이용자가 탈퇴의사를 밝혀 탈퇴 처리 시
              </StyledText>
            </StyledText>
          </PolicyRoule>
          <PolicyRoule title="개인정보 수집·이용에 대한 동의를 거부할 권리">
            <StyledText fontType="p3" color={color.gray900}>
              - 필수항목 : 동의를 거부할 권리가 있으나 회원 가입 시 필요한 항목으로 동의
              거부 시 회원가입이 제한됩니다.
              <br />
              - 선택항목 : 보다 원활한 서비스를 위하여 수집하는 정보로서, 동의하지 않아도
              회원가입 및 서비스 제공에 제한을 두지 않습니다.
              <br />
              (선택항목은 회원가입 후 회원정보 수정을 통하여 추가 입력 할 수 있으며 입력된
              항목은 동의를 한 것으로 간주 합니다.)
            </StyledText>
          </PolicyRoule>
        </Column>
      </StyledCollection>
    </AppLayout>
  );
};

export default Collection;

const StyledCollection = styled.div`
  width: 100%;
  height: 100%;
  padding: 32px 205px 257px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.gray400};
  margin-top: 24px;
  margin-bottom: 32px;
`;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
