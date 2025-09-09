import { User } from "@/types/user";
import { calculateAge } from "@/utils/calculate-age";
import EditIcon from "@assets/images/edit-icon.svg";
import { format } from "date-fns";
import Image from "next/image";
import Skeleton from "./elements/skeleton";

type TProps = {
  title: string;
  detail: string;
  onEdit?: () => void;
  user?: User | null;
  horoscope?: string;
  zodiac?: string;
  loading: boolean;
};

export default function DetailCard({
  detail,
  horoscope,
  loading,
  onEdit,
  title,
  user = null,
  zodiac,
}: TProps) {
  return (
    <div className="detail-card relative flex flex-col gap-4 rounded-2xl p-4 text-sm">
      <h2 className="font-bold">{title}</h2>

      <Image
        src={EditIcon}
        width={17}
        height={17}
        alt="edit icon"
        className="absolute right-4 top-4 cursor-pointer"
        onClick={onEdit}
      />
      <div className="text-white/50">
        <>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {user ? (
                <div className="flex flex-col gap-4">
                  {user.birthday && (
                    <div>
                      Birthday:{" "}
                      <span className="text-white">
                        {format(new Date(user.birthday), "dd / MM / yyyy")} (Age{" "}
                        {calculateAge(`${user.birthday}`)})
                      </span>
                    </div>
                  )}
                  <div>
                    Horoscope: <span className="text-white">{horoscope}</span>
                  </div>
                  <div>
                    Zodiac: <span className="text-white">{zodiac}</span>
                  </div>

                  {user.height && (
                    <div>
                      Height:{" "}
                      <span className="text-white">
                        {user?.height?.amount} {user?.height?.unit}
                      </span>
                    </div>
                  )}
                  {user.weight && (
                    <div>
                      Weight:{" "}
                      <span className="text-white">
                        {user?.weight?.amount} {user?.weight?.unit}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div>{detail}</div>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
}
