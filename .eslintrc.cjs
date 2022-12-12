const { defineConfig } = require("eslint-define-config")
const OFF = 0
const WARN = 1
const ERROR = 2
module.exports = defineConfig({
  env: {
    // 环境
    browser: true, // 浏览器环境中的全局变量。
    node: true, // Node.js 全局变量和 Node.js 作用域。
    es6: true // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
  },
  parser: "@typescript-eslint/parser", // 解析器
  parserOptions: {
    // 解析器配置
    ecmaVersion: "latest", // 5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用年份命名的版本号，你也可以用 latest 来指向最新的版本。
    sourceType: "module", // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
    ecmaFeatures: {
      // 表示你想使用的额外的语言特性
      jsx: true // 启用 JSX
    }
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["prettier", "react", "react-hooks", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-var-requires": OFF,
    // eslint 的配置
    quotes: [ERROR, "double"], //单引号
    "no-console": ["error", { allow: ["log"] }], // 允许使用 console.log()
    "no-confusing-arrow": 0, // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    // eslint-plugin-react 的配置
    "react/no-this-in-sfc": 0,
    "react/prop-types": 0,
    "react/display-name": "off",
    // eslint-plugin-react-hooks 的配置
    "react-hooks/rules-of-hooks": "error"
    // 'react-hooks/exhaustive -deps': 'warn'
  }
})
