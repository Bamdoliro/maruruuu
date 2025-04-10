import type { SaveSubject } from '@/types/form/client';

const updateSlicedSubjectList = (
  subjectList: SaveSubject[],
  start: number,
  end?: number
) => {
  return subjectList.slice(start, end).map((subject, index) => ({
    ...subject,
    id: index,
  }));
};

export default updateSlicedSubjectList;
