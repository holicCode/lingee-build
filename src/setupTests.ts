// @ts-expect-error 测试全局环境标记，供 React act() 使用
globalThis.IS_REACT_ACT_ENVIRONMENT = true

export {}
