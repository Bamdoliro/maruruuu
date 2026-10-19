import { useMutation } from '@tanstack/react-query';
import { getAdmissionTicket } from './api';
import { useToast } from '@maru/hooks';

export const useDownloadAdmissionTicketMutation = (
  device: 'MOBILE' | 'COMPUTER' = 'COMPUTER',
) => {
  const { toast } = useToast();

  const { mutate: downloadAdmissionTicketMutate, ...restMutation } = useMutation({
    mutationFn: getAdmissionTicket,
    onError: () => {
      toast('수험표를 불러오지 못했습니다.', 'ERROR', device);
    },
  });

  return { downloadAdmissionTicketMutate, ...restMutation };
};
