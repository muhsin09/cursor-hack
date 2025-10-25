import Link from 'next/link';

export default function LobiSayfasi() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-3 sm:mb-4 drop-shadow-lg">
          🎮 Zeka Kutusu 🎮
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white text-center mb-6 sm:mb-8 md:mb-12 drop-shadow">
          Hangi oyunu oynamak istersin?
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Ses Eşleştirme Oyunu */}
          <Link 
            href="/oyun/ses-eslestirme"
            className="group"
          >
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-h-48 sm:min-h-56 md:min-h-64 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer active:scale-95">
              <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 group-hover:animate-bounce">
                🎧
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                Sesi Dinle, Resmi Bul
              </h2>
            </div>
          </Link>
          
          {/* Görsel Eşleştirme Oyunu */}
          <Link 
            href="/oyun/gorsel-eslestirme"
            className="group"
          >
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-h-48 sm:min-h-56 md:min-h-64 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer active:scale-95">
              <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 group-hover:animate-bounce">
                👁️
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                Aynısını Bul
              </h2>
            </div>
          </Link>
          
          {/* Sıralama Oyunu */}
          <Link 
            href="/oyun/siralama"
            className="group"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 min-h-48 sm:min-h-56 md:min-h-64 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer active:scale-95">
              <div className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 group-hover:animate-bounce">
                📚
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                Hikayeyi Sırala
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
