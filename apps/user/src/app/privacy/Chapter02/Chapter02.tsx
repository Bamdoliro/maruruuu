import { Box, PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater02 = () => {
  return (
    <Column gap={36}>
      <PolicyRoule title="제2조 (개인정보의 제3자 제공)">
        <StyledText fontType="p3" color={color.gray900}>
          ① 우리학교는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한
          범위내에서 처리하며, 다음의 경우를 제외하고는 정보주체의 사전 동의 없이는 본래의
          목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
          <StyledLi>1. 다른 법률에 특별한 규정이 있는 경우</StyledLi>
          <StyledLi>
            2. 정보주체 또는 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명
            등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한
            생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우
          </StyledLi>
          <StyledLi>
            3. 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면
            다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 보호위원회의
            심의·의결을 거친 경우
          </StyledLi>
          <StyledLi>
            4. 조약, 그 밖의 국제협정의 이행을 위하여 외국정보 또는 국제기구에 제공하기
            위하여 필요한 경우
          </StyledLi>
          <StyledLi>5. 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우</StyledLi>
          <StyledLi>6. 법원의 재판업무 수행을 위하여 필요한 경우</StyledLi>
          <StyledLi>
            7. 형(刑) 및 감호, 보호처분의 집행을 위하여 필요한 경우
          </StyledLi>➁{' '}
          <span style={{ color: color.maruDefault }}>
            (목적 외 이용 또는 제3자제공이 없는 경우)
          </span>{' '}
          개인정보를 목적 외 용도로 이용하거나 제3자에 제공할 경우 정보주체가 확인할 수
          있도록 개인정보처리방침을 통해 안내하겠습니다.
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제2조의2 (개인정보의 추가적인 이용‧제공 기준)">
        <StyledText fontType="p3" color={color.gray900}>
          우리학교는 개인정보 보호법 제15조제3항 또는 제17조제4항에 따라 정보주체의 동의
          없이 개인정보를 이용 또는 제공하려는 경우는 다음의 경우를 고려하겠습니다.
          <StyledLi>1. 당초 수집 목적과 관련성이 있는지 여부</StyledLi>
          <StyledLi>
            2. 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 개인정보의 추가적인
            이용 또는 제공에 대한 예측 가능성이 있는지 여부
          </StyledLi>
          <StyledLi>3. 정보주체의 이익을 부당하게 침해하는지 여부</StyledLi>
          <StyledLi>
            4. 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부
          </StyledLi>
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제2조의3 (가명정보 처리에 관한 사항)">
        <Box color={color.white}>
          <StyledText fontType="p2" color={color.gray900}>
            <span style={{ color: color.maruDefault }}>
              (가명정보를 처리하지 않는 경우)
            </span>{' '}
            우리학교는 가명정보를 처리하지 않고 있습니다. 가명정보 처리 시 교육부 개인정보
            보호지침 제78조의2에 따라 “교육분야 가명정보 처리 가이드라인”에서 제시하는
            기준에 준하여 처리하고 처리된 내용은 개인정보 처리방침에 공개하겠습니다.
          </StyledText>
        </Box>
      </PolicyRoule>
    </Column>
  );
};

export default Chpater02;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;

const StyledLi = styled.li`
  margin-left: 6px;
`;
