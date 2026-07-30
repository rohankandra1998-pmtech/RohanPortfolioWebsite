import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product case studies by Rohan Kandra: LaunchGuard, RAG Knowledge Assistant, and UR CourseBot 2.0.",
};

export default function WorkPage() {
  return (
    <>
      <section className="page-head page-head--work">
        <div className="wrap" data-reveal>
          <p className="eyebrow eyebrow--dot">Selected work</p>
          <h1>Products shaped through evidence.</h1>
          <p className="page-head__lead">
            Three projects across AI quality, grounded knowledge retrieval, and
            education technology. Each case study separates what was built,
            what was proposed, and what was learned.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap project-grid project-grid--index">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              priority={index === 0}
              project={project}
            />
          ))}
        </div>
      </section>
    </>
  );
}
