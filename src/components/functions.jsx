import faceImage from '../images/face.jpg';
export function SocialLink({ icon: Icon, ...props }) {
  return (
      <a className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
          <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
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
          className="rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 h-16 w-16"
          style={{ color: 'transparent' }}
          sizes="4rem"
          src={faceImage} // Use the imported variable
      />
          <h1 className="text-4xl font-bold">Phoenix Keiner</h1>
          <p className="text-xl">
              Phoenix Keiner is a dedicated web developer based in Fort Wayne, IN, with extensive experience in both back-end and front-end development. Currently employed as a Junior Web Developer at Annie’s Publishing, he utilizes PHP, Laravel, and the Adobe Suite to create seamless user experiences and maintain website functionality. Phoenix has played a pivotal role in upgrading systems to PHP 8.2 and Red Hat 8.0, while also implementing tracking for Google Analytics 4 and ensuring compliance with ADA standards using the Audioeye API. Before his current role, he served as a Technology Teacher at Saint Joseph Hessen Cassel, where he developed lesson plans aligned with Indiana state standards and coached a successful robotics team. Phoenix holds a B.S. in Computer Information Systems, graduating magna cum laude from the University of Saint Francis, where he was also a recipient of multiple scholarships. In addition to his technical skills, he has a strong foundation in audio mixing and editing, having earned a certificate in Data Analytics from Stanford, and he is an avid mixed martial artist.
          </p>
      </div>
  );
}