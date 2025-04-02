import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchSecondScoreFormat } from './api';
import { toast } from 'react-toastify';
import { KEY } from '@/constants/common/constant';

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
