import { cn } from "@/lib/utils";

interface JharkhandIconProps {
  className?: string;
}

const JharkhandIcon = ({ className }: JharkhandIconProps) => {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-6 h-6", className)}
    >
      {/* Jharkhand state outline */}
      <path
        d="M50 5
           L65 10
           L78 18
           L88 30
           L92 45
           L90 60
           L85 72
           L78 82
           L70 92
           L60 100
           L50 108
           L40 102
           L28 95
           L18 85
           L12 72
           L8 58
           L10 42
           L15 28
           L25 16
           L38 8
           Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      {/* Inner detail lines representing districts/terrain */}
      <path
        d="M35 35 L50 45 L65 38"
        strokeOpacity="0.5"
      />
      <path
        d="M25 55 L45 60 L55 52 L75 58"
        strokeOpacity="0.5"
      />
      <path
        d="M30 75 L50 70 L68 78"
        strokeOpacity="0.5"
      />
    </svg>
  );
};

export default JharkhandIcon;
