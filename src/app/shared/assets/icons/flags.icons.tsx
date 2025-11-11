import { FC } from "react";

interface IFlagIconProps {
  /** Country/locale code (e.g., "uk", "en", "us") */
  code: string;
  size?: number;
  className?: string;
}

export const FlagIcon: FC<IFlagIconProps> = ({
  code,
  size = 24,
  className,
}) => {
  const normalizedCode = code.toLowerCase();

  switch (normalizedCode) {
    case "uk":
    case "ua":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}>
          <path
            d="M64 10H8C5.87827 10 3.84344 10.8429 2.34315 12.3431C0.842855 13.8434 0 15.8783 0 18L0 36H72V18C72 15.8783 71.1571 13.8434 69.6569 12.3431C68.1566 10.8429 66.1217 10 64 10Z"
            fill="#005BBB"
          />
          <path
            d="M72 54C72 56.1217 71.1571 58.1566 69.6569 59.6569C68.1566 61.1571 66.1217 62 64 62H8C5.87827 62 3.84344 61.1571 2.34315 59.6569C0.842855 58.1566 0 56.1217 0 54V36H72V54Z"
            fill="#FFD500"
          />
        </svg>
      );

    case "en":
    case "us":
    case "gb":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}>
          <rect width="72" height="72" fill="#012169" />
          <path
            d="M0 0L72 72M72 0L0 72"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M0 0L72 72M72 0L0 72"
            stroke="#C8102E"
            strokeWidth="4.8"
            strokeLinecap="round"
          />
          <path d="M36 0V72M0 36H72" stroke="white" strokeWidth="9.6" />
          <path d="M36 0V72M0 36H72" stroke="#C8102E" strokeWidth="6" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}>
          <rect width="72" height="72" fill="#CCCCCC" />
          <text
            x="36"
            y="40"
            fontSize="24"
            fill="#666666"
            textAnchor="middle"
            dominantBaseline="middle">
            {code.toUpperCase()}
          </text>
        </svg>
      );
  }
};
