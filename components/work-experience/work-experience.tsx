const workExperience = [
  {
    company: "Ringus-solution",
    position: "Frontend Engineer",
    duration: "2022-11-01 ~ Present",
    description:
      "Developed web applications using React.js, Next.js, TailwindCSS, TypeScript and other frontend technologies.",
  },
  {
    company: "CondaPayment",
    position: "Senior Marketing",
    duration: "2021-10-01 ~ 2022-12-01",
    description:
      "Responsible for TW/HK/MO market, including market strategy, competitor analysis, and product positioning.",
  },
  {
    company: "exe",
    position: "Community Manager",
    duration: "2020-05-01 ~ 2021-09-27",
    description: "Built Mandarin community, hosted online and offline events.",
  },
  {
    company: "Wargaming.net",
    position: "Sales Optimization (Team Lead)",
    duration: "2018-12-01 ~ 2020-03-01",
    description: "Optimized sales process and increased sales efficiency.",
  },
];

export default function WorkExperience() {
  return (
    <div className="mt-[20px] md:pl-9 mb-8 px-4 sm:px-0">
      <h2 className="text-2xl mb-[20px] font-bold">Work Experience</h2>
      <div>
        {workExperience
          .sort(
            (a, b) =>
              new Date(b.duration.split(" ~ ")[0]).getTime() -
              new Date(a.duration.split(" ~ ")[0]).getTime()
          )
          .map((experience, index) => (
            <div
              key={index}
              className="mb-4 flex flex-col sm:flex-row sm:justify-between w-full"
            >
              <div className="flex sm:w-[70%]">
                <div className="w-[30px] mt-[7px] h-[30px] bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {index + 1}
                  </span>
                </div>
                <div className="ml-4 w-full">
                  <div className="flex items-center justify-between gap-7">
                    <h3 className="text-lg font-semibold">
                      {experience.company}
                    </h3>
                  </div>
                  <p className="text-md font-semibold text-gray-600">
                    {experience.position}
                  </p>

                  <p className="text-sm text-gray-600">
                    {experience.description}
                  </p>
                </div>
              </div>
              <div className="hidden sm:inline-block sm:w-[30%] sm:text-right">
                <p className="text-xs text-gray-600">{experience.duration}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
