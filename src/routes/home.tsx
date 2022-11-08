import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-8">
      <h1 className="text-blue-700 text-4xl font-bold">
        Welcome to Postgresql-auth 🐘
      </h1>
      <div className="flex gap-x-8">
        <Link
          to="/signup"
          className="px-8 py-2 border-2 border-blue-700 rounded text-xl font-medium"
        >
          sing up
        </Link>
        <Link
          to="/signin"
          className="px-8 py-2 border-2 border-blue-700 rounded bg-blue-700 text-xl text-white font-medium"
        >
          sing in
        </Link>
      </div>
    </div>
  );
};

export default Home;
