import { FC, ReactNode } from 'react';
import { Button } from '@/app/shared/components/ui/button';
import { cn } from '@/app/shared/utils/utils';

interface ISubjectCardProps {
  title: string;
  link: string;
  children: ReactNode;
  /** Type of subject card - determines the query parameter that will be used */
  type?: 'subject' | 'category';
  /** Code identifier for the subject or category (e.g., "Mat" for Математика) */
  code: string;
}

export const SubjectCard: FC<ISubjectCardProps> = ({ title, link, children, type = 'subject', code }) => {
  // Add query parameter based on type and code
  const href = link.includes('?') 
    ? `${link}&${type}=${encodeURIComponent(code)}` 
    : `${link}?${type}=${encodeURIComponent(code)}`;
    
  return (
    <div className={cn("flex flex-col items-center p-8 gap-4 bg-white-bg rounded-small shadow-double border-t-[5px] border-accent")}>
      {children}
      <h4 className={cn("text-[30px]")}>{title}</h4>
      <Button variant="secondary" href={href}>Перейти</Button>
    </div>
  );
}; 