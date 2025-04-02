module.exports = {
  extends: ['@maru/eslint-config/react-ts-noimport', 'plugin:@next/next/core-web-vitals'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
};
