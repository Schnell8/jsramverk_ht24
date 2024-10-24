import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended"),
    {
        ignores: ['coverage/**', 'node_modules/**', 'eslint.config.mjs']
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
            },

            ecmaVersion: 2018,
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        rules: {
            indent: [2, 4, {
                SwitchCase: 1,
            }],

            "linebreak-style": [2, "unix"],
            "eol-last": 2,
            "no-trailing-spaces": 2,
            semi: [2, "always"],

            camelcase: [2, {
                properties: "never",
            }],

            curly: [2, "all"],

            "brace-style": [2, "1tbs", {
                allowSingleLine: true,
            }],

            "no-with": 2,
            "keyword-spacing": [2, {}],
            "space-before-blocks": [2, "always"],

            "space-before-function-paren": [2, {
                anonymous: "ignore",
                named: "never",
            }],

            "comma-spacing": [2, {
                after: true,
                before: false,
            }],

            "semi-spacing": [2, {
                before: false,
                after: true,
            }],

            "key-spacing": [2, {
                beforeColon: false,
                afterColon: true,
                mode: "minimum",
            }],

            "padded-blocks": [2, "never"],
            "newline-after-var": [2, "always"],
            "max-len": [2, 100],
            "comma-style": [2, "last"],
            "no-multi-str": 2,
            "wrap-iife": ["error", "any"],
            "no-console": 0,
        },
    }
];
