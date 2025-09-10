import { useRouter } from "next/navigation";

interface AuthNavigationProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export default function AuthNavigation({ linkHref, linkText, text }: AuthNavigationProps) {
  const router = useRouter();

  return (
    <div className="mt-5 flex justify-center text-xs font-medium">
      <div className="flex gap-1">
        {text}{" "}
        <button
          type="button"
          className="text-golden-gradient cursor-pointer select-none"
          onClick={() => router.push(linkHref)}
        >
          {linkText}
        </button>
      </div>
    </div>
  );
}
