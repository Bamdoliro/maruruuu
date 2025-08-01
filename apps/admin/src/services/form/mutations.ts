import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFormUrl,
  patchSecondRoundResult,
  patchSecondRoundResultAuto,
  patchSecondScoreFormat,
} from './api';
import { toast } from 'react-toastify';
import { KEY } from '@/constants/common/constant';
import type { PatchSecondRoundResultReq } from '@/types/form/remote';
import { useSetIsSecondRoundResultEditingStore } from '@/store/form/isSecondRoundResultEditing';
import { useSetSecondRoundResultStore } from '@/store/form/secondRoundResult';
import { isPopupBlocked } from '@/utils';

export const useUploadSecondScoreFormatMutation = (handleCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { mutate: uploadSecondScoreFormat, ...restMutation } = useMutation({
    mutationFn: patchSecondScoreFormat,
    onSuccess: async (res) => {
      const contentType = res.headers?.['content-type'];
      const blob = res.data;
      if (res.status === 204) {
        toast('파일이 입력되었습니다.', { type: 'success' });
        queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
        handleCloseModal();
      } else if (contentType?.includes('application/json')) {
        toast.error('잘못된 파일입니다.');
        handleCloseModal();
      } else if (res.status === 400) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '점수입력_오류결과.xlsx';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.error('오류가 있는 파일이 다운로드되었습니다.');
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

  const setIsSecondRoundResultEditing = useSetIsSecondRoundResultEditingStore();
  const setSecondRoundResult = useSetSecondRoundResultStore();

  const { mutate: editSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: () => patchSecondRoundResult(secondRoundResultData),
    onSuccess: () => {
      toast('2차 합격 여부가 반영되었습니다.', {
        type: 'success',
      });
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

  const { mutate: autoSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: patchSecondRoundResultAuto,
    onSuccess: () => {
      toast('2차 합격 여부가 모두 반영되었습니다.', {
        type: 'success',
      });
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
