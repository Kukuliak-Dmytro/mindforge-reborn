import React, { useState } from 'react';
import Image from 'next/image';
import { PrimaryButton, SecondaryButton } from './button';

const avatarImages = [
  '/assets/avatars/avatarImg1.png',
  '/assets/avatars/avatarImg2.png',
  '/assets/avatars/avatarImg3.png',
  '/assets/avatars/avatarImg4.png',
  '/assets/avatars/avatarImg5.png',
  '/assets/avatars/avatarImg6.png',
];

interface AvatarPickerProps {
  currentAvatarUrl?: string | null;
  onSave: (avatarUrl: string) => void;
  onCancel: () => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ currentAvatarUrl, onSave, onCancel }) => {
  // Default to first avatar if currentAvatarUrl is not set or not found
  const initialIndex = currentAvatarUrl
    ? avatarImages.findIndex((url) => url === currentAvatarUrl)
    : 0;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Large preview of the selected avatar, no extra rounding or border */}
      <div className="mb-2">
        <Image
          src={avatarImages[selectedIndex]}
          alt={`Preview Avatar`}
          width={140}
          height={140}
        />
      </div>
      {/* Grid of selectable avatars: 3 columns, 2 rows */}
      <div className="grid grid-cols-3 gap-4">
        {avatarImages.map((url, idx) => (
          <button
            key={url}
            type="button"
            className={`rounded-full border-2 transition-all duration-150 focus:outline-none ${
              idx === selectedIndex ? 'border-primary ring-2 ring-primary' : 'border-transparent'
            }`}
            style={{ padding: 2, background: '#fff' }}
            onClick={() => setSelectedIndex(idx)}
            aria-label={`Select avatar ${idx + 1}`}
          >
            <Image src={url} alt={`Avatar ${idx + 1}`} width={60} height={60} className="rounded-full" />
          </button>
        ))}
      </div>
      <div className="flex  flex-col gap-2 mt-2">
        <PrimaryButton onClick={() => onSave(avatarImages[selectedIndex])}>
          Зберегти
        </PrimaryButton>
        <SecondaryButton onClick={onCancel}>
          Скасувати
        </SecondaryButton>
      </div>
    </div>
  );
}; 