import React from "react";
import Nav from './components/nav.jsx'
import * as functions from './components/functions.jsx';
import { experiences, education, qualifications, projects } from './components/data.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#BFB9FA] to-[#b3fbf9] text-gray-900">
      <Nav />
      
      <div className="p-6 sm:p-8 md:p-10 lg:p-12">
        <header className="mb-12">
          <functions.Intro />
        </header>
      <main>
        <section className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-sky-800 bg-clip-text text-transparent animate-gradient">
            Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <functions.ExperienceItem
                key={index}
                date={experience.date}
                role={experience.role}
                company={experience.company}
                responsibilities={experience.responsibilities}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-sky-800 bg-clip-text text-transparent animate-gradient">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <functions.Card key={index}>
                <functions.CardEyebrow className="text-lg font-semibold">{edu.date}</functions.CardEyebrow>
                <h3 className="text-base font-semibold tracking-tight text-gray-600">
                  {edu.institution}
                </h3>
                <functions.ContentCardDescription>
                  <p>{edu.degree}</p>
                  <ul className="list-disc ml-5">
                    {edu.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </functions.ContentCardDescription>
              </functions.Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-sky-800 bg-clip-text text-transparent animate-gradient">
            Additional Qualifications
          </h2>
          <functions.Card>
            <functions.ContentCardDescription>
              <ul className="list-disc ml-5">
                {qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </functions.ContentCardDescription>
          </functions.Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-red-500 to-sky-800 bg-clip-text text-transparent animate-gradient">
            Projects
          </h2>
          {projects.map((project, index) => (
            <functions.Card key={index} className="mt-4">
              <functions.CardTitle>
                {project.title}
              </functions.CardTitle>
              <functions.ContentCardDescription>
                {project.description}
              </functions.ContentCardDescription>
            </functions.Card>
          ))}
        </section>
      </main>
    </div>
    </div>
  );
}
