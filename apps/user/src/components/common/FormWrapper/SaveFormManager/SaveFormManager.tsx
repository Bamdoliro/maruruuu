import { INFORMATION_FIRST_GRADE_KEYS } from '@/constants/form/constants';
import { GED_SUBJECT_LIST, SUBJECT_LIST } from '@/constants/form/data';
import { useSaveFormQuery } from '@/services/form/queries';
import {
  isSaveFormLoadedAtom,
  formAtom,
  GEDSubjectListAtom,
  newGEDSubjectListAtom,
  subjectListAtom,
} from '@/stores';
import { getHighestCertificateList, updateSlicedSubjectList } from '@/utils';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

const SaveFormManager = () => {
  const { data: saveFormData } = useSaveFormQuery();
  const [isSaveFormLoaded, setIsSaveFormLoaded] = useAtom(isSaveFormLoadedAtom);
  const setForm = useSetAtom(formAtom);
  const setSubjectList = useSetAtom(subjectListAtom);
  const setGEDSubjectList = useSetAtom(GEDSubjectListAtom);
  const setNewGEDSubjectList = useSetAtom(newGEDSubjectListAtom);

  useEffect(() => {
    if (!saveFormData || isSaveFormLoaded) return;

    const subjectList = saveFormData.grade.subjectList;
    const graduationType = saveFormData.education.graduationType;

    setForm((prev) => ({
      ...prev,
      ...saveFormData,
      grade: {
        ...prev.grade,
        ...saveFormData.grade,
        certificateList: getHighestCertificateList(saveFormData.grade.certificateList),
      },
    }));

    if (subjectList) {
      if (graduationType === 'QUALIFICATION_EXAMINATION') {
        const GEDSubjectCount = GED_SUBJECT_LIST.length;

        setGEDSubjectList(updateSlicedSubjectList(subjectList, 0, GEDSubjectCount));
        setNewGEDSubjectList(updateSlicedSubjectList(subjectList, GEDSubjectCount));
      } else {
        setSubjectList(
          SUBJECT_LIST.map((subject, index) => {
            const savedSubject = subjectList.find(
              ({ subjectName }) => subjectName === subject.subjectName,
            );

            if (!savedSubject) return subject;

            const restoredSubject = { ...subject, ...savedSubject, id: index };

            INFORMATION_FIRST_GRADE_KEYS.forEach((key) => {
              if (!(key in savedSubject)) delete restoredSubject[key];
            });

            return restoredSubject;
          }),
        );
      }
    }

    setIsSaveFormLoaded(true);
  }, [
    isSaveFormLoaded,
    saveFormData,
    setForm,
    setGEDSubjectList,
    setIsSaveFormLoaded,
    setNewGEDSubjectList,
    setSubjectList,
  ]);

  return null;
};

export default SaveFormManager;
