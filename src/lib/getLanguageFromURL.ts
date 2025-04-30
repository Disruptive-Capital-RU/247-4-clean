import { Language } from './LanguageContext';

export function getLanguageFromURL(): Language | null {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang') as Language | null;
    
    if (langParam && ["EN", "AR", "CN", "RU"].includes(langParam)) {
      return langParam;
    }
  }
  return null;
}