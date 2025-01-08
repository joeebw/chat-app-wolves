import { useState, useEffect, ReactNode } from "react";
import { Monitor, Smartphone } from "lucide-react";

type Props = {
  children: ReactNode;
};

const DesktopOnly = ({ children }: Props) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isDesktop) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-400">
        <div className="max-w-md p-10 text-center bg-[#3c4d5d9a] backdrop-blur-xl rounded-2xl shadow-xl">
          <div className="flex justify-center mb-6 space-x-4">
            <Smartphone className="text-red-500" size={32} />
            <Monitor className="text-green-500" size={32} />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            This application is only available on desktop
          </h1>
          <p className="text-gray-white">
            Please access from a computer to enjoy all features.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default DesktopOnly;
