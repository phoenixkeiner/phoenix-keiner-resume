import React from "react";
import * as functions from './components/functions.jsx';
import * as SocialIcons from './components/SocialIcons';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Phoenix Keiner</h1>
        <p className="text-xl">Web Developer</p>
        <div className="mt-6 flex gap-6">
        <functions.SocialLink
              href="#"
              aria-label="Follow on GitHub"
              icon={SocialIcons.GitHubIcon}
            />
        <functions.SocialLink
              href="#"
              aria-label="Follow on LinkedIn"
              icon={SocialIcons.LinkedInIcon}
            />
        </div>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div>
            <h3 className="text-xl font-semibold">Annie's Publishing, Fort Wayne, IN</h3>
            <p className="italic">Jr. Web Developer — May 2021 - Present</p>
            <ul className="list-disc ml-5">
              <li>Aids in back-end website development using PHP and Laravel.</li>
              <li>Implements tracking for Google Analytics 4.</li>
              <li>Modifies, maintains, documents, and controls content and UI of websites.</li>
              <li>Delivers daily promotional emails to up to 1,250,000 customers.</li>
              <li>Collaborates with team for site performance, stability, and ADA compliance.</li>
              <li>Facilitates interdepartmental requests for site modifications and redesigns.</li>
              <li>Systemizes database queries and entries using phpMyAdmin with SQL.</li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Saint Joseph Hessen Cassel, Fort Wayne, IN</h3>
            <p className="italic">Technology Teacher — Aug. 2018 - July 2020</p>
            <ul className="list-disc ml-5">
              <li>Implemented lesson plans for K-8 following Indiana state standards for computer science.</li>
              <li>Taught units on data analytics, troubleshooting, HTML, Python/robotics, and web programming.</li>
              <li>Coached the elementary and middle school Robotics team to 10th place at state finals.</li>
              <li>Composed a YouTube series for children during the COVID-19 pandemic.</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div>
            <h3 className="text-xl font-semibold">University of Saint Francis, Fort Wayne, IN</h3>
            <p className="italic">B.S. in Computer Information Systems, Minor in Music Technology — Apr. 2021</p>
            <ul className="list-disc ml-5">
              <li>Graduated magna cum laude.</li>
              <li>Roger Bacon Scholarship and Richard Lugar Scholarship recipient.</li>
              <li>Band member for four years.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">Skills</h2>
          <ul className="list-disc ml-5">
            <li>Proficient in PHP, Laravel, SQL, and Google Analytics 4.</li>
            <li>Experience with front-end development using Adobe Suite.</li>
            <li>Certificate in Data Analytics from Stanford.</li>
            <li>Proficiency in mixing and editing audio with Dolby Atmos.</li>
            <li>Dedicated mixed martial artist.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
