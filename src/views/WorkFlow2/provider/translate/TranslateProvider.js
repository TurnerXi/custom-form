import Lang from './zh-cn';

export default function customTranslate(template, replacements) {
    replacements = replacements || {};

    // Translate
    template = Lang[template] || template;

    // Replace
    return template.replace(/{([^}]+)}/g, (_, key) => {
        return replacements[key] || `{${key}}`;
    });
}