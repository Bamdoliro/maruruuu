import { color, font } from '@maru/design-system';
import styled from '@emotion/styled';

const SubmissionNotice = () => {
  return (
    <StyledSubmissionNotice>
      모든 원서 서류는 원서접수 사이트에서 PDF 파일로 최종 제출해야 하며,
      <br />
      직인 날인 등 필요한 절차를 완료한 원본 서류도 반드시 본교에 제출해야 합니다.
    </StyledSubmissionNotice>
  );
};

export default SubmissionNotice;

const StyledSubmissionNotice = styled.p`
  ${font.p2}
  line-height: 130%;
  color: ${color.gray400};
  white-space: nowrap;
`;
