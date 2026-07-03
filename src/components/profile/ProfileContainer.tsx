import PersonInfo from "@/src/components/profile/PersonInfo";
import { useTranslations } from "next-intl";

export default function ProfileContainer() {
  const tProfile = useTranslations("profile");

  return (
    <div className="w-full text-gray-700 dark:text-gray-300">
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
        <PersonInfo
          name={tProfile("name")}
          title={tProfile("title")}
        />
      </div>
    </div>
  );
}
