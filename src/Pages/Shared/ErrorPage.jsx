import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-green-900 p-6">
      <h1 className="text-9xl font-extrabold">404</h1>
      <h2 className="text-4xl font-bold mt-4">Page Not Found</h2>
      <p className="text-lg mt-2 text-center max-w-md">
        Oops! The page you are looking for does not exist.  
        It might have been removed or you typed the wrong URL.
      </p>
      <Link to="/" className="mt-6">
        <button className="btn btn-success btn-outline">
          Go Back to Home
        </button>
      </Link>
    </div>
  );
}
