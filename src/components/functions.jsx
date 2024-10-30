import faceImage from '../images/face.jpg';
import React from 'react';

export function SocialLink({ icon: Icon, ...props }) {
  return (
      <a className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
          <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
      </a>
  );
}

export function Intro() {
  return (
      <div>
        <img
          alt="My beautiful face"
          width="512"
          height="512"
          className="rounded-full bg-zinc-100 object-cover h-16 w-16"
          style={{ color: 'transparent' }}
          sizes="4rem"
          src={faceImage}
      />
          <h1 className="text-4xl font-bold my-8">Phoenix Keiner</h1>
          <p className="text-xl">
          Phoenix Keiner is a skilled web developer based in Fort Wayne, IN, with a strong foundation in both front-end and back-end development. Currently employed at Annie’s Publishing, he specializes in using technologies like Adobe Magento, C#, and Laravel to enhance user experiences on a large scale. With a proven track record of successful system upgrades, including transitioning to PHP 8.2 and Red Hat 8.0, he effectively addresses complex technical challenges. Phoenix also plays a key role in implementing tracking for Google Analytics 4, ensuring data accuracy and compliance with ADA standards through the use of the Audioeye API. His experience extends beyond coding; he adeptly manages interdepartmental requests and collaborates with teams to optimize website performance. A former technology teacher, he integrates educational principles into his development work, fostering a collaborative environment. With certifications in Data Analytics and a passion for mixed martial arts, Phoenix combines technical expertise with a commitment to continuous learning and growth.
          </p>
      </div>
  );
}

export function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Card({ as, className, children }) {
  const Component = as ?? 'div';
  const combinedClassName = `group relative flex flex-col items-start ${className}`;

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
}

export function CardTitle({ as, href, children }) {
  const Component = as ?? 'h2';
  const titleClassName = "text-base font-semibold tracking-tight text-zinc-800";

  return (
    <Component className={titleClassName}>
      {href ? (
        <a href={href} className="relative z-10">
          {children}
        </a>
      ) : (
        children
      )}
    </Component>
  );
}

export function CardDescription({ children }) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600">
      {children}
    </p>
  );
}

export function CardCta({ children }) {
  return (
    <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
}

export function CardEyebrow({ as, decorate = false, className, children, ...props }) {
  const Component = as ?? 'p';
  const eyebrowClassName = `relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 ${className}`;

  return (
    <Component className={eyebrowClassName} {...props}>
      {decorate && (
        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
        </span>
      )}
      {children}
    </Component>
  );
}

export const ExperienceItem = ({ date, role, company, responsibilities }) => {
  return (
    <div className="flex">
      <div className="w-1/4 pr-4">
        <p className="text-lg font-semibold">{date}</p>
        <p className="text-sm text-gray-600 italic">{role}</p>
      </div>
      <div className="w-3/4">
        <h3 className="text-xl font-semibold">{company}</h3>
        <CardDescription>
          <ul className="list-disc ml-5">
            {responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardDescription>
      </div>
    </div>
  );
};

export const ContentCardDescription = ({ children }) => {
  return <div className="border-transparent p-4 bg-transparent rounded-md">{children}</div>;
};
