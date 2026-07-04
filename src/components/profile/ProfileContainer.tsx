import PersonInfo from "@/src/components/profile/PersonInfo";
import { useTranslations } from "next-intl";

export default function ProfileContainer() {
  const tProfile = useTranslations("profile");

  return (
    <div className="w-full text-gray-700 dark:text-gray-300">
      <div className="flex flex-col gap-10 ">
        <PersonInfo
          name={tProfile("name")}
          title={tProfile("title")}
          description={tProfile("description")}
        />
      </div>
    </div>
  );
}
