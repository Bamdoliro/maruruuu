import { useSaveFormQuery } from '@/services/form/queries';
import {
  useIsSaveFormLoadedStore,
  useSetFormStore,
  useSetGEDSubjectListStore,
  useSetNewGEDSubjectListStore,
  useSetNewSubjectListStore,
  useSetSubjectListStore,
} from '@/stores';
import type { Subject } from '@/types/form/client';
import { updateSlicedSubjectList } from '@/utils';
import { useEffect } from 'react';
import type { SetterOrUpdater } from 'recoil';

const SaveFormManager = () => {
  const { data: saveFormData } = useSaveFormQuery();
  const [isSaveFormLoaded, setIsSaveFormLoaded] = useIsSaveFormLoadedStore();
  const setForm = useSetFormStore();
  const setSubjectList = useSetSubjectListStore();
  const setNewSubjectList = useSetNewSubjectListStore();
  const setGEDSubjectList = useSetGEDSubjectListStore();
  const setNewGEDSubjectList = useSetNewGEDSubjectListStore();

  useEffect(() => {
    if (!saveFormData || isSaveFormLoaded) return;

    const subjectList = saveFormData.grade.subjectList;
    const graduationType = saveFormData.education.graduationType;

    setForm((prev) => ({ ...prev, ...saveFormData }));

    if (subjectList) {
      const updateSubjects: [
        SetterOrUpdater<Subject[]>,
        SetterOrUpdater<Subject[]>,
        number
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
