import { color } from '@maru/design-system';
import { type FormStatus } from '@/types/form/client';

interface StatusInfo {
  text: string;
  color: string;
}

export const useStatusFormatter = () => {
  const getSubmissionDocumentStatus = (status: FormStatus): StatusInfo => {
    if (status === 'REJECTED') return { text: '반려', color: color.red };
    if (status === 'SUBMITTED') return { text: '미제출', color: color.black };
    if (status === 'FINAL_SUBMITTED') return { text: '제출', color: color.green };
    if (status === 'RECEIVED') return { text: '접수', color: color.green };
    if (
      [
        'APPROVED',
        'FIRST_FAILED',
        'FAILED',
        'NO_SHOW',
        'FIRST_PASSED',
        'PASSED',
        'ENTERED',
      ].includes(status)
    ) {
      return { text: '승인', color: color.green };
    }
    return { text: '미정', color: color.gray600 };
  };

  const getFirstRoundStatus = (status: FormStatus): StatusInfo => {
    if (status === 'FIRST_FAILED') return { text: '불합격', color: color.red };
    if (['FIRST_PASSED', 'FAILED', 'NO_SHOW', 'ENTERED', 'PASSED'].includes(status)) {
      return { text: '합격', color: color.green };
    }
    return { text: '미정', color: color.gray600 };
  };

  const getSecondRoundStatus = (status: FormStatus): StatusInfo => {
    if (status === 'FAILED') return { text: '불합격', color: color.red };
    if (status === 'NO_SHOW') return { text: '불참', color: color.red };
    if (['PASSED', 'ENTERED'].includes(status))
      return { text: '합격', color: color.green };
    return { text: '미정', color: color.gray600 };
  };

  return {
    getSubmissionDocumentStatus,
    getFirstRoundStatus,
    getSecondRoundStatus,
  };
};
