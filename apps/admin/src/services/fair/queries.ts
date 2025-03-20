import { KEY } from '@/constants/common/constant';
import { useQuery } from '@tanstack/react-query';
import { getFairDetail, getFairExportExcel, getFairList } from './api';

export const useFairListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAIR_LIST],
    queryFn: getFairList,
  });

  return { data: data?.dataList, ...restQuery };
};

export const useFairDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAIR_DETAIL, id],
    queryFn: () => getFairDetail(id),
  });

  return { data: data?.data, ...restQuery };
};

export const useFairExportExcelQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAIR_EXPORT_EXCEL, id],
    queryFn: () => getFairExportExcel(id),
  });

  return { data: data, ...restQuery };
};
