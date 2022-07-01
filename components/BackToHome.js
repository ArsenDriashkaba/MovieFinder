import Link from "next/link";

const BackToHome = () => {
  return (
    <Link href="/">
      <a>
        <button>Back to home</button>
      </a>
    </Link>
  );
};

export default BackToHome;
