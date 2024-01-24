import { css } from 'styled-components';

const sizes = {
  large: 1200,
  medium: 992,
  small: 768,
  mobile: 480,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});




export const mediaHeight = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-height: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
