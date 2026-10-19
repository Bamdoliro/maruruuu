import { ROUTES } from '@/constants/common/constants';
import { useUser, useDownloadFile } from '@/hooks';
import { useDownloadAdmissionTicketMutation } from '@/services/result/mutations';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { downloadAdmissionTicketMutate } = useDownloadAdmissionTicketMutation();
  const { userData } = useUser();
  const downloadFile = useDownloadFile();

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  const handleDownloadAdmissionsGuideline = () => {
    window.open(process.env.NEXT_PUBLIC_ADMISSION_GUIDELINES);
  };

  const handleDownloadAdmissionTicket = () => {
    downloadAdmissionTicketMutate(undefined, {
      onSuccess: (data) => downloadFile(data, `${userData.name} 수험표.pdf`),
    });
  };

  return {
    handleMoveMainPage,
    handleDownloadAdmissionsGuideline,
    handleDownloadAdmissionTicket,
  };
};
