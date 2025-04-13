import { Confirm, Text } from '@maru/ui';
import { color } from '@maru/design-system';

interface MessageConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const MessageConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: MessageConfirmModalProps) => {
  return (
    <Confirm
      isOpen={isOpen}
      title="메시지를 발송하시겠습니까?"
      content={
        <>
          <Text fontType="p2" color={color.gray900}>
            메시지를 올바르게 작성했는지 다시 한 번 검토해주세요.
          </Text>
          <Text fontType="p2" color={color.red}>
            ※ 한 번 발송된 메시지는 수정이 불가능합니다.
          </Text>
          <Text fontType="p2" color={color.red}>
            꼭 잘못된 정보가 있는지 다시 한 번 확인해주세요.
          </Text>
        </>
      }
      onClose={onClose}
      onConfirm={onConfirm}
      closeButtonText="취소"
      confirmButtonText="문자 메시지 발송하기"
      height={350}
    />
  );
};

export default MessageConfirmModal;
