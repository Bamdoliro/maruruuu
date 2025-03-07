import { TypeContent } from '@/components/form';
import { FormLayout } from '@/layouts';
import { Loader } from '@maru/ui';
import { Suspense } from 'react';

const Type = () => {
  return (
    <FormLayout title="전형 선택">
      <Suspense fallback={<Loader />}>
        <TypeContent />
      </Suspense>
    </FormLayout>
  );
};

export default Type;
