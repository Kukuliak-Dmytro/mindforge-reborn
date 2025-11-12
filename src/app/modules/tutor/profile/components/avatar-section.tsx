"use client";

import { useState, useMemo } from "react";
import { Avatar } from "@/app/shared/assets/avatars";
import { Button } from "@/app/shared/components/ui/button";
import { AvatarPicker } from "@/app/shared/components/ui/avatar-picker";
import { useUpdateTutorProfile } from "@/app/entities/api/tutor-profile";
import { cn } from "@/app/shared/utils/utils";

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
  const updateProfile = useUpdateTutorProfile();

  const avatarId = useMemo(() => getAvatarIdFromPath(avatarUrl), [avatarUrl]);

  const handleAvatarSave = (avatarPath: string) => {
    updateProfile.mutate(
      { avatarUrl: avatarPath },
      {
        onSuccess: () => {
          setShowAvatarPicker(false);
        },
        onError: (error) => {
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
            {isPending && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  "bg-white/80 rounded-full backdrop-blur-sm",
                )}>
                <div
                  className={cn(
                    `animate-spin rounded-full h-6 w-6 border-b-2
                      border-primary`,
                  )}></div>
              </div>
            )}
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
