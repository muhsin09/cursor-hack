import { OyunVerisi, CevapSonucu } from '@/types/oyun';

const API_BASE = 'http://localhost:8080/api';

export async function oyunGetir(oyunTipi: string): Promise<OyunVerisi> {
  const res = await fetch(`${API_BASE}/oyun/${oyunTipi}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Oyun yüklenemedi');
  }
  
  return res.json();
}

export async function cevapKontrol(
  oyunId: number, 
  kullaniciCevabi: string | string[]
): Promise<CevapSonucu> {
  const requestBody = { 
    oyunId, 
    kullaniciCevabi: typeof kullaniciCevabi === 'string' 
      ? kullaniciCevabi 
      : JSON.stringify(kullaniciCevabi)
  };
  
  const res = await fetch(`${API_BASE}/oyun/kontrol`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('API Error:', errorText);
    throw new Error(`Cevap kontrol edilemedi: ${res.status} - ${errorText}`);
  }
  
  return res.json();
}

