'use client';

import { useEffect } from 'react';

interface FeedbackOverlayProps {
  dogru: boolean;
  mesaj: string;
  goster: boolean;
  yeniSoru: () => void;
}

export function FeedbackOverlay({ dogru, mesaj, goster, yeniSoru }: FeedbackOverlayProps) {
  // Overlay gösterildiğinde body scroll'unu engelle
  useEffect(() => {
    if (goster) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Sayfayı en üste kaydır
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [goster, dogru, mesaj]);
  
  if (!goster) return null;
  
  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 animate-fade-in overflow-hidden`}
      style={{ 
        zIndex: 9999,
        backgroundColor: dogru 
          ? 'rgba(52, 211, 153, 0.98)' 
          : 'rgba(251, 146, 60, 0.98)',
        backgroundImage: dogru
          ? 'linear-gradient(to bottom right, rgb(52, 211, 153), rgb(16, 185, 129), rgb(20, 184, 166))'
          : 'linear-gradient(to bottom right, rgb(251, 146, 60), rgb(239, 68, 68), rgb(236, 72, 153))'
      }}
    >
      {/* Konfeti animasyonları - sadece doğru cevaplarda */}
      {dogru && (
        <>
          <div className="absolute top-0 left-1/4 text-4xl animate-[confetti-fall_3s_ease-in_infinite]" style={{animationDelay: '0s'}}>🎊</div>
          <div className="absolute top-0 left-1/2 text-5xl animate-[confetti-fall_2.5s_ease-in_infinite]" style={{animationDelay: '0.5s'}}>⭐</div>
          <div className="absolute top-0 left-3/4 text-4xl animate-[confetti-fall_3.5s_ease-in_infinite]" style={{animationDelay: '1s'}}>🎉</div>
          <div className="absolute top-0 left-1/3 text-6xl animate-[confetti-fall_2.8s_ease-in_infinite]" style={{animationDelay: '0.3s'}}>✨</div>
          <div className="absolute top-0 left-2/3 text-5xl animate-[confetti-fall_3.2s_ease-in_infinite]" style={{animationDelay: '0.8s'}}>🌟</div>
        </>
      )}
      
      <div className="text-center max-w-3xl w-full relative z-10 animate-bounce-in">
        {/* Büyük emoji */}
        <div className="mb-8 sm:mb-10 relative">
          <div className="absolute inset-0 blur-3xl opacity-50 animate-pulse">
            <div className={`w-48 h-48 mx-auto rounded-full ${dogru ? 'bg-yellow-300' : 'bg-red-400'}`}></div>
          </div>
          <div className="relative text-8xl sm:text-9xl md:text-[12rem] animate-bounce">
            {dogru ? (
              <span className="inline-block animate-wiggle">🎉</span>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <span className="inline-block animate-shake text-[10rem] sm:text-[12rem] md:text-[16rem]">❌</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Mesaj - Sadece doğru cevaplarda göster */}
        {dogru && (
          <div className="bg-white/20 backdrop-blur-md rounded-3xl py-6 px-8 border-8 border-yellow-300 mb-8 sm:mb-10 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg px-4">
              {mesaj}
            </h2>
          </div>
        )}
        
        {/* Yanlış cevap için görsel mesaj */}
        {!dogru && (
          <div className="bg-white/20 backdrop-blur-md rounded-3xl py-8 px-10 border-8 border-red-400 mb-8 sm:mb-10 shadow-2xl">
            <div className="flex items-center justify-center gap-6 mb-4">
              <span className="text-6xl animate-wiggle">😢</span>
              <span className="text-6xl animate-bounce">👎</span>
              <span className="text-6xl animate-wiggle">😢</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-lg px-4">
              Tekrar Dene!
            </h2>
            <div className="flex items-center justify-center gap-6 mt-6">
              <span className="text-5xl animate-bounce">👇</span>
              <span className="text-5xl animate-wiggle">💪</span>
              <span className="text-5xl animate-bounce">👇</span>
            </div>
          </div>
        )}
        
        {/* Yeni soru butonu */}
        <div className="relative">
          <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30 animate-pulse"></div>
          <button
            onClick={yeniSoru}
            className="relative bg-white text-gray-800 text-2xl sm:text-3xl md:text-4xl font-black py-5 px-10 sm:py-6 sm:px-14 md:py-7 md:px-16 rounded-full hover:bg-yellow-300 hover:scale-110 active:bg-yellow-400 active:scale-95 transform transition-all shadow-2xl border-6 border-gray-200 w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-3">
              🎮 Yeni Soru 🎮
            </span>
          </button>
        </div>
        
        {/* Ekstra dekoratif elementler */}
        {dogru ? (
          <>
            <div className="absolute top-1/4 left-10 text-6xl animate-float">🏆</div>
            <div className="absolute top-1/3 right-10 text-6xl animate-sparkle">💎</div>
            <div className="absolute bottom-1/4 left-20 text-5xl animate-wiggle">⭐</div>
            <div className="absolute bottom-1/3 right-20 text-5xl animate-bounce">🌟</div>
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-10 text-6xl animate-shake">😔</div>
            <div className="absolute top-1/3 right-10 text-6xl animate-shake">😢</div>
            <div className="absolute bottom-1/4 left-20 text-5xl animate-bounce">💪</div>
            <div className="absolute bottom-1/3 right-20 text-5xl animate-bounce">🔄</div>
          </>
        )}
      </div>
    </div>
  );
}

