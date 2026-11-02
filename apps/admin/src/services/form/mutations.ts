import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import {
  getApplicationFormExcel,
  getFormUrl,
  getMergedFormPdf,
  patchReceiveStatus,
  patchSecondRoundResult,
  patchSecondRoundResultAuto,
  patchSecondScoreFormat,
} from './api';
import { useToast } from '@maru/hooks';
import { KEY } from '@/constants/common/constant';
import type { PatchSecondRoundResultReq } from '@/types/form/remote';
import { isSecondRoundResultEditingAtom, secondRoundResultAtom } from '@/store';
import { useSetAtom } from 'jotai';
import { isPopupBlocked } from '@/utils';
import type { ReceiveStatusValue } from '@/types/form/client';

export const useUploadSecondScoreFormatMutation = (handleCloseModal: () => void) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: uploadSecondScoreFormat, ...restMutation } = useMutation({
    mutationFn: patchSecondScoreFormat,
    onSuccess: () => {
      toast('파일이 입력되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      handleCloseModal();
    },
    onError: async (error) => {
      if (!isAxiosError(error) || !(error.response?.data instanceof Blob)) {
        handleError(error as AxiosError<never>);
        return;
      }

      const { status, headers, data: blob } = error.response;
      const isJsonResponse = String(headers['content-type'] ?? '').includes(
        'application/json',
      );

      if (status === 400 && !isJsonResponse) {
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
        return;
      }

      if (status === 400) {
        toast('잘못된 파일입니다.', 'ERROR');
        handleCloseModal();
        return;
      }

      try {
        error.response.data = isJsonResponse ? JSON.parse(await blob.text()) : {};
      } catch {
        error.response.data = {};
      }
      handleError(error as AxiosError<never>);
    },
  });

  return { uploadSecondScoreFormat, ...restMutation };
};

export const useEditSecondRoundResultMutation = (
  secondRoundResultData: PatchSecondRoundResultReq,
) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const setIsSecondRoundResultEditing = useSetAtom(isSecondRoundResultEditingAtom);
  const setSecondRoundResult = useSetAtom(secondRoundResultAtom);

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

export const useMergeFormPdfMutation = () => {
  const { handleError } = useApiError();

  const { mutate: mergeFormPdf, ...restMutation } = useMutation({
    mutationFn: (formIdList: number[]) => getMergedFormPdf(formIdList),
    onSuccess: (data) => {
      const pdfUrl = window.URL.createObjectURL(
        new Blob([data], { type: 'application/pdf' }),
      );

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = '원서 병합.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(pdfUrl);
    },
    onError: handleError,
  });

  return { mergeFormPdf, ...restMutation };
};

export const useExportApplicationFormExcelMutation = () => {
  const { handleError } = useApiError();

  const { mutate: exportApplicationFormExcel, ...restMutation } = useMutation({
    mutationFn: getApplicationFormExcel,
    onSuccess: (data) => {
      const excelUrl = window.URL.createObjectURL(
        new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );

      const link = document.createElement('a');
      link.href = excelUrl;
      link.download = '고입업무지원시스템 지원자등록양식.xlsx';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(excelUrl);
    },
    onError: handleError,
  });

  return { exportApplicationFormExcel, ...restMutation };
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
