import { labels, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in labels) return lang as keyof typeof labels;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof labels) {
    return function t(key: keyof typeof labels[typeof defaultLang]) {
        return labels[lang][key] || labels[defaultLang][key];
    }
}