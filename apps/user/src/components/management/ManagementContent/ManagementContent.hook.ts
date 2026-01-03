import { ROUTES } from '@/constants/common/constants';
import { useUser, useDownloadFile } from '@/hooks';
import { useExportFormQuery, useExportReceiptQuery } from '@/services/form/queries';
import { useDownloadAdmissionTicketQuery } from '@/services/result/queries';
import { useRouter } from 'next/navigation';

export const useBoxClick = (status?: string) => {
  const router = useRouter();
  const { userData } = useUser();
  const downloadFile = useDownloadFile();
  const { data: exportFormData } = useExportFormQuery();
  const { data: receiptData } = useExportReceiptQuery();
  const { data: admissionTicketData } = useDownloadAdmissionTicketQuery();

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
      downloadFile(
        exportFormData,
        `${userData.name} 부산소프트웨어마이스터고등학교 원서.pdf`
      );
    }
  };

  const handleDownloadReceipt = () => {
    const accept =
      status === 'FINAL_SUBMITTED' || status === 'APPROVED' || status === 'RECEIVED';

    if (!accept) {
      alert('원서가 미제출 상태이거나 확인 중에 있어, 다운로드할 수 없습니다.');
    } else {
      downloadFile(receiptData, `${userData.name} 접수증.pdf`);
    }
  };

  const handleDownloadAdmissionTicket = () => {
    if (!(status === 'FIRST_PASSED')) {
      alert('1차 합격일때만 수험표를 출력할 수 있습니다.');
    } else {
      downloadFile(admissionTicketData, `${userData.name} 수험표.pdf`);
    }
  };

  return {
    handleWriteFormContinue,
    handleDownloadForm,
    handleDownloadReceipt,
    handleDownloadAdmissionTicket,
  };
};
