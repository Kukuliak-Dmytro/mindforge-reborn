import { FC } from 'react';
import { Icons } from '@/app/shared/assets/icons';
import { cn } from '@/app/shared/utils/utils';

interface ISubjectSnippetProps {
  title: string;
  icon: "DT" | "DR" | "HW" | "KR" | "TT" | "Ukr" | "Mat" | "Eng" | "Bio" | "Geo" | "His" | "Phy" | "Che" | "Inf";
  size?: number;
  variant?: 'Default' | 'Inverse';
}

export const SubjectSnippet: FC<ISubjectSnippetProps> = ({ 
  icon, 
  size = 35,
  title, 
  variant = 'Default' 
}) => {
  return (
    <div 
      className={cn(
        "h-[35px] w-auto px-[10px] rounded-small shadow-small bg-white-bg",
        "flex justify-between items-center",
        variant === 'Inverse' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div>
        <Icons icon={icon} size={size} />
      </div>
      <div className={cn("py-[10px]")}>
        <p>{title}</p>
      </div>
    </div>
  );
};