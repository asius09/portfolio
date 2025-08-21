import React from "react";

const education = [
  {
    level: "College",
    institution: "Indira Gandhi National Open University (IGNOU)",
    degree: "Bachelor of Computer Applications (BCA)",
    status: "2nd Year (Pursuing)",
  },
  {
    level: "School",
    institution: "Shri Guru Tegh Bahadur Khalsa Boys Sr. Sec. School",
    stream: "Science",
    board: "CBSE",
  },
];

export const Education = () => {
  return (
    <section id="education-section" className="mt-12 w-full">
      <h2 className="text-2xl font-semibold text-white">Education</h2>
      <div className="mt-6 w-full space-y-4">
        {education.map((edu, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
            <p className="mt-1 text-base font-medium text-white/90">
              {edu.level === "College" ? (
                <>
                  {edu.degree}
                  <span className="ml-2 text-sm font-normal text-blue-300">
                    {edu.status}
                  </span>
                </>
              ) : (
                <>
                  {edu.stream} Stream
                  <span className="ml-2 text-sm font-normal text-blue-300">
                    {edu.board}
                  </span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
