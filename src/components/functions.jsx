import React, { useEffect, useRef, useState } from 'react';
import { personalInfo } from './data';
import faceImage from '../images/face.jpg';
import * as SocialIcons from './SocialIcons.jsx';

export function SocialLink({ icon: Icon, ...props }) {
  return (
      <a className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
          <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
      </a>
  );
}

export const Intro = () => {
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-start pt-2">
      <img
        alt="My beautiful face"
        width="512"
        height="512"
        className="rounded-full bg-zinc-100 object-cover h-16 w-16 md:h-32 md:w-32 border-4 border-[#eee8aa] shadow-glow"
        style={{ color: 'transparent' }}
        sizes="4rem"
        src={faceImage}
      />
      <div className="md:ml-4 mt-4 md:mt-0">
        <h1 className="text-4xl font-bold mt-8">{personalInfo.name}</h1>
        <h3 className="text-base font-semibold mb-8 tracking-tight text-gray-600">{personalInfo.email}</h3>
        <FadeInOnScroll>
          <p className="text-xl">{personalInfo.description}</p>
        </FadeInOnScroll>
        <div className="flex justify-center space-x-4 mt-4 md:justify-start">
          <SocialLink
            href="https://github.com/phoenixkeiner/"
            aria-label="Follow on GitHub"
            icon={SocialIcons.GitHubIcon}
          />
          <SocialLink
            href="https://www.linkedin.com/in/phoenix-keiner/"
            aria-label="Follow on LinkedIn"
            icon={SocialIcons.LinkedInIcon}
          />
        </div>
      </div>
    </div>
  );
};

export function FadeInOnScroll({ children }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
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
  const titleClassName = "text-base font-semibold tracking-tight text-gray-600";

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
    <div className="relative z-10 mt-2 text-sm text-gray-600">
      {children}
    </div>
  );
}

export function CardCta({ children }) {
  return (
    <div aria-hidden="true" className="relative z-10 mt-4 flex items-center text-sm font-medium text-gray-600">
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
}

export function CardEyebrow({ as, decorate = false, className, children, ...props }) {
  const Component = as ?? 'p';
  const eyebrowClassName = `relative z-10 order-first mb-3 flex items-center text-sm text-gray-600 ${className}`;

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
    <FadeInOnScroll>
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
    </FadeInOnScroll>
  );
};

export const ContentCardDescription = ({ children }) => {
  return (
    <FadeInOnScroll>
      <div className="border-transparent p-4 bg-transparent rounded-md">
        {children}
      </div>
    </FadeInOnScroll>
  );
};