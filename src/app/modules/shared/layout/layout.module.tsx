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
    <div className="flex flex-col items-center justify-center gap-[60px]">
      <HeaderComponent />
      <main
        className="flex flex-col items-center justify-center w-full
          max-w-[1240px]">
        {children}
      </main>
      <footer></footer>
    </div>
  );
};
