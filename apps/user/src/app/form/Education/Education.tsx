import React, { Suspense } from 'react';
import { FormLayout } from '@/layouts';
import { Loader } from '@maru/ui';
import { EducationContent } from '@/components/form';

const Education = () => {
  return (
    <FormLayout title="출신학교 및 학력">
      <Suspense fallback={<Loader />}>
        <EducationContent />
      </Suspense>
    </FormLayout>
  );
};

export default Education;
