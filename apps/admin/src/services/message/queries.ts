import { KEY } from '@/constants/common/constant';
import type { FormStatus } from '@/types/form/client';
import type { RecipientType } from '@/types/message/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getMessageRecipientList } from './api';

const getRecipientStatus = (recipient: RecipientType): FormStatus =>
  recipient === 'MEISTER_TALENT' || recipient === 'REGULAR'
    ? 'FIRST_PASSED'
    : (recipient as FormStatus);

export const useMessageRecipientListQuery = (recipient: RecipientType) => {
  const status = recipient ? getRecipientStatus(recipient) : null;

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.MESSAGE_RECIPIENT_LIST, status],
    queryFn: () => getMessageRecipientList(status as FormStatus),
    enabled: !!status,
  });

  const filteredData = useMemo(() => {
    if (!data?.dataList) return undefined;

    if (recipient === 'MEISTER_TALENT') {
      return data.dataList.filter((form) => form.type === 'MEISTER_TALENT');
    }
    if (recipient === 'REGULAR') {
      return data.dataList.filter((form) => form.type !== 'MEISTER_TALENT');
    }
    return data.dataList;
  }, [data?.dataList, recipient]);

  return { data: filteredData, ...restQuery };
};
