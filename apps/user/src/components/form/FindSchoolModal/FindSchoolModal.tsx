import { Loader, Modal, SearchInput } from '@maru/ui';
import { useFindSchoolModal } from './FindSchoolModal.hook';
import { useDebounceInput } from '@maru/hooks';
import { Suspense } from 'react';
import SchoolList from './SchoolList/SchoolList';

interface FindSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindSchoolModal = ({ isOpen, onClose }: FindSchoolModalProps) => {
  const { handleOnClose, handleOnConfirm, school, setSchool } =
    useFindSchoolModal(onClose);
  const {
    value: schoolName,
    onChange: handleNameSchoolNameDataChange,
    debouncedValue: debouncedSchoolName,
  } = useDebounceInput({ initialValue: '' });

  return (
    <Modal
      isOpen={isOpen}
      style={{ position: 'relative', overflow: 'hidden' }}
      width={600}
      height={500}
      title="학교 검색"
      onClose={handleOnClose}
      onConfirm={handleOnConfirm}
      mode="complete"
    >
      <SearchInput
        placeholder="학교 이름을 입력해주세요."
        value={schoolName}
        onChange={handleNameSchoolNameDataChange}
      />
      <Suspense fallback={<Loader />}>
        <SchoolList
          school={school}
          setSchool={setSchool}
          debouncedSchoolSearchQuery={debouncedSchoolName}
        />
      </Suspense>
    </Modal>
  );
};

export default FindSchoolModal;
