import { Column } from '@maru/ui';
import FormTableHeader from './FormTableHeader/FormTableHeader';
import FormTableItem from './FormTableItem/FormTableItem';
import { useFormListQuery } from '@/services/form/queries';

const FormTable = () => {
  const { data: formList } = useFormListQuery();

  return (
    <Column gap={12}>
      <FormTableHeader />
      {formList &&
        formList.map((item) => (
          <FormTableItem
            id={item.id}
            examinationNumber={item.examinationNumber}
            name={item.name}
            graduationType={item.graduationType}
            school={item.school}
            status={item.status}
            type={item.type}
            isChangedToRegular={item.isChangedToRegular}
            totalScore={item.totalScore}
            firstRoundPassed={item.firstRoundPassed}
            secondRoundPassed={item.secondRoundPassed}
          />
        ))}
    </Column>
  );
};

export default FormTable;
