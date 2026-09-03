import { CERTIFICATE_SCORE } from '@/constants/form/constants';
import type { Certificate } from '@/types/form/client';

const getHighestCertificateList = (certificateList?: Certificate[]): Certificate[] => {
  if (!certificateList?.length) return [];

  const highestCertificate = certificateList.reduce((highest, certificate) =>
    CERTIFICATE_SCORE[certificate] > CERTIFICATE_SCORE[highest] ? certificate : highest,
  );

  return [highestCertificate];
};

export default getHighestCertificateList;
