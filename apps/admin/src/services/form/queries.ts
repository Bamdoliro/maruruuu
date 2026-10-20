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
import { formListSortingTypeAtom, formListTypeAtom, schoolSearchAtom } from '@/store';
import { useAtomValue } from 'jotai';
import type { ExportExcelType } from '@/types/form/client';
import { useEffect, useMemo, useState } from 'react';

export const useFormListQuery = () => {
  const formListType = useAtomValue(formListTypeAtom);
  const formListSortingType = useAtomValue(formListSortingTypeAtom);
  const schoolSearch = useAtomValue(schoolSearchAtom);
  const [debouncedSchoolSearch, setDebouncedSchoolSearch] = useState(schoolSearch.trim());

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSchoolSearch(schoolSearch.trim()), 300);
    return () => clearTimeout(timer);
  }, [schoolSearch]);

  const isReviewList = formListType === '검토해야 하는 원서 모아보기';

  const { data, ...restQuery } = useQuery({
    queryKey: [
      KEY.FORM_LIST,
      formListType,
      formListSortingType,
      isReviewList ? null : debouncedSchoolSearch,
    ],
    queryFn: () => getFormList(formListType, formListSortingType, debouncedSchoolSearch),
  });

  const filteredData = useMemo(() => {
    if (!data?.dataList) return undefined;
    if (!isReviewList || !schoolSearch) return data.dataList;

    return data.dataList.filter((form) => (form.school ?? '').includes(schoolSearch));
  }, [data?.dataList, isReviewList, schoolSearch]);

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
