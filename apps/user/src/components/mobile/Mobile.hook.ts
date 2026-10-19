import { useUser, useDownloadFile } from '@/hooks';
import { useLoginMutation } from '@/services/auth/mutations';
import { useDownloadAdmissionTicketMutation } from '@/services/result/mutations';
import { stepAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { PostLoginReq } from '@/types/auth/remote';
import type { Step } from '@/types/mobile/client';
import dayjs from 'dayjs';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';
import { useToast } from '@maru/hooks';
import { useSchedule } from '@/services/schedule/queries';
dayjs.extend(isBetween);

export const useMobile = (step: Step) => {
  const schedule = useSchedule();
  const [login, setLogin] = useState<PostLoginReq>({
    phoneNumber: '',
    password: '',
  });
  const setStep = useSetAtom(stepAtom);
  const { downloadAdmissionTicketMutate } = useDownloadAdmissionTicketMutation('MOBILE');
  const { userData } = useUser();
  const downloadFile = useDownloadFile();
  const { loginMutate } = useLoginMutation('MOBILE', login);
  const now = dayjs();
  const { toast } = useToast();

  const handleMoveStep = () => {
    setStep(step);
  };

  const handleDownloadAdmissionTicket = () => {
    downloadAdmissionTicketMutate(undefined, {
      onSuccess: (data) => downloadFile(data, `${userData.name} 수험표.pdf`),
    });
  };

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = () => {
    if (!now.isBetween(schedule.일차_합격_발표, schedule.입학_등록)) {
      toast('아직 합격 발표일이 아닙니다!', 'ERROR', 'MOBILE');
      return;
    }

    loginMutate();
  };

  return {
    handleMoveStep,
    handleDownloadAdmissionTicket,
    handleLoginChange,
    handleLogin,
  };
};
