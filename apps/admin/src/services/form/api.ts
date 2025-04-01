import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { FormListSortingType, FormListType } from '@/types/form/client';
import { GetFormListRes } from '@/types/form/remote';

export const getFormList = async (
  formListType: FormListType,
  formListSortingType?: FormListSortingType
) => {
  let url = '/form';

  if (formListType === '검토해야 하는 원서 모아보기') {
    url = '/form/review';
  }
  if (formListSortingType) {
    if (formListType !== '검토해야 하는 원서 모아보기') {
      const params = new URLSearchParams();
      if (formListSortingType.status) params.append('status', formListSortingType.status);
      if (formListSortingType.type) params.append('type', formListSortingType.type);
      if (formListSortingType.sort) params.append('sort', formListSortingType.sort);

      const queryString = params.toString();
      if (queryString) url += `?${queryString}`;
    }
  }

  const { data } = await maru.get<GetFormListRes>(url, authorization());

  return data;
};

export const getSecondScoreFormat = async () => {
  const { data } = await maru.get('/form/second-round/format', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};
