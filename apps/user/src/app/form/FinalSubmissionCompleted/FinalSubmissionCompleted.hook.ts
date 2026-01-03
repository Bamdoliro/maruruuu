import { ROUTES } from '@/constants/common/constants';
import { useUser, useDownloadFile } from '@/hooks';
import { useExportReceiptQuery } from '@/services/form/queries';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { data: receiptData } = useExportReceiptQuery();
  const { userData } = useUser();
  const downloadFile = useDownloadFile();

  const handleDownloadReceiptButtonClick = () => {
    if (!receiptData) return;

    console.log(receiptData);

    downloadFile(receiptData, `${userData.name} 접수증.pdf`);

    router.push(ROUTES.FORM_MANAGEMENT);
  };

  return { handleDownloadReceiptButtonClick, userData };
};
