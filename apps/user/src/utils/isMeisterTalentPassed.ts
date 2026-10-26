import type { Result } from '@/types/result/client';

const isMeisterTalentPassed = (result?: Result): boolean => {
  return result?.type === '마이스터인재전형' && !result.changedToRegular;
};

export default isMeisterTalentPassed;
