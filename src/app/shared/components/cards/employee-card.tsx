// TODO: Will be refactored later
import { ReactNode } from 'react';
import { Button } from '@/app/shared/components/ui/button';
import { Avatar } from "@/app/shared/assets/avatars";

interface IEmployeeCardProps {
  name: string;
  rating: string;
  avatarId?: 1 | 2 | 3 | 4 | 5 | 6;
  customAvatar?: ReactNode;
  education: string;
  description: string;
  worksSince: string;
  isSaved?: boolean;
  onSave?: () => void;
  onUnsave?: () => void;
}

export const EmployeeCard = ({ 
  name, 
  rating, 
  avatarId, 
  customAvatar, 
  education, 
  description, 
  worksSince ,
  isSaved = false,
  onSave,
  onUnsave
}: IEmployeeCardProps) => {
  return (
    <div className="grid gap-4 bg-white-bg shadow-double rounded-medium p-6">
      <div className="flex gap-4 items-center">
        {customAvatar || (avatarId && <Avatar id={avatarId} size={80} />)}
        <div className="w-full grid gap-3">
          <span className="flex justify-between">
            <h4 className="font-medium">{name}</h4>
            <h3 className="font-medium">{rating}</h3>
          </span>
          <span className="flex justify-between items-center">
            <p className="p2">{worksSince}</p>
            <div className="flex gap-4">
              <Button variant="primary" href="/orders/create">Замовити послугу</Button>
              <Button variant="secondary" size="icon" onClick={isSaved ? onUnsave : onSave} aria-label={isSaved ? 'Unsave' : 'Save'} className={isSaved ? "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500" : undefined}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55ZM16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" fill={isSaved ? "currentColor" : "#0B0702"} />
                </svg>
              </Button>
            </div>
          </span>
        </div>
      </div>

      <p className="font-medium">{education}</p>
      <p>{description}</p>
    </div>
  );
}; 