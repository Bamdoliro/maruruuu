import { ROUTES } from '@/constants/common/constants';
import { useUser, useDownloadFile } from '@/hooks';
import { useExportReciptQuery } from '@/services/form/queries';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { data: reciptData } = useExportReciptQuery();
  const { userData } = useUser();
  const downloadFile = useDownloadFile();

  const handleDownloadReciptButtonClick = () => {
    if (!reciptData) return;

    console.log(reciptData);

    downloadFile(reciptData, `${userData.name} 접수증.pdf`);

    router.push(ROUTES.FORM_MANAGEMENT);
  };

  return { handleDownloadReciptButtonClick, userData };
};
