import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="p-8">
      <div className="text-3xl font-bold">Error 500</div>
      <div className="mt-8 ml-3">
        <Link to={"/"}>Go Back To Home Page</Link>
      </div>
    </div>
  );
};
