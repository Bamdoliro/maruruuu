import { useUser } from '@/hooks';
import { useLoginMutation } from '@/services/auth/mutations';
import { useDownloadAdmissionTicketQuery } from '@/services/result/queries';
import { useSetStepStore } from '@/stores';
import type { PostLoginReq } from '@/types/auth/remote';
import type { Step } from '@/types/mobile/client';
import dayjs from 'dayjs';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';
import { useToast } from '@maru/hooks';
import { SCHEDULE } from '@/constants/common/constants';
dayjs.extend(isBetween);

export const useMobile = (step: Step) => {
  const [login, setLogin] = useState<PostLoginReq>({
    phoneNumber: '',
    password: '',
  });
  const setStep = useSetStepStore();
  const { data: admissionTicketData } = useDownloadAdmissionTicketQuery();
  const { userData } = useUser();
  const { loginMutate } = useLoginMutation('MOBILE', login);
  const now = dayjs();
  const { toast } = useToast();

  const handleMoveStep = () => {
    setStep(step);
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

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = () => {
    if (now.isBetween(SCHEDULE.일차_합격_발표, SCHEDULE.입학_등록)) {
      loginMutate();
    }
    toast('아직 합격 발표일이 아닙니다!', 'ERROR', 'MOBILE');
  };

  return {
    handleMoveStep,
    handleDownloadAdmissionTicket,
    handleLoginChange,
    handleLogin,
  };
};
