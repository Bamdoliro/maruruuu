import { ROUTES } from '@/constants/common/constants';
import { useUser } from '@/hooks';
import { useDownloadAdmissionTicketQuery } from '@/services/result/queries';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { data: admissionTicketData } = useDownloadAdmissionTicketQuery();
  const { userData } = useUser();

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  const handleDownloadAdmissionsGuideline = () => {
    window.open(process.env.NEXT_PUBLIC_ADMISSION_GUIDELINES);
  };

  const handleDownloadAdmissionTicket = () => {
    if (!admissionTicketData) return;

    const admissionTicket = window.URL.createObjectURL(new Blob([admissionTicketData]));

    const link = document.createElement('a');
    link.href = admissionTicket;
    link.download = `${userData.name} 수험표.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(admissionTicket);
  };

  return {
    handleMoveMainPage,
    handleDownloadAdmissionsGuideline,
    handleDownloadAdmissionTicket,
  };
};
