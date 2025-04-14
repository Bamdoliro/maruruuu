import { color, font } from '@maru/design-system';
import { CellInput, Column, Row, Td, Th } from '@maru/ui';
import { styled } from 'styled-components';

interface VolunteerProps {
  VolunteerList: number[];
}

const Volunteer = ({ VolunteerList }: VolunteerProps) => {
  const volunteerData = [
    { gradeLabel: '1학년', time: VolunteerList[0] },
    { gradeLabel: '2학년', time: VolunteerList[1] },
    { gradeLabel: '3학년', time: VolunteerList[2] },
  ];

  return (
    <Column>
      <Row>
        <Th borderTopLeftRadius={12} width={162} height={56}>
          학년
        </Th>
        <Th borderTopRightRadius={12} width={318} height={56}>
          봉사시간
        </Th>
      </Row>
      {volunteerData.map((volunteer, index) => (
        <Row key={index}>
          <Td
            width={162}
            height={56}
            styleType="SECONDARY"
            borderBottomLeftRadius={index === volunteerData.length - 1 ? 12 : undefined}
          >
            {volunteer.gradeLabel}
          </Td>
          <Td
            width={318}
            height={56}
            borderBottomRightRadius={index === volunteerData.length - 1 ? 12 : undefined}
          >
            <CellInput value={volunteer.time} readOnly />
            <Hour>시간</Hour>
          </Td>
        </Row>
      ))}
    </Column>
  );
};

export default Volunteer;

const Hour = styled.p`
  ${font.p2}
  color: ${color.gray900};
  margin-left: 8px;
`;
