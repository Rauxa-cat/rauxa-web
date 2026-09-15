// @types/iframe-resizer describes a module that is the resize function itself;
// 4.4.5 exports an object instead. Only what the site uses is declared.
declare module 'iframe-resizer' {
  export function iframeResize(
    options: { onResized?: () => void },
    target: HTMLIFrameElement,
  ): (HTMLIFrameElement & { iFrameResizer: { removeListeners(): void } })[];
}
