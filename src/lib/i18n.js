import enCore from '@/locales/en/core.json';
import plCore from '@/locales/pl/core.json';

const translations = {
  en: { ...enCore },
  pl: { ...plCore },
};

const additionalNamespaces = ['philosophy', 'team', 'podcast', 'blog', 'lab'];

const namespaceLoaders = {
  en: {
    productPages: () => import('@/locales/en/productPages.json'),
    philosophy: () => import('@/locales/en/philosophy.json'),
    team: () => import('@/locales/en/team.json'),
    podcast: () => import('@/locales/en/podcast.json'),
    blog: () => import('@/locales/en/blog.json'),
    lab: () => import('@/locales/en/lab.json'),
  },
  pl: {
    productPages: () => import('@/locales/pl/productPages.json'),
    philosophy: () => import('@/locales/pl/philosophy.json'),
    team: () => import('@/locales/pl/team.json'),
    podcast: () => import('@/locales/pl/podcast.json'),
    blog: () => import('@/locales/pl/blog.json'),
    lab: () => import('@/locales/pl/lab.json'),
  },
};

const loadingPromises = new Map();

export const SUPPORTED_LANGUAGES = ['en', 'pl'];
export const DEFAULT_LANGUAGE = 'pl';

export function hasNamespace(language, namespace) {
  return translations[language]?.[namespace] !== undefined;
}

function resolveNamespaceForKey(key) {
  if (key.startsWith('productPages.')) {
    return 'productPages';
  }

  const matchedNamespace = additionalNamespaces.find((ns) => key.startsWith(`${ns}.`));
  if (matchedNamespace) {
    return matchedNamespace;
  }

  return 'core';
}

export async function ensureNamespace(language, namespace) {
  if (!SUPPORTED_LANGUAGES.includes(language) || namespace === 'core') {
    return;
  }

  if (translations[language]?.[namespace] !== undefined) {
    return;
  }

  const cacheKey = `${language}:${namespace}`;
  if (!loadingPromises.has(cacheKey)) {
    const load = namespaceLoaders[language]?.[namespace];
    if (!load) {
      return;
    }

    loadingPromises.set(
      cacheKey,
      load()
        .then((mod) => {
          Object.assign(translations[language], mod.default || {});
        })
        .finally(() => {
          loadingPromises.delete(cacheKey);
        }),
    );
  }

  await loadingPromises.get(cacheKey);
}

export async function ensureKeyLoaded(language, key) {
  const namespace = resolveNamespaceForKey(key);
  await ensureNamespace(language, namespace);
}

export function getTranslation(language, key) {
  const keys = key.split('.');
  let value = translations[language];

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key; // Fallback to key name if translation not found
  }

  return value;
}

export function t(language) {
  return (key) => getTranslation(language, key);
}
