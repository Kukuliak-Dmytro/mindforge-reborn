import { Icon } from "@iconify/react";
import { Link } from "@/pkg/libraries/locale";
import { DropdownMenuItem } from "@/app/shared/components/ui/dropdown-menu";
import { IMenuItem } from "../header.constants";

interface IMenuItemLinkProps {
  item: IMenuItem;
  variant?: "default" | "destructive";
  onClick?: () => void;
}

export const MenuItemLink = ({
  item,
  variant = "default",
  onClick,
}: IMenuItemLinkProps) => {
  if (onClick) {
    return (
      <DropdownMenuItem
        onClick={onClick}
        variant={variant}
        className="flex items-center justify-end gap-2 cursor-pointer">
        {item.label}
        <Icon icon={item.icon} className="size-4" />
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem asChild>
      <Link
        href={item.href}
        className="flex items-center justify-end gap-2 cursor-pointer">
        {item.label}
        <Icon icon={item.icon} className="size-4" />
      </Link>
    </DropdownMenuItem>
  );
};
