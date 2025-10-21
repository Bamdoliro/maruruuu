import { color } from '@maru/design-system';
import { IconCheckCircle } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useCTAButton } from './DraftSubmissionCompletedContent.hook';
import { useFormValueStore } from '@/stores';

const DraftSubmissionCompletedContent = () => {
  const { handleMoveMainPage, handleMoveFinalSubmit } = useCTAButton();
  const form = useFormValueStore();
  console.log(form);
  return (
    <StyledDraftSubmissionCompletedContent>
      <Row gap={8} alignItems="center">
        <IconCheckCircle width={64} height={64} />
        <Text fontType="H1" color={color.gray900}>
          원서 최종 제출
        </Text>
      </Row>
      <Column gap={12}>
        {form.education.graduationType === 'QUALIFICATION_EXAMINATION' ? (
          <Text fontType="p1" color={color.gray900}>
            작성한 원서 초안을 출력하여 추가 서류와 함께 인터넷으로 접수해 주시기
            바랍니다.
          </Text>
        ) : (
          <Text fontType="p1" color={color.gray900}>
            작성한 원서 초안을 출력하여 학교장 직인을 받은 후, 추가 서류와 함께 인터넷으로
            접수해 주시기 바랍니다.
          </Text>
        )}
        <Text fontType="p1" color={color.gray900}>
          최종 접수한 모든 서류는 우편 또는 방문 접수하여 주시기 바랍니다.
        </Text>
        <Text fontType="H4" color={color.red}>
          원서 초안과 기타 제출서류를 함께 제출해야 최종적으로 원서 제출이 완료됩니다.
        </Text>
      </Column>
      <Row gap={16}>
        <Button onClick={handleMoveMainPage} styleType="SECONDARY" size="LARGE">
          홈으로 돌아가기
        </Button>
        <Button onClick={handleMoveFinalSubmit} size="LARGE">
          최종 제출 페이지로 이동
        </Button>
      </Row>
    </StyledDraftSubmissionCompletedContent>
  );
};

export default DraftSubmissionCompletedContent;

const StyledDraftSubmissionCompletedContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 48px;
  max-width: 800px;
  height: 100%;
  margin: 62px auto 0;

  opacity: 0;
  animation: show 1.2s 2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;

  pointer-events: none;

  @keyframes show {
    from {
      transform: translateY(200px);
    }
    to {
      transform: translateY(0);
      opacity: 100;
      pointer-events: auto;
    }
  }
`;
