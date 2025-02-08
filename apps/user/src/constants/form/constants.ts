import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const SCHEDULE = {
  원서_접수: dayjs(process.env.NEXT_PUBLIC_FORM_START),
  원서_접수_마감: dayjs(process.env.NEXT_PUBLIC_FORM_END),
  일차_합격_발표: dayjs(process.env.NEXT_PUBLIC_FIRST_RESULT),
  이차_면접: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_START),
  이차_면접_종료: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_END),
  최종_합격_발표: dayjs(process.env.NEXT_PUBLIC_FINAL_RESULT),
  입학_등록: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_START),
  입학_등록_마감: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_END),
};
