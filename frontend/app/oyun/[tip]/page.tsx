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
      alert('Cevap kontrol edilemedi: ' + (error as Error).message);
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
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl animate-bounce mb-4">⏳</div>
          <p className="text-3xl text-white font-bold animate-pulse">Yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  if (!oyunVerisi) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-wiggle">😢</div>
          <div className="text-4xl text-white font-bold">Oyun bulunamadı</div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4 sm:p-6 md:p-8 relative overflow-hidden">
        {/* Dekoratif arka plan elementleri */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 text-5xl animate-float opacity-10">⭐</div>
          <div className="absolute top-20 right-20 text-4xl animate-wiggle opacity-10">🌟</div>
          <div className="absolute bottom-20 left-20 text-6xl animate-sparkle opacity-10">✨</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-float opacity-10">🎈</div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Başlık ve Geri Butonu */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 gap-4">
            <button
              onClick={() => router.push('/')}
              className="bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-2xl font-black hover:bg-yellow-300 hover:scale-110 transition-all active:scale-95 shadow-xl border-4 border-gray-200 w-full sm:w-auto"
            >
              ← Ana Menü
            </button>
            <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-4 border-4 border-white/40 animate-pulse-grow">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white text-center drop-shadow-lg">
                {tip === 'ses-eslestirme' && '🎧 Sesi Dinle, Resmi Bul'}
                {tip === 'gorsel-eslestirme' && '👁️ Aynısını Bul'}
                {tip === 'siralama' && '📚 Hikayeyi Sırala'}
              </h1>
            </div>
            <div className="hidden sm:block w-32"></div>
          </div>
          
          {/* Ses Eşleştirme Modülü */}
          {tip === 'ses-eslestirme' && (
            <div className="flex flex-col items-center">
              <div className="mb-10 sm:mb-14 relative">
                <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <button
                  onClick={sesOynat}
                  className="relative bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl transform transition-all hover:scale-110 active:scale-95 shadow-2xl border-8 border-white/50 animate-pulse-grow"
                >
                  <span className="animate-bounce">▶️</span>
                </button>
                <audio 
                  ref={audioRef} 
                  src={`http://localhost:8080/media/audio/${oyunVerisi.hedefVeri}`}
                  preload="auto"
                />
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 md:gap-9 max-w-7xl w-full px-2">
                {oyunVerisi.secenekler.map((resim, index) => (
                  <button
                    key={index}
                    onClick={() => resimTikla(resim)}
                    className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 transform transition-all hover:scale-110 hover:rotate-3 active:scale-95 shadow-2xl border-4 border-purple-300 hover:border-yellow-400 group sparkle-border"
                  >
                    <div className="absolute -top-2 -right-2 text-4xl animate-wiggle opacity-0 group-hover:opacity-100 transition-opacity">✨</div>
                    <img
                      src={`http://localhost:8080/media/images/${resim}`}
                      alt={oyunVerisi.gosterimIsimleri[index]}
                      className="w-full aspect-square object-cover rounded-xl sm:rounded-2xl shadow-lg"
                    />
                    <div className="mt-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full py-3 px-4">
                      <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-black text-white truncate">
                        {oyunVerisi.gosterimIsimleri[index]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Görsel Eşleştirme Modülü */}
          {tip === 'gorsel-eslestirme' && (
            <div className="flex flex-col items-center">
              <div className="mb-10 sm:mb-14 relative">
                <div className="absolute inset-0 bg-pink-400 rounded-[2rem] blur-2xl opacity-40 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-white to-yellow-100 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 border-8 border-yellow-400 shadow-2xl max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full animate-bounce-in sparkle-border">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-3xl animate-wiggle">👇</span>
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-center">
                      Aynısını Bul
                    </p>
                    <span className="text-3xl animate-wiggle">👇</span>
                  </div>
                  <div className="relative">
                    <img
                      src={`http://localhost:8080/media/images/${oyunVerisi.hedefVeri}`}
                      alt={oyunVerisi.hedefVeriGosterimIsmi}
                      className="w-full aspect-square max-w-xs sm:max-w-sm mx-auto object-cover rounded-2xl sm:rounded-3xl shadow-xl border-4 border-white"
                    />
                    <div className="absolute -top-3 -right-3 text-5xl animate-sparkle">⭐</div>
                    <div className="absolute -bottom-3 -left-3 text-5xl animate-float">✨</div>
                  </div>
                  <div className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full py-3 px-6 shadow-lg">
                    <p className="text-xl sm:text-2xl md:text-3xl font-black text-white text-center">
                      {oyunVerisi.hedefVeriGosterimIsmi}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 md:gap-9 max-w-6xl w-full px-2">
                {oyunVerisi.secenekler.map((resim, index) => (
                  <button
                    key={index}
                    onClick={() => resimTikla(resim)}
                    className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 transform transition-all hover:scale-110 hover:rotate-2 active:scale-95 shadow-xl border-4 border-blue-300 hover:border-yellow-400 group"
                  >
                    <div className="absolute -top-2 -right-2 text-3xl animate-sparkle opacity-0 group-hover:opacity-100 transition-opacity">💫</div>
                    <img
                      src={`http://localhost:8080/media/images/${resim}`}
                      alt={oyunVerisi.gosterimIsimleri[index]}
                      className="w-full aspect-square object-cover rounded-xl sm:rounded-2xl shadow-md"
                    />
                    <div className="mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full py-2 px-4">
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white text-center truncate">
                        {oyunVerisi.gosterimIsimleri[index]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Sıralama Modülü */}
          {tip === 'siralama' && (
            <div className="flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md rounded-full py-4 px-8 mb-8 border-4 border-white/40 animate-pulse-grow">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white text-center flex items-center gap-3">
                  <span className="animate-bounce">👆</span>
                  Resim üzerine tıklayarak sırala (1, 2, 3)
                  <span className="animate-bounce">👆</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-9 md:gap-11 mb-10 w-full max-w-6xl px-2">
                {oyunVerisi.secenekler.map((resim, index) => {
                  const sira = siralamaSonuc.indexOf(resim);
                  const secildi = sira >= 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => resimTikla(resim)}
                      className={`relative bg-white rounded-3xl sm:rounded-[2rem] p-7 sm:p-9 md:p-12 transform transition-all hover:scale-110 hover:rotate-2 active:scale-95 shadow-2xl border-4 group ${
                        secildi 
                          ? 'border-yellow-400 ring-8 ring-yellow-300 scale-105' 
                          : 'border-purple-300 hover:border-pink-400'
                      }`}
                    >
                      {secildi && (
                        <>
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-br from-red-400 to-pink-600 text-white rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-black shadow-2xl z-10 border-4 border-white animate-bounce-in">
                            {sira + 1}
                          </div>
                          <div className="absolute -top-3 -left-3 text-4xl animate-sparkle">⭐</div>
                        </>
                      )}
                      {!secildi && (
                        <div className="absolute -top-2 -right-2 text-3xl animate-wiggle opacity-0 group-hover:opacity-100 transition-opacity">✨</div>
                      )}
                      <img 
                        src={`http://localhost:8080/media/images/${resim}`}
                        alt={oyunVerisi.gosterimIsimleri[index]}
                        className="w-full aspect-square max-w-xs mx-auto object-cover rounded-2xl sm:rounded-3xl shadow-lg"
                      />
                      <div className={`mt-4 rounded-full py-2 px-4 ${
                        secildi 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                          : 'bg-gradient-to-r from-purple-400 to-blue-400'
                      }`}>
                        <p className="text-base sm:text-lg md:text-2xl font-black text-white text-center truncate">
                          {oyunVerisi.gosterimIsimleri[index]}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                <button
                  onClick={siralamaKontrol}
                  disabled={siralamaSonuc.length !== oyunVerisi.secenekler.length}
                  className="relative bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white text-2xl sm:text-3xl md:text-4xl font-black py-5 px-10 sm:py-6 sm:px-14 md:py-7 md:px-16 rounded-full transform transition-all hover:scale-110 active:scale-95 shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 w-full sm:w-auto max-w-md border-6 border-white/50"
                >
                  <span className="flex items-center justify-center gap-3">
                    {siralamaSonuc.length === oyunVerisi.secenekler.length ? '✅' : '⏳'}
                    Kontrol Et
                    {siralamaSonuc.length === oyunVerisi.secenekler.length ? '✅' : '⏳'}
                  </span>
                </button>
              </div>
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

