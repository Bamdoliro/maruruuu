import { formatYear } from '@/utils';
import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { SCHEDULE } from '@/constants/common/constants';

const ExplainBox = () => {
  return (
    <StyledExplainBox>
      <Text fontType="p2" color={color.gray900}>
        기간 내에 서류를 제출하지 않으면 자동으로 <b>입학 포기 처리</b>됩니다.
        <br />
        입학을 포기할 경우, {formatYear(SCHEDULE.원서_접수, true)}학년도에는 타 학교
        진학이 불가합니다.
      </Text>
      <Text fontType="p2" color={color.gray900}>
        서류는 <b>가장 최근 제출</b>된 것을 기준으로 반영되며,
        <br />
        재제출하는 경우에도 반드시 기간 내에 제출해 주시기를 바랍니다.
      </Text>
      <Text fontType="p2" color={color.gray900}>
        '입학 등록원'은 학교 홈페이지(입학 공지 사항) 또는 마루(공지 사항)에서 다운받아{' '}
        <b>수기 작성</b> 후 탑재하시길 바랍니다.
      </Text>
      <Text fontType="p2" color={color.gray900}>
        수기 작성한 입학 등록원 원본은 <b>신입생 예비 소집일에 제출</b> 바랍니다.
      </Text>
    </StyledExplainBox>
  );
};

export default ExplainBox;

const StyledExplainBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  margin: 36px 0 64px;
  gap: 12px;
`;
