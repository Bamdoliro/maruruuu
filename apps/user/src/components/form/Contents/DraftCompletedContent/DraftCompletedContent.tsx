import { color } from '@maru/design-system';
import { IconCheckCircle } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useFormValueStore } from '@/stores';

interface DraftCompletedContentProps {
  onClick: () => void;
  check: () => void;
}

const DraftCompletedContent = ({ onClick, check }: DraftCompletedContentProps) => {
  const form = useFormValueStore();

  return (
    <StyledDraftCompletedContent>
      <Row gap={8} alignItems="center">
        <IconCheckCircle width={64} height={64} />
        <Text fontType="H1" color={color.gray900}>
          원서 초안 작성 완료
        </Text>
      </Row>
      <Column gap={12} style={{ maxWidth: '80%' }}>
        <Text fontType="p1" color={color.gray900}>
          원서 초안 작성이 완료되었습니다.
        </Text>
        <Text fontType="p1" color={color.gray900}>
          졸업증명서, 성적증명서 등 추가 서류를 반드시 제출해야 합니다.
        </Text>
        {form.education.graduationType === 'QUALIFICATION_EXAMINATION' ? (
          <Text fontType="H4" color={color.red}>
            작성한 원서 초안을 출력하여 <br />
            추가 서류와 인터넷 탑재해야만 원서 접수가 완료됩니다.
          </Text>
        ) : (
          <Text fontType="H4" color={color.red}>
            작성한 원서 초안을 출력하여 학교장 직인 날인 후 <br />
            추가 서류와 인터넷 탑재해야만 원서 접수가 완료됩니다.
          </Text>
        )}
      </Column>
      <Column gap={24}>
        <Text fontType="H3" color={color.gray900}>
          제출하시겠습니까?
        </Text>
        <Row gap={16}>
          <Button onClick={onClick} styleType="SECONDARY" size="LARGE">
            원서 작성으로 되돌아가기
          </Button>
          <Button onClick={check} size="LARGE">
            제출
          </Button>
        </Row>
      </Column>
    </StyledDraftCompletedContent>
  );
};

export default DraftCompletedContent;

const StyledDraftCompletedContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 48px;
  max-width: 800px;
  height: 100%;
  margin: 62px auto 240px;

  opacity: 0;
  animation: show 1.2s 2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;

  pointer-events: none;

  @keyframes show {
    from {
      transform: translateY(200px);
    }
    to {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }
  }
`;
