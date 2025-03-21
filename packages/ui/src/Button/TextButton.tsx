import type { font } from '@maru/design-system';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import Text from '../Text/Text';

type Font = keyof typeof font;

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: CSSProperties['color'];
  fontType: Font;
  width?: CSSProperties['width'];
  textAlign?: CSSProperties['textAlign'];
  ellipsis?: boolean;
}

const TextButton = ({
  children,
  color,
  fontType,
  textAlign,
  width,
  ellipsis = false,
  onClick,
}: TextButtonProps) => {
  return (
    <StyledTextButton onClick={onClick}>
      <Text
        color={color}
        fontType={fontType}
        textAlign={textAlign}
        width={width}
        ellipsis={ellipsis}
      >
        {children}
      </Text>
    </StyledTextButton>
  );
};

export default TextButton;

const StyledTextButton = styled.button`
  width: fit-content;
`;
