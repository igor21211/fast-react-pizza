module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/explicit-function-return-type": "warn", // Требовать явного указания возвращаемого типа функций
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Запрещать неиспользуемые переменные, игнорируя те, которые начинаются с _
    "@typescript-eslint/no-explicit-any": "warn", // Предупреждать об использовании типа any
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // Требовать использование интерфейсов вместо типов
    "@typescript-eslint/no-inferrable-types": "off", // Отключить правило, запрещающее явно указывать типы, которые могут быть выведены
    "react/prop-types": "off", // Отключить проверку prop-types, так как используется TypeScript
  },
};
