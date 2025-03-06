import { ApplicantInformationContent } from '@/components/form';
import { FormLayout } from '@/layouts';
import { Loader } from '@maru/ui';
import { Suspense } from 'react';

const ApplicantInformation = () => {
  return (
    <FormLayout title="지원자 정보">
      <Suspense fallback={<Loader />}>
        <ApplicantInformationContent />
      </Suspense>
    </FormLayout>
  );
};

export default ApplicantInformation;
