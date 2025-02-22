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
    window.open(
      'https://school.busanedu.net/viewer/doc.html?fn=f9ccabacf50aba9dbe108bdbccf244f34b1a4bf9118f8c63e034e9af8c30afc1&rs=/upload/temp/convertToHtml/202308/bssm-h/'
    );
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
