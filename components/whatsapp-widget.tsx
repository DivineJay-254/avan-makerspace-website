'use client';

import { useState } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumbers = [
    { name: 'Main Line', number: '+254116000415' },
    { name: 'Support Team', number: '+254114772453' },
  ];

  const handleWhatsAppClick = (number: string) => {
    const message = encodeURIComponent('Hello Avan Makerspace! I would like to inquire about your programs and partnership opportunities.');
    window.open(`https://wa.me/${number.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 p-4 group"
        aria-label="Open WhatsApp chat"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.99 1.534 9.84 9.84 0 00-2.878 3.285 9.823 9.823 0 001.15 11.695 9.82 9.82 0 005.205 2.402c.086.003.192.003.278.003a9.84 9.84 0 009.838-9.838c0-2.63-.67-5.194-1.949-7.489a9.82 9.82 0 00-6.654-3.989zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
        </svg>
      </button>

      {/* WhatsApp Menu */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-lg shadow-2xl overflow-hidden min-w-max">
          <div className="bg-green-500 text-white px-4 py-3 font-semibold">
            Chat with us on WhatsApp
          </div>
          <div className="divide-y">
            {whatsappNumbers.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleWhatsAppClick(item.number);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-gray-800 font-medium flex items-center space-x-2"
              >
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.6915026,12.4744748 C16.6915026,13.4788342 16.4472231,14.4239482 15.9846905,15.2599618 L16.4472231,19.6563168 L11.7181339,17.1064813 C10.6337155,17.4595301 9.47205898,17.6275362 8.24844024,17.6275362 C4.15174502,17.6275362 0.8,14.0152284 0.8,9.68037427 C0.8,5.34551969 4.15174502,1.73321188 8.24844024,1.73321188 C12.3451454,1.73321188 15.6968904,5.34551969 15.6968904,9.68037427 L15.6968904,12.4744748 L16.6915026,12.4744748 Z M23.2,12.4744748 C23.2,13.4788342 22.9557205,14.4239482 22.4931879,15.2599618 L22.9557205,19.6563168 L18.2266312,17.1064813 C17.1422128,17.4595301 15.9805562,17.6275362 14.7569375,17.6275362 C10.6602319,17.6275362 7.30848688,14.0152284 7.30848688,9.68037427 C7.30848688,5.34551969 10.6602319,1.73321188 14.7569375,1.73321188 C18.8536431,1.73321188 22.2053881,5.34551969 22.2053881,9.68037427 L22.2053881,12.4744748 L23.2,12.4744748 Z" />
                </svg>
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.number}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
