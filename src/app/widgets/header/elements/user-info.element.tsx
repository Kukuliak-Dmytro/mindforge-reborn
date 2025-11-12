import { useTranslations } from "next-intl";
import { DropdownMenuLabel } from "@/app/shared/components/ui/dropdown-menu";

interface IUserInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  role: "TUTOR" | "STUDENT";
}

export const UserInfo = ({
  firstName,
  lastName,
  email,
  role,
}: IUserInfoProps) => {
  const t = useTranslations("header");

  return (
    <DropdownMenuLabel className="px-0 pb-2">
      <div className="font-medium">
        {firstName} {lastName}
      </div>
      <div className="text-sm text-gray-600 font-normal">{email}</div>
      <div className="text-xs text-gray-500 font-normal">
        {role === "TUTOR" ? t("role_teacher") : t("role_student")}
      </div>
    </DropdownMenuLabel>
  );
};

