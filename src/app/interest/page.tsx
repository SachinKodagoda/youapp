import BackImage from "@assets/images/back-icon.svg";
import Image from "next/image";

export default function Interest() {
  return (
    <main className="container flex min-h-dvh flex-col gap-8 p-4">
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex w-14 cursor-pointer gap-2 text-sm font-bold">
          <Image src={BackImage} width={7} height={14} alt="back icon" className="w-auto" />
          Back
        </div>
        <div className="blue-text flex w-11 justify-end text-sm font-semibold">Save</div>
      </div>
      <div>
        <div className="gold-text text-sm font-bold">Tell everyone about yourself</div>
        <div className="text-xl font-bold">What interest you?</div>
      </div>
    </main>
  );
}
