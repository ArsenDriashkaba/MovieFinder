import Link from "next/link";

const LinkButton = ({ text, link }) => {
  return (
    <Link href={link || "/"}>
      <a>
        <button>{text}</button>
      </a>
    </Link>
  );
};

export default LinkButton;
