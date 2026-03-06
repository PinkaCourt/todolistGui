import defaultLocale from "lang/ru";
import { LocaleType } from "common/types";

function templateEngine(
  template: string,
  params: Record<string, string | number>,
) {
  return template.replace(/({[a-zA-Z]*})/g, (str, p) => {
    const key = p.slice(1, -1);
    return `${params[key]}`;
  });
}

export const getTranslatedText = (
  def: keyof LocaleType,
  options?: Record<string, string>,
) => {
  const lang = defaultLocale;

  const template = lang[def];

  if (template && options) {
    return templateEngine(template, options);
  }

  return template || "";
};
