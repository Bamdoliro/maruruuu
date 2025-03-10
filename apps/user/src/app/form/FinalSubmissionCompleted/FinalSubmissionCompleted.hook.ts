import { ROUTES } from '@/constants/common/constants';
import { useUser } from '@/hooks';
import { useExportReciptQuery } from '@/services/form/queries';
import { useDownloadFile } from '@/utils';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { data: reciptData } = useExportReciptQuery();
  const { userData } = useUser();

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  const handleDownloadReciptButtonClick = () => {
    if (!reciptData) return;

    useDownloadFile(reciptData, `${userData.name} 접수증.pdf`);
  };

  return { handleMoveMainPage, handleDownloadReciptButtonClick, userData };
};
