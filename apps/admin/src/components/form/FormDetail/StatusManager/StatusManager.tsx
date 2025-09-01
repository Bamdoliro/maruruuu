import { Button, Column } from '@maru/ui';

interface StatusManagerProps {
  id: number;
}

const StatusManager = ({ id }: StatusManagerProps) => {

  return (
    <Column gap={16}>
      <Column gap={8}>
        <Button styleType="PRIMARY" size="SMALL">
          최종 접수 상태 변경
        </Button>
        <Button styleType="SECONDARY" size="SMALL">
          제출 서류 조회
        </Button>
      </Column>
    </Column>
  );
};

export default StatusManager;
