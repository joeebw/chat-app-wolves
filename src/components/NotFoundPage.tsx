import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-b from-background to-secondary">
      <div className="max-w-md">
        <h1 className="mb-2 font-extrabold text-primary text-7xl bg-clip-text ">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-bold">Page Not Found</h2>
        <p className="mb-8 text-secondary">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <Button asChild className="flex items-center space-x-2">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
