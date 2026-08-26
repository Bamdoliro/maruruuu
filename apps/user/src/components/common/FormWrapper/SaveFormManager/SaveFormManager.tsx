import { useSaveFormQuery } from '@/services/form/queries';
import {
  isSaveFormLoadedAtom,
  formAtom,
  GEDSubjectListAtom,
  newGEDSubjectListAtom,
  newSubjectListAtom,
  subjectListAtom,
} from '@/stores';
import { useAtom, useSetAtom } from 'jotai';
import type { Subject } from '@/types/form/client';
import { updateSlicedSubjectList } from '@/utils';
import { useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const SaveFormManager = () => {
  const { data: saveFormData } = useSaveFormQuery();
  const [isSaveFormLoaded, setIsSaveFormLoaded] = useAtom(isSaveFormLoadedAtom);
  const setForm = useSetAtom(formAtom);
  const setSubjectList = useSetAtom(subjectListAtom);
  const setNewSubjectList = useSetAtom(newSubjectListAtom);
  const setGEDSubjectList = useSetAtom(GEDSubjectListAtom);
  const setNewGEDSubjectList = useSetAtom(newGEDSubjectListAtom);

  useEffect(() => {
    if (!saveFormData || isSaveFormLoaded) return;

    const subjectList = saveFormData.grade.subjectList;
    const graduationType = saveFormData.education.graduationType;

    setForm((prev) => ({ ...prev, ...saveFormData }));

    if (subjectList) {
      const updateSubjects: [
        Dispatch<SetStateAction<Subject[]>>,
        Dispatch<SetStateAction<Subject[]>>,
        number,
      ] =
        graduationType === 'QUALIFICATION_EXAMINATION'
          ? [setGEDSubjectList, setNewGEDSubjectList, 5]
          : [setSubjectList, setNewSubjectList, 12];

      updateSubjects[0](updateSlicedSubjectList(subjectList, 0, updateSubjects[2]));
      updateSubjects[1](updateSlicedSubjectList(subjectList, updateSubjects[2]));
    }

    setIsSaveFormLoaded(true);
  }, [
    isSaveFormLoaded,
    saveFormData,
    setForm,
    setGEDSubjectList,
    setIsSaveFormLoaded,
    setNewGEDSubjectList,
    setNewSubjectList,
    setSubjectList,
  ]);

  return null;
};

export default SaveFormManager;
