import LoaderIcon from "@assets/images/loader.svg";
import Image from "next/image";

type TProps = {
  size?: number;
};
export default function Loader({ size = 20 }: TProps) {
  return (
    <>
      <Image
        src={LoaderIcon}
        width={size}
        height={size}
        alt="loader icon"
        className="animate-spin"
      />
    </>
  );
}
