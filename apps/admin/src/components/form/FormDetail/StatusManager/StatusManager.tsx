import { Button, Column, Loader, Text } from '@maru/ui';
import { useFormDetailQuery } from '@/services/form/queries';
import { styled } from 'styled-components';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import { useStatusFormatter } from '@/components/form/FormDetail/StatusManager/StatusManager.hook';
import ReceiveStatusChangeModal
	from '@/components/form/FormDetail/ReceiveStatusChangeModal/ReceiveStatusChangeModal';
import { useOverlay } from '@toss/use-overlay';

interface StatusManagerProps {
  id: number;
}

const StatusManager = ({ id }: StatusManagerProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  const { getSubmissionDocumentStatus, getFirstRoundStatus, getSecondRoundStatus } = useStatusFormatter();
	const overlay = useOverlay();

	if (!formDetailData) return <Loader />;

	const openReceivedStatusChangeModal = () => {
		overlay.open(({ isOpen, close }) => (
			<ReceiveStatusChangeModal formId={id} isOpen={isOpen} onClose={close} />
		));
	};

	const handleSubmissionDocumentButtonClick = () => {
		if (formDetailData?.formUrl) {
			window.open(formDetailData.formUrl, '_blank');
		}
	};

  const submissionStatus = getSubmissionDocumentStatus(formDetailData?.status);
  const firstRoundStatus = getFirstRoundStatus(formDetailData?.status);
  const secondRoundStatus = getSecondRoundStatus(formDetailData?.status);

  return (
    <Column gap={16}>
      <StyledStatusList>
				<StyledStatusItem>
					<Text fontType='p2' width={60}>제출 서류</Text>
					<Text fontType='p2' width={60} color={submissionStatus?.color}>{submissionStatus.text}</Text>
				</StyledStatusItem>
	      <StyledStatusItem>
		      <Text fontType='p2' width={60}>1차 결과</Text>
		      <Text fontType='p2' width={60} color={firstRoundStatus.color}>{firstRoundStatus.text}</Text>
	      </StyledStatusItem>
	      <StyledStatusItem>
		      <Text fontType='p2' width={60}>최종 점수</Text>
		      <Text fontType='p2' width={60}>{formDetailData.score.totalScore || "미정"}</Text>
	      </StyledStatusItem>
	      <StyledStatusItem>
		      <Text fontType='p2' width={60}>2차 결과</Text>
		      <Text fontType='p2' width={60} color={secondRoundStatus.color}>{secondRoundStatus.text}</Text>
	      </StyledStatusItem>
      </StyledStatusList>
      <Column gap={8}>
        <Button styleType="PRIMARY" size="SMALL" onClick={openReceivedStatusChangeModal} disabled={formDetailData.status === "SUBMITTED"}>
          최종 접수 상태 변경
        </Button>
        <Button
          styleType="SECONDARY"
          size="SMALL"
          onClick={handleSubmissionDocumentButtonClick}
          disabled={!formDetailData?.formUrl || formDetailData?.status === "SUBMITTED"}
        >
          제출 서류 조회
        </Button>
      </Column>
    </Column>
  );
};

export default StatusManager;

const StyledStatusList = styled.div`
	${flex({ flexDirection: 'column', alignItems: 'center'})}
	width: 100%;
  border: 1px solid ${color.gray200};
  border-radius: 12px;
	padding: 4px 0;
`;

const StyledStatusItem = styled.div`
    ${flex({ flexDirection: 'row', alignItems: 'center' })}
    gap: 100px;
    width: 100%;
    padding: 12px 24px;

    &:not(:last-child) {
        border-bottom: 1px solid ${color.gray200};
    }
`;