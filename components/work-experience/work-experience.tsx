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
];

export default function WorkExperience() {
  return (
    <div className="mt-10 md:pl-9 mb-8">
      <h2 className="text-2xl font-bold">Work Experience</h2>
      <div>
        {workExperience.map((item, index) => (
          <div key={index}>
            <h3>{item.company}</h3>
            <p>{item.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
