'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { oyunGetir, cevapKontrol } from '@/lib/api-client';
import { OyunVerisi, CevapSonucu, OyunTipi } from '@/types/oyun';
import { FeedbackOverlay } from '@/components/ui/feedback-overlay';

export default function OyunSayfasi() {
  const params = useParams();
  const router = useRouter();
  const tip = params.tip as OyunTipi;
  
  const [oyunVerisi, setOyunVerisi] = useState<OyunVerisi | null>(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [sonuc, setSonuc] = useState<CevapSonucu | null>(null);
  const [siralamaSonuc, setSiralamaSonuc] = useState<string[]>([]);
  const [gosterFeedback, setGosterFeedback] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    veriYukle();
  }, [tip]);
  
  const veriYukle = async () => {
    setYukleniyor(true);
    setSonuc(null);
    setSiralamaSonuc([]);
    setGosterFeedback(false);
    
    try {
      const veri = await oyunGetir(tip);
      setOyunVerisi(veri);
    } catch (error) {
      console.error('Oyun yüklenirken hata:', error);
      alert('Oyun yüklenemedi. Lütfen backend\'in çalıştığından emin olun.');
    } finally {
      setYukleniyor(false);
    }
  };
  
  const cevapGonder = async (cevap: string | string[]) => {
    if (!oyunVerisi) return;
    
    try {
      const sonuc = await cevapKontrol(oyunVerisi.id, cevap);
      setSonuc(sonuc);
      setGosterFeedback(true);
    } catch (error) {
      console.error('Cevap kontrol edilirken hata:', error);
      alert('Cevap kontrol edilemedi');
    }
  };
  
  const sesOynat = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  
  const resimTikla = (resim: string) => {
    if (tip === 'siralama') {
      if (siralamaSonuc.includes(resim)) {
        setSiralamaSonuc(prev => prev.filter(r => r !== resim));
      } else if (siralamaSonuc.length < oyunVerisi!.secenekler.length) {
        setSiralamaSonuc(prev => [...prev, resim]);
      }
    } else {
      cevapGonder(resim);
    }
  };
  
  const siralamaKontrol = () => {
    if (siralamaSonuc.length === oyunVerisi!.secenekler.length) {
      cevapGonder(siralamaSonuc);
    } else {
      alert('Lütfen tüm resimleri sırala!');
    }
  };
  
  if (yukleniyor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
        <div className="text-6xl animate-spin">⏳</div>
      </div>
    );
  }
  
  if (!oyunVerisi) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
        <div className="text-4xl text-white">Oyun bulunamadı</div>
      </div>
    );
  }
  
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Başlık ve Geri Butonu */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => router.push('/')}
              className="bg-white text-gray-800 px-6 py-3 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all"
            >
              ← Ana Menü
            </button>
            <h1 className="text-4xl font-bold text-white">
              {tip === 'ses-eslestirme' && '🎧 Sesi Dinle, Resmi Bul'}
              {tip === 'gorsel-eslestirme' && '👁️ Aynısını Bul'}
              {tip === 'siralama' && '📚 Hikayeyi Sırala'}
            </h1>
            <div className="w-32"></div>
          </div>
          
          {/* Ses Eşleştirme Modülü */}
          {tip === 'ses-eslestirme' && (
            <div className="flex flex-col items-center">
              <div className="mb-12">
                <button
                  onClick={sesOynat}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-48 h-48 flex items-center justify-center text-8xl transform transition-all hover:scale-110 shadow-2xl"
                >
                  ▶️
                </button>
                <audio 
                  ref={audioRef} 
                  src={`http://localhost:8080/media/audio/${oyunVerisi.hedefVeri}`}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-8 max-w-3xl">
                {oyunVerisi.secenekler.map((resim, index) => (
                  <button
                    key={index}
                    onClick={() => resimTikla(resim)}
                    className="bg-white rounded-3xl p-8 transform transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="w-64 h-64 bg-gray-200 rounded-2xl flex items-center justify-center text-6xl">
                      🖼️
                    </div>
                    <p className="mt-4 text-2xl font-semibold text-gray-700">
                      {resim.replace('.png', '')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Görsel Eşleştirme Modülü */}
          {tip === 'gorsel-eslestirme' && (
            <div className="flex flex-col items-center">
              <div className="mb-12 bg-white rounded-3xl p-8 border-8 border-yellow-400 shadow-2xl">
                <p className="text-2xl font-bold text-gray-700 mb-4 text-center">
                  Aynısını Bul:
                </p>
                <div className="w-80 h-80 bg-gray-200 rounded-2xl flex items-center justify-center text-9xl">
                  🎯
                </div>
                <p className="mt-4 text-3xl font-bold text-gray-800 text-center">
                  {oyunVerisi.hedefVeri.replace('.png', '')}
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-6 max-w-5xl">
                {oyunVerisi.secenekler.map((resim, index) => (
                  <button
                    key={index}
                    onClick={() => resimTikla(resim)}
                    className="bg-white rounded-2xl p-6 transform transition-all hover:scale-105 hover:shadow-xl"
                  >
                    <div className="w-40 h-40 bg-gray-200 rounded-xl flex items-center justify-center text-5xl">
                      🖼️
                    </div>
                    <p className="mt-2 text-lg font-semibold text-gray-700 text-center">
                      {resim.replace('.png', '')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Sıralama Modülü */}
          {tip === 'siralama' && (
            <div className="flex flex-col items-center">
              <p className="text-3xl font-bold text-white mb-8">
                Resim üzerine tıklayarak sırala (1, 2, 3)
              </p>
              
              <div className="grid grid-cols-3 gap-8 mb-8">
                {oyunVerisi.secenekler.map((resim, index) => {
                  const sira = siralamaSonuc.indexOf(resim);
                  const secildi = sira >= 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => resimTikla(resim)}
                      className={`relative bg-white rounded-3xl p-8 transform transition-all hover:scale-105 ${
                        secildi ? 'ring-8 ring-blue-400' : ''
                      }`}
                    >
                      {secildi && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold shadow-lg z-10">
                          {sira + 1}
                        </div>
                      )}
                      <div className="w-64 h-64 bg-gray-200 rounded-2xl flex items-center justify-center text-7xl">
                        📷
                      </div>
                      <p className="mt-4 text-xl font-semibold text-gray-700 text-center">
                        {resim.replace('.png', '')}
                      </p>
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={siralamaKontrol}
                disabled={siralamaSonuc.length !== oyunVerisi.secenekler.length}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white text-3xl font-bold py-6 px-16 rounded-full transform transition-all hover:scale-110 shadow-2xl disabled:cursor-not-allowed"
              >
                Kontrol Et
              </button>
            </div>
          )}
        </div>
      </main>
      
      <FeedbackOverlay
        dogru={sonuc?.dogru || false}
        mesaj={sonuc?.mesaj || ''}
        goster={gosterFeedback}
        yeniSoru={veriYukle}
      />
    </>
  );
}

