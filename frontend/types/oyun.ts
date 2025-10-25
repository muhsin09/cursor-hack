export type OyunTipi = 'ses-eslestirme' | 'gorsel-eslestirme' | 'siralama';

export interface OyunVerisi {
  id: number;
  hedefVeri: string;
  hedefVeriGosterimIsmi: string;
  secenekler: string[];
  gosterimIsimleri: string[];
}

export interface CevapSonucu {
  dogru: boolean;
  mesaj: string;
}

