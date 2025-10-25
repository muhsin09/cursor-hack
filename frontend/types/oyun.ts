export type OyunTipi = 'ses-eslestirme' | 'gorsel-eslestirme' | 'siralama';

export interface OyunVerisi {
  id: number;
  hedefVeri: string;
  secenekler: string[];
}

export interface CevapSonucu {
  dogru: boolean;
  mesaj: string;
}

