// TODO: Will be refactored later
import { Avatar } from "@/app/shared/assets/avatars";
import { Button } from "@/app/shared/components/ui/button";

interface IChatCardProps {
  name?: string;
  title?: string;
  avartarId?: 1 | 2 | 3 | 4 | 5 | 6;
  customAvatar?: React.ReactNode;
}

export const ChatCard = ({ ...props }: IChatCardProps) => {
  return (
    <div
      className="bg-background p-6 flex gap-4 shadow-double rounded-medium
        text-left items-center w-full">
      <Avatar id={props.avartarId} size={100}></Avatar>
      <div className="flex flex-col justify-between w-full">
        <h4>Петро Петров</h4>
        <div className="flex justify-between items-center w-full">
          <h6>Підготовка до ЗНО з математики</h6>
          <Button variant="primary" href="/chats">Перейти</Button>
        </div>
      </div>
    </div>
  );
};
