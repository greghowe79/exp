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
    pricing: {
    'en-US': 'pricing',
    'it-IT': 'prezzi',
    'es-ES': 'precios',
    'fr-FR': 'prix',
    'pt-PT': 'preços',
    'ja-JP': '価格設定',
    'zh-CN': '定价',
  },
  login:{
    'en-US': 'login',
    'it-IT': 'accesso',
    'es-ES': 'iniciar-sesion',
    'fr-FR': 'connexion',
    'pt-PT': 'entrar',
    'ja-JP': 'login',
    'zh-CN': 'login', 
  },
  signup:{
    'en-US': 'signup',
    'it-IT': 'registrazione',
    'es-ES': 'registro',
    'fr-FR': 'inscription',
    'pt-PT': 'registro',
    'ja-JP': 'signup',
    'zh-CN': 'signup',
  },
    dashboard:{
    'en-US': 'dashboard',
    'it-IT': 'pannello-di-controllo',
    'es-ES': 'panel-de-control',
    'fr-FR': 'tableau-de-bord',
    'pt-PT': 'painel-de-controle',
    'ja-JP': 'dashboard',
    'zh-CN': 'dashboard',
  },
    preview:{
    'en-US': 'preview',
    'it-IT': 'anteprima',
    'es-ES': 'vista-previa',
    'fr-FR': 'aperçu',
    'pt-PT': 'pré-visualização',
    'ja-JP': 'preview',
    'zh-CN': 'preview',
  },
   website: {
  'en-US': 'website',
  'it-IT': 'sito-web',
  'es-ES': 'sitio-web',
  'fr-FR': 'site-web',
  'pt-PT': 'site',
  'ja-JP': 'website',
  'zh-CN': 'website',
},
    reset:{
    'en-US': 'reset-password',
    'it-IT': 'ripristina-password',
    'es-ES': 'restablecer-contraseña',
    'fr-FR': 'reinitialiser-mot-de-passe',
    'pt-PT': 'redefinir-senha',
    'ja-JP': 'reset-password',
    'zh-CN': 'reset-password',
  },
    update:{
    'en-US': 'update-password',
    'it-IT': 'aggiorna-password',
    'es-ES': 'actualizar-contraseña',
    'fr-FR': 'mettre-a-jour-mot-de-passe',
    'pt-PT': 'atualizar-palavra-passe',
    'ja-JP': 'update-password',
    'zh-CN': 'update-password',
  },
   success:{
    'en-US': 'success',
    'it-IT': 'successo',
    'es-ES': 'exito',
    'fr-FR': 'succès',
    'pt-PT': 'sucesso',
    'ja-JP': 'success',
    'zh-CN': 'success',
  },
   search:{
    'en-US': 'search',
    'it-IT': 'ricerca',
    'es-ES': 'busqueda',
    'fr-FR': 'recherche',
    'pt-PT': 'pesquisa',
    'ja-JP': 'search',
    'zh-CN': 'search',
  },
};

export function resolvePageKey(slug: string, lang: string): keyof typeof pageMap | null {
  for (const key in pageMap) {
    if (pageMap[key][lang] === slug ) {
      return key as keyof typeof pageMap;
    }
  }
  return null;
}


