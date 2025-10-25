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
      audioRef.current.load(); // Ses dosyasını yeniden yükle
      audioRef.current.play().catch(error => {
        console.error('Ses çalınamadı:', error);
        alert('Ses dosyası çalınamadı. Lütfen backend\'in çalıştığından ve ses dosyalarının mevcut olduğundan emin olun.');
      });
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
      <main className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Başlık ve Geri Butonu */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
            <button
              onClick={() => router.push('/')}
              className="bg-white text-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-xl font-semibold hover:bg-gray-100 transition-all active:scale-95 w-full sm:w-auto"
            >
              ← Ana Menü
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
              {tip === 'ses-eslestirme' && '🎧 Sesi Dinle, Resmi Bul'}
              {tip === 'gorsel-eslestirme' && '👁️ Aynısını Bul'}
              {tip === 'siralama' && '📚 Hikayeyi Sırala'}
            </h1>
            <div className="hidden sm:block w-32"></div>
          </div>
          
          {/* Ses Eşleştirme Modülü */}
          {tip === 'ses-eslestirme' && (
            <div className="flex flex-col items-center">
              <div className="mb-8 sm:mb-12">
                <button
                  onClick={sesOynat}
                  className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center text-5xl sm:text-6xl md:text-8xl transform transition-all hover:scale-110 active:scale-95 shadow-2xl"
                >
                  ▶️
                </button>
                <audio 
                  ref={audioRef} 
                  src={`http://localhost:8080/media/audio/${oyunVerisi.hedefVeri}`}
                  preload="auto"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl w-full px-2">
                {oyunVerisi.secenekler.map((resim, index) => (
                  <button
                    key={index}
                    onClick={() => resimTikla(resim)}
                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transform transition-all hover:scale-105 active:scale-95 hover:shadow-2xl"
                  >
                    <img 
                      src={`http://localhost:8080/media/images/${resim}`}
                      alt={oyunVerisi.gosterimIsimleri[index]}
                      className="w-full aspect-square object-cover rounded-xl sm:rounded-2xl max-w-xs mx-auto"
                    />
                    <p className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-lg md:text-2xl font-semibold text-gray-700 truncate">
                      {oyunVerisi.gosterimIsimleri[index]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Görsel Eşleştirme Modülü */}
          {tip === 'gorsel-eslestirme' && (
            <div className="flex flex-col items-center">
              <div className="mb-8 sm:mb-12 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-4 sm:border-6 md:border-8 border-yellow-400 shadow-2xl max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-3 sm:mb-4 text-center">
                  Aynısını Bul:
                </p>
                <img 
                  src={`http://localhost:8080/media/images/${oyunVerisi.hedefVeri}`}
                  alt={oyunVerisi.hedefVeriGosterimIsmi}
                  className="w-full aspect-square max-w-xs sm:max-w-sm mx-auto object-cover rounded-xl sm:rounded-2xl"
                />
                <p className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
                  {oyunVerisi.hedefVeriGosterimIsmi}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl w-full px-2">
                {oyunVerisi.secenekler.map((resim, index) => (
                  <button
                    key={index}
                    onClick={() => resimTikla(resim)}
                    className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 transform transition-all hover:scale-105 active:scale-95 hover:shadow-xl"
                  >
                    <img 
                      src={`http://localhost:8080/media/images/${resim}`}
                      alt={oyunVerisi.gosterimIsimleri[index]}
                      className="w-full aspect-square object-cover rounded-lg sm:rounded-xl"
                    />
                    <p className="mt-2 text-xs sm:text-sm md:text-lg font-semibold text-gray-700 text-center truncate">
                      {oyunVerisi.gosterimIsimleri[index]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Sıralama Modülü */}
          {tip === 'siralama' && (
            <div className="flex flex-col items-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8 text-center px-4">
                Resim üzerine tıklayarak sırala (1, 2, 3)
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 w-full max-w-5xl px-2">
                {oyunVerisi.secenekler.map((resim, index) => {
                  const sira = siralamaSonuc.indexOf(resim);
                  const secildi = sira >= 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => resimTikla(resim)}
                      className={`relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transform transition-all hover:scale-105 active:scale-95 ${
                        secildi ? 'ring-4 sm:ring-6 md:ring-8 ring-blue-400' : ''
                      }`}
                    >
                      {secildi && (
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-red-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold shadow-lg z-10">
                          {sira + 1}
                        </div>
                      )}
                      <img 
                        src={`http://localhost:8080/media/images/${resim}`}
                        alt={oyunVerisi.gosterimIsimleri[index]}
                        className="w-full aspect-square max-w-xs mx-auto object-cover rounded-xl sm:rounded-2xl"
                      />
                      <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-gray-700 text-center truncate">
                        {oyunVerisi.gosterimIsimleri[index]}
                      </p>
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={siralamaKontrol}
                disabled={siralamaSonuc.length !== oyunVerisi.secenekler.length}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-400 text-white text-xl sm:text-2xl md:text-3xl font-bold py-4 px-8 sm:py-5 sm:px-12 md:py-6 md:px-16 rounded-full transform transition-all hover:scale-110 active:scale-95 shadow-2xl disabled:cursor-not-allowed w-full sm:w-auto max-w-md"
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

