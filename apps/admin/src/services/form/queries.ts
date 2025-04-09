import { KEY } from '@/constants/common/constant';
import {
  getAllAdmissionTicket,
  getExportExcel,
  getFormList,
  getSecondScoreFormat,
} from './api';
import { useQuery } from '@tanstack/react-query';
import {
  useFormListSortingTypeValueStore,
  useFormListTypeValueStore,
} from '@/store/form/formType';
import type { ExportExcelType } from '@/types/form/client';

export const useFormListQuery = () => {
  const formListType = useFormListTypeValueStore();
  const formListSortingType = useFormListSortingTypeValueStore();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_LIST, formListType, formListSortingType],
    queryFn: () => getFormList(formListType, formListSortingType),
  });

  return { data: data?.dataList, ...restQuery };
};

export const useExportSecondScoreFormatQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SECOND_SCORE_FORMAT],
    queryFn: getSecondScoreFormat,
  });

  return { data, ...restQuery };
};

export const useExportExcelQuery = (exportExcelType: ExportExcelType) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_EXPORT_EXCEL, exportExcelType],
    queryFn: () => getExportExcel(exportExcelType),
  });

  return { data, ...restQuery };
};

export const useExportAllAddmissionTicket = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_EXPORT_ALL_ADMISSION_TICKET],
    queryFn: () => getAllAdmissionTicket(),
  });

  return { data, ...restQuery };
};
