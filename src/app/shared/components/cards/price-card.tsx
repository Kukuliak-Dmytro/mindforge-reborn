// TODO: Will be refactored later
interface IPriceCardProps {
  title: string;
  price: number;
}

export const PriceCard = ({ title, price }: IPriceCardProps) => {
  return (
    <div className="p-2 pl-[34px] w-full flex justify-between items-center relative bg-white-bg rounded-small shadow-medium">
      <div className="w-[18px] h-[38px] absolute top-0 left-2 bg-accent rounded-[2px] [clip-path:polygon(100%_0,100%_100%,50%_75%,0_100%,0_0)]"></div>
      <h6>{title}</h6>
      <p className='p2'>{price} грн</p>
    </div>
  );
}; 