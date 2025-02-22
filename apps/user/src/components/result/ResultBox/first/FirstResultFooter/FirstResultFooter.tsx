import FailBox from './FailBox/FailBox';
import PassBox from './PassBox/PassBox';

interface FirstResultFooterProps {
  isPassed?: boolean;
}

const FirstResultFooter = ({ isPassed }: FirstResultFooterProps) => {
  return <div>{isPassed ? <PassBox /> : <FailBox />}</div>;
};

export default FirstResultFooter;
