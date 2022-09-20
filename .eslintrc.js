// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'eol-last': ['error', 'always'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/react-in-jsx-scope': 0,
        'quotes': ['error', 'single'],
        'quote-props': ['error', 'consistent-as-needed'],
    },
};
