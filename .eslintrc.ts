import type { Linter } from 'eslint';

const config: Linter.Config = {
    rules: {
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/no-unused-vars": "off"
    }
};

export default config;