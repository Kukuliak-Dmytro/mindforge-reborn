import Image from "next/image";
import { FC } from "react";

interface IAvatarProps {
  id?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: number;
}

export const Avatar: FC<IAvatarProps> = ({ id, size }) => {
  switch (id) {
    case 1:
      return (
        <Image
          src="/assets/avatars/avatar-img-01.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
    case 2:
      return (
        <Image
          src="/assets/avatars/avatar-img-02.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
    case 3:
      return (
        <Image
          src="/assets/avatars/avatar-img-03.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
    case 4:
      return (
        <Image
          src="/assets/avatars/avatar-img-04.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
    case 5:
      return (
        <Image
          src="/assets/avatars/avatar-img-05.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
    case 6:
      return (
        <Image
          src="/assets/avatars/avatar-img-06.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
    default:
      return (
        <Image
          src="/assets/avatars/avatar-img-00.png"
          alt=""
          width={size || 40}
          height={size || 40}
        />
      );
  }
};
