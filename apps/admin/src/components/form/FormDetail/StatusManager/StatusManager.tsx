import { useOverlay } from '@toss/use-overlay';
import ReceiveStatusChangeModal from '@/components/form/FormDetail/ReceiveStatusChangeModal/ReceiveStatusChangeModal';
import { Button, Column } from '@maru/ui';
import { useFormDetailQuery } from '@/services/form/queries';
interface StatusManagerProps {
  id: number;
}

const StatusManager = ({ id }: StatusManagerProps) => {
	const { data: formDetailData } = useFormDetailQuery(id);

  const overlay = useOverlay();

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

  return (
    <Column gap={16}>
      <Column gap={8}>
        <Button styleType="PRIMARY" size="SMALL" onClick={openReceivedStatusChangeModal}>
          최종 접수 상태 변경
        </Button>
        <Button styleType="SECONDARY" size="SMALL" onClick={handleSubmissionDocumentButtonClick}
        disabled={!formDetailData?.formUrl}>
          제출 서류 조회
        </Button>
      </Column>
    </Column>
  );
};

export default StatusManager;
