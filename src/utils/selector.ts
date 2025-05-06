export const $ = (
  selector: string,
  context: Document | HTMLElement = document,
) => {
  return context.querySelector(selector);
};
