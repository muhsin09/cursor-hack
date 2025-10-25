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
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${
      dogru ? 'bg-green-500' : 'bg-red-500'
    } bg-opacity-95 animate-fade-in`}>
      <div className="text-center">
        <div className="text-9xl mb-8 animate-bounce">
          {dogru ? '🎉' : '🔄'}
        </div>
        <h2 className="text-6xl font-bold text-white mb-8">
          {mesaj}
        </h2>
        <button
          onClick={yeniSoru}
          className="bg-white text-gray-800 text-3xl font-bold py-6 px-12 rounded-full hover:bg-gray-100 transform transition-all hover:scale-110 shadow-2xl"
        >
          Yeni Soru
        </button>
      </div>
    </div>
  );
}

