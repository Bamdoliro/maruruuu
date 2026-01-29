import { color, font } from '@maru/design-system';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ConditionalMessageProps {
  message?: string;
  errorMessage?: string;
  isError?: boolean;
}

const ConditionalMessage = ({
  message,
  errorMessage,
  isError = false,
}: ConditionalMessageProps) => {
  return isError ? (
    errorMessage ? (
      <div style={{ position: 'relative' }}>
        <StyledConditionalMessage $isError={true}>
          {errorMessage}
        </StyledConditionalMessage>
      </div>
    ) : null
  ) : message ? (
    <StyledConditionalMessage $isError={false}>{message}</StyledConditionalMessage>
  ) : null;
};

export default ConditionalMessage;

const StyledConditionalMessage = styled.p<{ $isError: boolean }>`
  ${(props) =>
    props.$isError
      ? css`
          position: absolute;
          top: 0;
          left: 0;
          ${font.caption}
          color: ${color.red};
          margin-top: 8px;
        `
      : css`
          ${font.p3};
          color: ${color.gray500};
          margin-top: 4px;
        `}
`;
