import { FC } from "react";
import { HeaderComponent } from "@/app/widgets/header/header.widget";

//interface
interface IProps {
  children: React.ReactNode;
}

//component
export const LayoutModule: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  //return
  return (
    <div>
      <HeaderComponent />
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
};
