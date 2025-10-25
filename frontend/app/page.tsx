import Link from 'next/link';

export default function LobiSayfasi() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Dekoratif arka plan elementleri */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-20">⭐</div>
        <div className="absolute top-20 right-20 text-5xl animate-wiggle opacity-20">🌟</div>
        <div className="absolute bottom-20 left-20 text-7xl animate-sparkle opacity-20">✨</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-float opacity-20">🎈</div>
        <div className="absolute top-1/2 left-1/4 text-5xl animate-pulse opacity-20">🎨</div>
        <div className="absolute top-1/3 right-1/4 text-6xl animate-bounce opacity-20">🎪</div>
      </div>
      
      <div className="max-w-6xl w-full relative z-10">
        {/* Başlık - Sürekli parıldayan */}
        <div className="text-center mb-8 sm:mb-12 animate-bounce-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 drop-shadow-2xl animate-pulse-grow">
            <span className="inline-block animate-wiggle">🎮</span>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"> Zeka Kutusu </span>
            <span className="inline-block animate-wiggle">🎮</span>
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-full py-3 px-6 inline-block animate-sparkle">
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold drop-shadow-lg">
              ✨ Hangi oyunu oynamak istersin? ✨
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* Ses Eşleştirme Oyunu */}
          <Link 
            href="/oyun/ses-eslestirme"
            className="group"
          >
            <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 min-h-64 sm:min-h-72 md:min-h-80 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-2 shadow-2xl cursor-pointer active:scale-95 border-4 border-white/30 sparkle-border overflow-hidden">
              <div className="absolute top-3 right-3 text-3xl animate-sparkle">✨</div>
              <div className="absolute bottom-3 left-3 text-3xl animate-float">🎵</div>
              <div className="text-7xl sm:text-8xl md:text-9xl mb-6 sm:mb-8 group-hover:animate-bounce animate-pulse-grow">
                🎧
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center drop-shadow-lg">
                Sesi Dinle,
                <br />
                Resmi Bul
              </h2>
              <div className="mt-4 bg-yellow-300 text-blue-600 px-6 py-2 rounded-full font-bold text-lg group-hover:bg-yellow-200 transition-colors">
                OYNA! 🎯
              </div>
            </div>
          </Link>
          
          {/* Görsel Eşleştirme Oyunu */}
          <Link 
            href="/oyun/gorsel-eslestirme"
            className="group"
          >
            <div className="relative bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 min-h-64 sm:min-h-72 md:min-h-80 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-2 shadow-2xl cursor-pointer active:scale-95 border-4 border-white/30 sparkle-border overflow-hidden">
              <div className="absolute top-3 left-3 text-3xl animate-wiggle">💎</div>
              <div className="absolute bottom-3 right-3 text-3xl animate-sparkle">⭐</div>
              <div className="text-7xl sm:text-8xl md:text-9xl mb-6 sm:mb-8 group-hover:animate-bounce animate-pulse-grow">
                👁️
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center drop-shadow-lg">
                Aynısını
                <br />
                Bul
              </h2>
              <div className="mt-4 bg-pink-300 text-green-700 px-6 py-2 rounded-full font-bold text-lg group-hover:bg-pink-200 transition-colors">
                OYNA! 🎯
              </div>
            </div>
          </Link>
          
          {/* Sıralama Oyunu */}
          <Link 
            href="/oyun/siralama"
            className="group sm:col-span-2 lg:col-span-1"
          >
            <div className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 min-h-64 sm:min-h-72 md:min-h-80 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-2 shadow-2xl cursor-pointer active:scale-95 border-4 border-white/30 sparkle-border overflow-hidden">
              <div className="absolute top-3 right-3 text-3xl animate-float">🎪</div>
              <div className="absolute bottom-3 left-3 text-3xl animate-wiggle">🎨</div>
              <div className="text-7xl sm:text-8xl md:text-9xl mb-6 sm:mb-8 group-hover:animate-bounce animate-pulse-grow">
                📚
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center drop-shadow-lg">
                Hikayeyi
                <br />
                Sırala
              </h2>
              <div className="mt-4 bg-cyan-300 text-red-600 px-6 py-2 rounded-full font-bold text-lg group-hover:bg-cyan-200 transition-colors">
                OYNA! 🎯
              </div>
            </div>
          </Link>
        </div>
        
        {/* Alt bilgi */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-full py-3 px-8 inline-block animate-float">
            <p className="text-base sm:text-lg md:text-xl text-white font-bold">
              🎉 Oyun oyna, öğren, eğlen! 🎉
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
