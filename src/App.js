import React from "react";
import * as functions from './components/functions.jsx';
import * as SocialIcons from './components/SocialIcons';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-transparent to-[#b3fbf9] text-gray-900 p-6 sm:p-8 md:p-10 lg:p-12">
      <header className="mb-12">
        <functions.Intro />
        <div className="mt-6 flex gap-6">
          <functions.SocialLink
            href="https://github.com/phoenixkeiner/"
            aria-label="Follow on GitHub"
            icon={SocialIcons.GitHubIcon}
          />
          <functions.SocialLink
            href="https://www.linkedin.com/in/phoenix-keiner/"
            aria-label="Follow on LinkedIn"
            icon={SocialIcons.LinkedInIcon}
          />
        </div>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-3xl font-bold">Experience</h2>
          <div className="space-y-6">
            <div className="flex">
              <div className="w-1/4 pr-4">
                <p className="text-lg font-semibold">May 2021 - Present</p>
                <p className="text-sm text-gray-600 italic">Web Developer</p>
              </div>
              <div className="w-3/4">
                <h3 className="text-xl font-semibold">Annie's Publishing, Fort Wayne, IN</h3>
                <functions.ContentCardDescription>
                  <ul className="list-disc ml-5">
                    <li>Aids in front-end and back-end website development using Adobe Magento, C# and Laravel.</li>
                    <li>Has aided in PHP 8.2/Red Hat 8.0 upgrade.</li>
                    <li>Implements tracking for Google Analytics 4.</li>
                    <li>Modifies, maintains, documents, and controls content and UI of websites.</li>
                    <li>Delivers daily promotional emails from marketing to up to 1,250,000 customers.</li>
                    <li>Completes tasks related to ongoing projects or mini-projects through agile sprints.</li>
                    <li>Collaborates with the team for site performance, stability, look, and flow of all websites.</li>
                    <li>Facilitates interdepartmental requests for site modifications, updates, and redesigns.</li>
                    <li>Drives websites to comply with ADA standards using Audioeye API.</li>
                    <li>Systemizes database queries and entries using phpMyAdmin with SQL.</li>
                    <li>Has planned minor workflow projects as acting project manager.</li>
                  </ul>
                </functions.ContentCardDescription>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/4 pr-4">
                <p className="text-lg font-semibold">Aug. 2018 - July 2020</p>
                <p className="text-sm text-gray-600 italic">Technology Teacher</p>
              </div>
              <div className="w-3/4">
                <h3 className="text-xl font-semibold">Saint Joseph Hessen Cassel, Fort Wayne, IN</h3>
                <functions.ContentCardDescription>
                  <ul className="list-disc ml-5">
                    <li>Implemented lesson plans for K-8 following the Indiana state standards for computer science.</li>
                    <li>Taught units on data analytics, troubleshooting, HTML, Java, C#, web programming, Python/robotics & Office 365.</li>
                    <li>Coached the elementary and middle school Robotics team to 10th place at state finals.</li>
                    <li>Incorporated projects in collaboration with other teachers' lesson plans.</li>
                    <li>Composed a YouTube series for children during the COVID-19 pandemic.</li>
                  </ul>
                </functions.ContentCardDescription>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold">Education</h2>
          <div className="flex">
            <div className="w-1/4 pr-4">
              <p className="text-lg font-semibold">Apr. 2021</p>
            </div>
            <div className="w-3/4">
              <h3 className="text-xl font-semibold">University of Saint Francis, Fort Wayne, IN</h3>
              <functions.ContentCardDescription>
                <p>B.S. in Computer Information Systems, Minor in Music Technology</p>
                <ul className="list-disc ml-5">
                  <li>Graduated magna cum laude.</li>
                  <li>Band member for four years.</li>
                  <li>Roger Bacon Scholarship and Richard Lugar Scholarship recipient.</li>
                </ul>
              </functions.ContentCardDescription>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold">Additional Qualifications</h2>
          <functions.Card>
            <functions.ContentCardDescription>
              <ul className="list-disc ml-5">
                <li>Certificate in Data Analytics from Stanford.</li>
                <li>Google Data Analytics Professional Certificate.</li>
                <li>Proficiency in mixing and editing audio with Dolby Atmos.</li>
                <li>Dedicated mixed martial artist.</li>
              </ul>
            </functions.ContentCardDescription>
          </functions.Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold">Projects</h2>
          <functions.Card>
            <functions.CardTitle href="#">
              Technology Upgrade Project
            </functions.CardTitle>
            <functions.ContentCardDescription>
              I aided in the comprehensive upgrade of PHP from version 5.6 to 7.2 across Annie’s portfolio of approximately 20 sites, addressing and resolving compatibility issues using PHP CodeSniffer. I meticulously refactored codebases to ensure smooth operation with PHP 7.2, and due to system limitations, halted further upgrades until subsequent efforts. In a follow-up project, I aided in the upgrade to PHP 8.0 and the transition of MySQL from version 5.6 to 8.0, positioning the infrastructure for an operating system upgrade.
            </functions.ContentCardDescription>
          </functions.Card>
          <functions.Card className="mt-4">
            <functions.CardTitle href="#">
              Tag Manager and Google Analytics Projects
            </functions.CardTitle>
            <functions.ContentCardDescription>
              I aided in the migration of hard-coded JavaScript tags and tracking pixels to Google Tag Manager, modernizing the company’s tagging infrastructure. Building on this, I led the upgrade from Google Analytics Universal to GA4 ahead of the UA deprecation. This initiative included creating distinct development and production environments to prevent data contamination and leveraging Google Tag Manager’s environment features to ensure precise traffic routing to the appropriate GA4 accounts.
            </functions.ContentCardDescription>
          </functions.Card>
        </section>
      </main>
    </div>
  );
}

export default App;
