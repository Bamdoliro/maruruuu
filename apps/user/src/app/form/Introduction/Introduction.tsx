import { IntroductionContent } from '@/components/form';
import { FormLayout } from '@/layouts';
import { Loader } from '@maru/ui';
import { Suspense } from 'react';

const Introduction = () => {
  return (
    <FormLayout title="자기소개서">
      <Suspense fallback={<Loader />}>
        <IntroductionContent />
      </Suspense>
    </FormLayout>
  );
};

export default Introduction;
