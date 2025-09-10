import EditIcon from "@assets/images/edit-icon.svg";
import Image from "next/image";
import Skeleton from "./elements/skeleton";

type TProps = {
  interests?: string[];
  loading: boolean;
  onEdit?: () => void;
};

export default function InterestCard({ interests = [], loading, onEdit }: TProps) {
  return (
    <div className="detail-card relative flex flex-col gap-4 rounded-2xl p-4 text-sm">
      <h2 className="font-bold">Interest</h2>
      <Image
        src={EditIcon}
        width={17}
        height={17}
        alt="edit icon"
        className="absolute right-4 top-4 cursor-pointer"
        onClick={onEdit}
      />
      <div className="text-white/50">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {interests.length === 0 ? (
              <div>Add in your interest to find a better match</div>
            ) : (
              <div>
                {interests.map((interest) => (
                  <div
                    key={interest}
                    className="mb-2 mr-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                  >
                    {interest}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
