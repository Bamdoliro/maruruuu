import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchSecondRoundResult, patchSecondScoreFormat } from './api';
import { toast } from 'react-toastify';
import { KEY } from '@/constants/common/constant';
import type { PatchSecondRoundResultReq } from '@/types/form/remote';
import { useSetIsSecondRoundResultEditingStore } from '@/store/form/isSecondRoundResultEditing';
import { useSetSecondRoundResultStore } from '@/store/form/secondRoundResult';

export const useUploadSecondScoreFormatMutation = (handleCloseModal: () => void) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const { mutate: uploadSecondScoreFormat, ...restMutation } = useMutation({
    mutationFn: (formData: FormData) => patchSecondScoreFormat(formData),
    onSuccess: () => {
      toast('파일이 입력되었습니다.', { type: 'success' });
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      handleCloseModal();
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
