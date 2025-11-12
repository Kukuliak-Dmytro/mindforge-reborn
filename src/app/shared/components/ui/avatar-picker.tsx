import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./button";

//constant
/**
 * Avatar paths for both display and storage.
 */
const AVATAR_PATHS = [
  "/assets/avatars/avatar-img-01.png",
  "/assets/avatars/avatar-img-02.png",
  "/assets/avatars/avatar-img-03.png",
  "/assets/avatars/avatar-img-04.png",
  "/assets/avatars/avatar-img-05.png",
  "/assets/avatars/avatar-img-06.png",
] as const;

//function
/**
 * Maps avatar path to index.
 */
const getAvatarIndex = (avatarPath: string | null | undefined): number => {
  if (!avatarPath) return 0;
  const index = AVATAR_PATHS.findIndex((path) => path === avatarPath);
  return index >= 0 ? index : 0;
};

//interface
/**
 * Props for AvatarPicker component.
 */
interface AvatarPickerProps {
  currentAvatarUrl?: string | null;
  onSave: (avatarUrl: string) => void;
  onCancel: () => void;
}

//component
/**
 * AvatarPicker component for selecting from predefined avatars.
 * Uses the same paths for both display and storage (e.g., "/assets/avatars/avatar-img-01.png").
 */
export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  currentAvatarUrl,
  onSave,
  onCancel,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    getAvatarIndex(currentAvatarUrl),
  );

  //return
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Large preview of the selected avatar */}
      <div className="mb-2">
        <Image
          src={AVATAR_PATHS[selectedIndex]}
          alt="Preview Avatar"
          width={140}
          height={140}
        />
      </div>
      {/* Grid of selectable avatars: 3 columns, 2 rows */}
      <div className="grid grid-cols-3 gap-4">
        {AVATAR_PATHS.map((url, idx) => (
          <button
            key={url}
            type="button"
            className={`rounded-full border-2 transition-all duration-150
            focus:outline-none ${
              idx === selectedIndex
                ? "border-primary ring-2 ring-primary"
                : "border-transparent"
            }`}
            style={{ padding: 2, background: "#fff" }}
            onClick={() => setSelectedIndex(idx)}
            aria-label={`Select avatar ${idx + 1}`}>
            <Image
              src={url}
              alt={`Avatar ${idx + 1}`}
              width={60}
              height={60}
              className="rounded-full"
            />
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Button
          variant="primary"
          onClick={() => onSave(AVATAR_PATHS[selectedIndex])}>
          Зберегти
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Скасувати
        </Button>
      </div>
    </div>
  );
};
