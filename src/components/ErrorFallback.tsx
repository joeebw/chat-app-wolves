import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const ErrorFallback = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-secondary">
      <div className="flex flex-col w-full max-w-md gap-4 overflow-hidden">
        <div>
          <h2 className="text-4xl font-bold text-center text-primary">
            Oops! Something went wrong
          </h2>
        </div>
        <div>
          <p className="text-center text-secondary">
            We're sorry, but an unexpected error occurred. Don't worry, it's not
            your fault!
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-muted">
            Please try refreshing the page or come back later.
          </p>
          <Button
            onClick={handleRefresh}
            className="flex items-center justify-center w-full space-x-2 sm:w-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
