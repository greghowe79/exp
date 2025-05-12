// src/lib/pageMap.ts
export const pageMap:any = {
  about: {
    'en-US': 'about',
    'it-IT': 'chi-siamo',
    'es-ES': 'sobre-nosotros',
    'fr-FR': 'a-propos',
    'pt-PT': 'sobre-nos',
    'ja-JP': '私たちについて',
    'zh-CN': '关于我们',
  },
  services: {
    'en-US': 'services',
    'it-IT': 'servizi',
    'es-ES': 'servicios',
    'fr-FR': 'services',
    'pt-PT': 'servicos',
    'ja-JP': 'サービス',
    'zh-CN': '服务',

  },
  contact: {
    'en-US': 'contact',
    'it-IT': 'contatti',
    'es-ES': 'contacto',
    'fr-FR': 'contact',
    'pt-PT': 'contacto',
    'ja-JP': 'お問い合わせ',
    'zh-CN': '联系',
  },
  login:{
    'en-US': 'login',
    'it-IT': 'accesso',
    'es-ES': 'iniciar-sesion',
    'fr-FR': 'connexion',
    'pt-PT': 'entrar',
    'ja-JP': 'login',
    'zh-CN': 'login',

    
  }
};

export function resolvePageKey(slug: string, lang: string): keyof typeof pageMap | null {
  for (const key in pageMap) {
    if (pageMap[key][lang] === slug) {
      return key as keyof typeof pageMap;
    }
  }
  return null;
}
