import { flex } from '@maru/utils';
import styled from 'styled-components';
import { SchoolItem } from './SchoolItem/SchoolItem';
import { useSchoolListQuery } from '@/services/form/queries';
import { School } from '@/types/form/client';
import { Dispatch, SetStateAction } from 'react';

interface SchoolListProps {
  school: School;
  setSchool: Dispatch<SetStateAction<School>>;
  debouncedSchoolSearchQuery: string;
}

const SchoolList = ({
  school,
  setSchool,
  debouncedSchoolSearchQuery,
}: SchoolListProps) => {
  const { data: schoolListData } = useSchoolListQuery(debouncedSchoolSearchQuery);

  return (
    <StyledSchoolList>
      {schoolListData?.map(({ name, location, code, address }: School) => (
        <SchoolItem
          key={code}
          school={{ name, location, code, address }}
          selected={school.code === code}
          onClick={() => setSchool({ name, location, code, address })}
        />
      ))}
    </StyledSchoolList>
  );
};

export default SchoolList;

const StyledSchoolList = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 225px;
  overflow: auto;
  margin-top: 24px;
  gap: 8px;
`;
