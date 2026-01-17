import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFormUrl,
  patchReceiveStatus,
  patchSecondRoundResult,
  patchSecondRoundResultAuto,
  patchSecondScoreFormat,
} from './api';
import { useToast } from '@maru/hooks';
import { KEY } from '@/constants/common/constant';
import type { PatchSecondRoundResultReq } from '@/types/form/remote';
import {
  useSetIsSecondRoundResultEditingStore,
  useSetSecondRoundResultStore,
} from '@/store';
import { isPopupBlocked } from '@/utils';
import type { ReceiveStatusValue } from '@/types/form/client';

export const useUploadSecondScoreFormatMutation = (handleCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: uploadSecondScoreFormat, ...restMutation } = useMutation({
    mutationFn: patchSecondScoreFormat,
    onSuccess: async (data) => {
      const contentType = data.headers?.['content-type'];
      const blob = data.data;
      if (data.status === 204) {
        toast('파일이 입력되었습니다.', 'SUCCESS');
        queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
        handleCloseModal();
      } else if (contentType?.includes('application/json')) {
        toast('잘못된 파일입니다.', 'ERROR');
        handleCloseModal();
      } else if (data.status === 400) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '점수입력_오류결과.xlsx';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast('오류가 있는 파일이 다운로드되었습니다.', 'ERROR');
        handleCloseModal();
      }
    },
    onError: handleError,
  });

  return { uploadSecondScoreFormat, ...restMutation };
};

export const useEditSecondRoundResultMutation = (
  secondRoundResultData: PatchSecondRoundResultReq
) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const setIsSecondRoundResultEditing = useSetIsSecondRoundResultEditingStore();
  const setSecondRoundResult = useSetSecondRoundResultStore();

  const { mutate: editSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: () => patchSecondRoundResult(secondRoundResultData),
    onSuccess: () => {
      toast('2차 합격 여부가 반영되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      setIsSecondRoundResultEditing(false);
      setSecondRoundResult({});
    },
    onError: handleError,
  });

  return { editSecondRoundResult, ...restMutation };
};

export const useAutoSecondRoundResultMutation = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: autoSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: patchSecondRoundResultAuto,
    onSuccess: () => {
      toast('2차 합격 여부가 모두 반영되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
    },
    onError: handleError,
  });

  return { autoSecondRoundResult, ...restMutation };
};

export const usePrintFormUrlMutation = () => {
  const { handleError } = useApiError();

  const { mutate: printFormUrl, ...restMutation } = useMutation({
    mutationFn: (formIdList: number[]) => getFormUrl(formIdList),
    onSuccess: (data) => {
      let hasShownAlert = false;
      data.dataList.forEach((form) => {
        const link = window.open(form.formUrl);

        if (isPopupBlocked(link) && !hasShownAlert) {
          alert('팝업 및 리디렉션을 허용해주세요');
          hasShownAlert = true;
        }
      });
    },
    onError: handleError,
  });

  return { printFormUrl, ...restMutation };
};

export const useReceiveStatusChangeMutation = (formId: number, onClose: () => void) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: changeReceiveStatus, ...restMutation } = useMutation({
    mutationFn: (status: ReceiveStatusValue) => patchReceiveStatus(formId, status),
    onSuccess: () => {
      toast('접수 상태가 변경되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_DETAIL, formId] });
      onClose();
    },
    onError: handleError,
  });

  return { changeReceiveStatus, ...restMutation };
};
