import dayjs from 'dayjs';
import { SCHEDULE } from '@/constants/common/constants';

export const getStatusConfig = (status?: string) => {
  const now = dayjs();

  const firstResult = now.isAfter(SCHEDULE.일차_합격_발표);
  const finalResult = now.isAfter(SCHEDULE.최종_합격_발표);

  const statusConfig = {
    APPROVED: {
      text: '승인됨',
      scriptParts: ['원서가 승인되었습니다.', '{name}님의 1차 합격을 기원합니다!'],
    },
    FIRST_FAILED: {
      text: firstResult ? '1차 불합격' : '검토중',
      scriptParts: firstResult
        ? ['1차 전형에서 불합격하셨습니다.', '관심을 가지고 지원해 주셔서 감사합니다.']
        : ['아직 1차 합격자 발표일이 아닙니다.', '발표일까지 기다려 주세요.'],
    },
    FAILED: {
      text: finalResult ? '최종 불합격' : '검토중',
      scriptParts: finalResult
        ? ['최종 전형에서 불합격하셨습니다.', '관심을 가지고 지원해 주셔서 감사합니다.']
        : ['아직 최종 합격자 발표일이 아닙니다.', '발표일까지 기다려 주세요.'],
    },
    FINAL_SUBMITTED: {
      text: '최종 제출됨',
      scriptParts: [
        '원서가 최종 제출되었습니다.',
        '담당 선생님의 원서 승인을 기다려주세요.',
      ],
    },
    SUBMITTED: {
      text: '초안 제출됨',
      scriptParts: [
        '원서 초안이 제출되었습니다.',
        '담당 선생님의 원서 승인을 기다려주세요.',
      ],
    },
    RECEIVED: {
      text: '확인중',
      scriptParts: ['원서가 확인 중입니다.', '담당 선생님의 원서 승인을 기다려주세요.'],
    },
    NO_SHOW: {
      text: finalResult ? '불참' : '검토중',
      scriptParts: finalResult
        ? ['2차 전형에 참여하지 않으셨기에', '자동 불합격 처리되셨습니다.']
        : ['아직 최종 합격자 발표일이 아닙니다.', '발표일까지 기다려 주세요.'],
    },
    FIRST_PASSED: {
      text: firstResult ? '1차 합격' : '검토중',
      scriptParts: firstResult
        ? ['1차 합격하셨습니댜.', '남은 전형도 힘내시길 바랍니다.']
        : ['아직 1차 합격자 발표일이 아닙니다.', '발표일까지 기다려 주세요.'],
    },
    PASSED: {
      text: finalResult ? '최종합격' : '검토중',
      scriptParts: finalResult
        ? ['최종 합격하셨습니댜.', '위대한 여정의 시작을 축하드립니다.']
        : ['아직 최종 합격자 발표일이 아닙니다.', '발표일까지 기다려 주세요.'],
    },
    REJECTED: {
      text: '반려됨',
      scriptParts: [
        '원서가 반려되었습니다.',
        '제출하신 원서를 다시 확인해주시기 바랍니다.',
        '궁금하신 사항은 교무실에 문의해주시기 바랍니다.',
      ],
    },
    ENTERED: {
      text: '입학',
      scriptParts: ['부산소프트웨어마이스터고 입학을', '진심으로 축하드립니다!'],
    },
    DEFAULT: {
      text: '제출전',
      scriptParts: [] as string[],
    },
  };

  return statusConfig[status as keyof typeof statusConfig] || statusConfig.DEFAULT;
};
