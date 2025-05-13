import { FaGithub } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mx-auto mt-3 w-[70%] max-w-[75rem]">
      <a href="/" className="group flex w-max items-center gap-2 *:transition">
        <FaGithub className="size-6 group-hover:text-blue-500" />
        <p className="group-hover:text-blue-500">GitHub</p>
      </a>
    </footer>
  );
}

export default Footer;
