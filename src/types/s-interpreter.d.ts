declare module 'js-interpreter' {
  export default class JSInterpreter {
    constructor(
      code: string,
      initFunc?: (interpreter: any, globalObject: any) => void
    );

    run(): boolean;
    step(): boolean;
    appendCode(code: string): void;
  }
}
