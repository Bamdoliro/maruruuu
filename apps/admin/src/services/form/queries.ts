import { KEY } from '@/constants/common/constant';
import {
  getAllAdmissionTicket,
  getExportExcel,
  getExportScoreExcel,
  getFormDetail,
  getFormList,
  getSecondScoreFormat,
} from './api';
import { useQuery } from '@tanstack/react-query';
import {
  useFormListSortingTypeValueStore,
  useFormListTypeValueStore,
  useSchoolSearchValueStore,
} from '@/store';
import type { ExportExcelType } from '@/types/form/client';
import { useMemo } from 'react';

export const useFormListQuery = () => {
  const formListType = useFormListTypeValueStore();
  const formListSortingType = useFormListSortingTypeValueStore();
  const schoolSearch = useSchoolSearchValueStore();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_LIST, formListType, formListSortingType],
    queryFn: () => getFormList(formListType, formListSortingType),
  });

  const filteredData = useMemo(() => {
    if (!data?.dataList) return undefined;
    if (!schoolSearch) return data.dataList;

    return data.dataList.filter((form) => form.school.includes(schoolSearch));
  }, [data?.dataList, schoolSearch]);

  return { data: filteredData, ...restQuery };
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
    queryFn: getAllAdmissionTicket,
  });

  return { data, ...restQuery };
};

export const useFormDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_DETAIL, id],
    queryFn: () => getFormDetail(id),
  });

  return { data: data?.data, ...restQuery };
};

export const useExportScoreExcelQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_EXPORT_SCORE_EXCEL],
    queryFn: getExportScoreExcel,
  });

  return { data, ...restQuery };
};
