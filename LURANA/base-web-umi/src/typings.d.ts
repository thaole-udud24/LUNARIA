/// <reference types="umi/client" />

/**
 * CSS / LESS modules
 */
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

/**
 * Global LESS (không module)
 */
declare module '*.less';

/**
 * Images
 */
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

/**
 * JSON
 */
declare module '*.json' {
  const value: any;
  export default value;
}