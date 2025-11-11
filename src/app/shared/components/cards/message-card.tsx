// TODO: Will be refactored later
interface IMessageCardProps {
  sender?: boolean;
}

export const MessageCard = ({ sender }: IMessageCardProps) => {
  const messageClass = sender ? "border-primary" : "border-secondary";

  return (
    <div
      className={
        "bg-white-bg p-4 border-4 " +
        messageClass +
        " rounded-medium text-left w-full flex gap-2 items-end"
      }>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia qui ipsam
        nisi aliquam consequatur nostrum, deleniti provident! Blanditiis, vitae
        sequi!
      </p>
      <p className="!text-[12px]"> 20:00</p>
    </div>
  );
};
