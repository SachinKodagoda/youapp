import AboutForm from "@components/about-form";
import AddImage from "@components/add-image";

type TProps = { onEdit?: () => void };

export default function EditAbout({ onEdit }: TProps) {
  return (
    <div className="detail-card relative flex flex-col gap-7 rounded-2xl p-4 text-sm">
      <div className="flex items-center justify-between text-sm">
        <div className="font-bold">About</div>
        <div className="gold-text cursor-pointer font-[500]" onClick={onEdit}>
          Save & Update
        </div>
      </div>
      <AddImage />
      <AboutForm />
    </div>
  );
}
