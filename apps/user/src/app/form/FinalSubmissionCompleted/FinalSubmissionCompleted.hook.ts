import { ROUTES } from '@/constants/common/constants';
import { useUser, useDownloadFile } from '@/hooks';
import { useExportReceiptMutation } from '@/services/form/mutations';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { exportReceiptMutate } = useExportReceiptMutation();
  const { userData } = useUser();
  const downloadFile = useDownloadFile();

  const handleDownloadReceiptButtonClick = () => {
    exportReceiptMutate(undefined, {
      onSuccess: (data) => {
        downloadFile(data, `${userData.name} 접수증.pdf`);
        router.push(ROUTES.FORM_MANAGEMENT);
      },
    });
  };

  return { handleDownloadReceiptButtonClick, userData };
};
