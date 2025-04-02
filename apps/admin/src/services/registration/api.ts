import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetFormListRes } from '@/types/form/remote';
import { GetRegistrationListRes } from '@/types/registration/remote';

export const getRegistrationList = async () => {
  const { data } = await maru.get<GetFormListRes>('forms?status=PASSED', authorization());

  const idList = data.dataList.map((item) => item.id).join(',');
  const encodedIdList = encodeURIComponent(idList);

  const { data: returnData } = await maru.get<GetRegistrationListRes>(
    `/forms/admission-and-pledges?id-list=${encodedIdList}`,
    authorization()
  );

  return returnData;
};
