import { GuardianInformationContent } from '@/components/form';
import { FormLayout } from '@/layouts';
import { Loader } from '@maru/ui';
import { Suspense } from 'react';

const GuardianInformation = () => {
  return (
    <FormLayout title="보호자 정보">
      <Suspense fallback={<Loader />}>
        <GuardianInformationContent />
      </Suspense>
    </FormLayout>
  );
};

export default GuardianInformation;
