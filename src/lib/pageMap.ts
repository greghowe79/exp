export const pageMap:any = {
  about: {
    'en_US': 'about',
    'it_IT': 'chi-siamo',
    'es_ES': 'sobre-nosotros',
    'fr_FR': 'a-propos',
    'pt_PT': 'sobre-nos',
    'ja_JP': '私たちについて',
    'zh_CN': '关于我们',
  },
  services: {
    'en_US': 'services',
    'it_IT': 'servizi',
    'es_ES': 'servicios',
    'fr_FR': 'services',
    'pt_PT': 'servicos',
    'ja_JP': 'サービス',
    'zh_CN': '服务',

  },
  contact: {
    'en_US': 'contact',
    'it_IT': 'contatti',
    'es_ES': 'contacto',
    'fr_FR': 'contact',
    'pt_PT': 'contacto',
    'ja_JP': 'お問い合わせ',
    'zh_CN': '联系',
  },
    pricing: {
    'en_US': 'pricing',
    'it_IT': 'prezzi',
    'es_ES': 'precios',
    'fr_FR': 'prix',
    'pt_PT': 'preços',
    'ja_JP': '価格設定',
    'zh_CN': '定价',
  },
  login:{
    'en_US': 'login',
    'it_IT': 'accesso',
    'es_ES': 'iniciar-sesion',
    'fr_FR': 'connexion',
    'pt_PT': 'entrar',
    'ja_JP': 'login',
    'zh_CN': 'login', 
  },
  signup:{
    'en_US': 'signup',
    'it_IT': 'registrazione',
    'es_ES': 'registro',
    'fr_FR': 'inscription',
    'pt_PT': 'registro',
    'ja_JP': 'signup',
    'zh_CN': 'signup',
  },
    dashboard:{
    'en_US': 'dashboard',
    'it_IT': 'pannello-di-controllo',
    'es_ES': 'panel-de-control',
    'fr_FR': 'tableau-de-bord',
    'pt_PT': 'painel-de-controle',
    'ja_JP': 'dashboard',
    'zh_CN': 'dashboard',
  },
    preview:{
    'en_US': 'preview',
    'it_IT': 'anteprima',
    'es_ES': 'vista-previa',
    'fr_FR': 'aperçu',
    'pt_PT': 'pré-visualização',
    'ja_JP': 'preview',
    'zh_CN': 'preview',
  },
   website: {
  'en_US': 'website',
  'it_IT': 'sito-web',
  'es_ES': 'sitio-web',
  'fr_FR': 'site-web',
  'pt_PT': 'site',
  'ja_JP': 'website',
  'zh_CN': 'website',
},
    reset:{
    'en_US': 'reset-password',
    'it_IT': 'ripristina-password',
    'es_ES': 'restablecer-contraseña',
    'fr_FR': 'reinitialiser-mot-de-passe',
    'pt_PT': 'redefinir-senha',
    'ja_JP': 'reset-password',
    'zh_CN': 'reset-password',
  },
    update:{
    'en_US': 'update-password',
    'it_IT': 'aggiorna-password',
    'es_ES': 'actualizar-contraseña',
    'fr_FR': 'mettre-a-jour-mot-de-passe',
    'pt_PT': 'atualizar-palavra-passe',
    'ja_JP': 'update-password',
    'zh_CN': 'update-password',
  },
   success:{
    'en_US': 'success',
    'it_IT': 'successo',
    'es_ES': 'exito',
    'fr_FR': 'succès',
    'pt_PT': 'sucesso',
    'ja_JP': 'success',
    'zh_CN': 'success',
  },
   search:{
    'en_US': 'search',
    'it_IT': 'ricerca',
    'es_ES': 'busqueda',
    'fr_FR': 'recherche',
    'pt_PT': 'pesquisa',
    'ja_JP': 'search',
    'zh_CN': 'search',
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


