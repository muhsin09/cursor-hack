'use client';

interface FeedbackOverlayProps {
  dogru: boolean;
  mesaj: string;
  goster: boolean;
  yeniSoru: () => void;
}

export function FeedbackOverlay({ dogru, mesaj, goster, yeniSoru }: FeedbackOverlayProps) {
  if (!goster) return null;
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${
      dogru ? 'bg-green-500' : 'bg-red-500'
    } bg-opacity-95 animate-fade-in`}>
      <div className="text-center max-w-2xl w-full">
        <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 animate-bounce">
          {dogru ? '🎉' : '🔄'}
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 px-4">
          {mesaj}
        </h2>
        <button
          onClick={yeniSoru}
          className="bg-white text-gray-800 text-xl sm:text-2xl md:text-3xl font-bold py-4 px-8 sm:py-5 sm:px-10 md:py-6 md:px-12 rounded-full hover:bg-gray-100 active:bg-gray-200 transform transition-all hover:scale-110 active:scale-95 shadow-2xl w-full sm:w-auto max-w-sm"
        >
          Yeni Soru
        </button>
      </div>
    </div>
  );
}

