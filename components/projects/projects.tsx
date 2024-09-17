const projects = [
  {
    name: "Project 1",
    description: "Description 1",
    link: "https://example.com",
  },
  {
    name: "Project 2",
    description: "Description 2",
    link: "https://example.com",
  },
  {
    name: "Project 3",
    description: "Description 3",
    link: "https://example.com",
  },
];

export default function Projects() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Projects
      </h2>
      <div>
        {projects.map((project) => (
          <div key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <a href={project.link}>{project.link}</a>
          </div>
        ))}
      </div>
    </section>
  );
}
