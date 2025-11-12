"use client";

import { useState, useMemo, useEffect } from "react";
import { Avatar } from "@/app/shared/assets/avatars";
import { Button } from "@/app/shared/components/ui/button";
import { AvatarPicker } from "./avatar-picker";
import { useUpdateTutorProfile } from "@/app/entities/api/tutor-profile";

//interface
/**
 * Props for AvatarSection component.
 */
interface IAvatarSectionProps {
  avatarUrl: string | null;
  isUpdating?: boolean;
}

//function
/**
 * Maps avatar path (e.g., "/assets/avatars/avatar-img-01.png") to Avatar component ID.
 */
const getAvatarIdFromPath = (
  avatarPath: string | null,
): 1 | 2 | 3 | 4 | 5 | 6 | undefined => {
  if (!avatarPath) return undefined;
  const match = avatarPath.match(/avatar-img-0(\d)\.png$/);
  const id = match ? Number(match[1]) : undefined;
  return id && id >= 1 && id <= 6 ? (id as 1 | 2 | 3 | 4 | 5 | 6) : undefined;
};

//component
/**
 * AvatarSection component for displaying and updating tutor avatar.
 * Works with full avatar paths stored in the database (e.g., "/assets/avatars/avatar-img-01.png").
 */
export const AvatarSection = ({
  avatarUrl,
  isUpdating = false,
}: IAvatarSectionProps) => {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [displayedAvatarUrl, setDisplayedAvatarUrl] = useState<string | null>(
    avatarUrl,
  );
  const updateProfile = useUpdateTutorProfile();

  // Sync displayed avatar with prop when it changes (e.g., after query refetch)
  useEffect(() => {
    setDisplayedAvatarUrl(avatarUrl);
  }, [avatarUrl]);

  const avatarId = useMemo(
    () => getAvatarIdFromPath(displayedAvatarUrl),
    [displayedAvatarUrl],
  );

  const handleAvatarSave = (avatarPath: string) => {
    // Skip update if avatar hasn't changed
    if (avatarPath === avatarUrl) {
      setShowAvatarPicker(false);
      return;
    }

    // Optimistically update the displayed avatar immediately
    setDisplayedAvatarUrl(avatarPath);
    updateProfile.mutate(
      { avatarUrl: avatarPath },
      {
        onSuccess: () => {
          setShowAvatarPicker(false);
        },
        onError: (error) => {
          // Revert to the prop value on error
          setDisplayedAvatarUrl(avatarUrl);
          console.error("Error updating avatar:", error);
        },
      },
    );
  };

  const isPending = updateProfile.isPending || isUpdating;

  //return
  return (
    <div className="flex flex-col items-center w-[200px] gap-4">
      {showAvatarPicker ? (
        <>
          <AvatarPicker
            currentAvatarUrl={avatarUrl}
            onSave={handleAvatarSave}
            onCancel={() => setShowAvatarPicker(false)}
          />
          {isPending && (
            <div className="text-center text-primary mt-2">Оновлення...</div>
          )}
        </>
      ) : (
        <>
          <div className="relative">
            <Avatar id={avatarId} size={140} />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={() => setShowAvatarPicker(true)}
              disabled={isPending}>
              Змінити
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
