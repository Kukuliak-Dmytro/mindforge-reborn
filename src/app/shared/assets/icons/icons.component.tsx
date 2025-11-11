import { FC } from "react";
import { SubjectIcon } from "./subject.icons";
import { CategoryIcon } from "./category.icons";

interface IIconsProps {
  icon:
    | "DT"
    | "DR"
    | "HW"
    | "KR"
    | "TT"
    | "Ukr"
    | "Mat"
    | "Eng"
    | "Bio"
    | "Geo"
    | "His"
    | "Phy"
    | "Che"
    | "Inf";
  size?: number;
  color?: string;
}

const SUBJECT_ICON_MAP: Record<
  string,
  | "geography"
  | "english"
  | "mathematics"
  | "biology"
  | "informatics"
  | "physics"
  | "ukrainian"
  | "chemistry"
  | "history"
> = {
  Geo: "geography",
  Eng: "english",
  Mat: "mathematics",
  Bio: "biology",
  Inf: "informatics",
  Phy: "physics",
  Ukr: "ukrainian",
  Che: "chemistry",
  His: "history",
};

const CATEGORY_ICON_MAP: Record<
  string,
  "exam" | "tutoring" | "diploma" | "homework" | "difficulties"
> = {
  KR: "exam",
  TT: "tutoring",
  DR: "diploma",
  HW: "homework",
  DT: "difficulties",
};

export const Icons: FC<IIconsProps> = ({
  icon,
  size = 64,
  color = "currentColor",
}) => {
  if (SUBJECT_ICON_MAP[icon]) {
    return (
      <SubjectIcon icon={SUBJECT_ICON_MAP[icon]} size={size} color={color} />
    );
  }

  if (CATEGORY_ICON_MAP[icon]) {
    return <CategoryIcon icon={CATEGORY_ICON_MAP[icon]} size={size} />;
  }

  return null;
};
