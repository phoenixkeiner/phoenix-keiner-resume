import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Phoenix Keiner</h1>
        <p className="text-xl">Web Developer</p>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          {/* Add your job experience here */}
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold">Education</h2>
          {/* Add your education here */}
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Skills</h2>
          {/* Add your skills here */}
        </section>
      </main>
    </div>
  );
}

export default App;
