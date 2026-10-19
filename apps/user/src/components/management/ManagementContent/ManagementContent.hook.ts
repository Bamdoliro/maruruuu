import { ROUTES } from '@/constants/common/constants';
import { useUser, useDownloadFile } from '@/hooks';
import {
  useExportFormMutation,
  useExportReceiptMutation,
} from '@/services/form/mutations';
import { useDownloadAdmissionTicketMutation } from '@/services/result/mutations';
import { useRouter } from 'next/navigation';

export const useBoxClick = (status?: string) => {
  const router = useRouter();
  const { userData } = useUser();
  const downloadFile = useDownloadFile();
  const { exportFormMutate } = useExportFormMutation();
  const { exportReceiptMutate } = useExportReceiptMutation();
  const { downloadAdmissionTicketMutate } = useDownloadAdmissionTicketMutation();

  const handleWriteFormContinue = () => {
    const banStatus =
      status === 'APPROVED' ||
      status === 'FINAL_SUBMITTED' ||
      status === 'PASSED' ||
      status === 'RECEIVED' ||
      status === 'FIRST_PASSED' ||
      status === 'FAILED' ||
      status === 'FIRST_FAILED' ||
      status === 'NO_SHOW' ||
      status === 'ENTERED';

    if (banStatus) {
      alert('원서를 제출한 상태입니다.');
    } else {
      router.push(ROUTES.FORM);
    }
  };

  const handleDownloadForm = () => {
    const accept = ['FINAL_SUBMITTED', 'APPROVED', 'RECEIVED', 'REJECTED'];

    if (!status || !accept.includes(status)) {
      alert('원서를 제출하지 않아, 다운로드 할 수 없습니다.');
    } else {
      exportFormMutate(undefined, {
        onSuccess: (data) =>
          downloadFile(data, `${userData.name} 부산소프트웨어마이스터고등학교 원서.pdf`),
      });
    }
  };

  const handleDownloadReceipt = () => {
    const accept =
      status === 'FINAL_SUBMITTED' || status === 'APPROVED' || status === 'RECEIVED';

    if (!accept) {
      alert('원서가 미제출 상태이거나 확인 중에 있어, 다운로드할 수 없습니다.');
    } else {
      exportReceiptMutate(undefined, {
        onSuccess: (data) => downloadFile(data, `${userData.name} 접수증.pdf`),
      });
    }
  };

  const handleDownloadAdmissionTicket = () => {
    if (!(status === 'FIRST_PASSED')) {
      alert('1차 합격일때만 수험표를 출력할 수 있습니다.');
    } else {
      downloadAdmissionTicketMutate(undefined, {
        onSuccess: (data) => downloadFile(data, `${userData.name} 수험표.pdf`),
      });
    }
  };

  return {
    handleWriteFormContinue,
    handleDownloadForm,
    handleDownloadReceipt,
    handleDownloadAdmissionTicket,
  };
};
