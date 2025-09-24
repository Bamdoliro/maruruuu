import { Row } from '@maru/ui';
import ValidateItem from './ValidateItem/ValidateItem';

const Validate = (password: string) => {
  return (
    <Row gap={4}>
      <ValidateItem
        condition={password.length >= 8 && password.length <= 20}
        text="8자 이상 20자 이하"
      />
      <ValidateItem condition={/[a-zA-Z]/.test(password)} text="영어" />
      <ValidateItem condition={/\d/.test(password)} text="숫자" />
      <ValidateItem
        condition={/[!@#$%*?_:^+=-]/.test(password)}
        text="특수문자(!@#$%*?_:^+=- 중에서만 입력)"
      />
    </Row>
  );
};

export default Validate;
