import { useDropzone } from "react-dropzone";
import { FieldErrors } from "react-hook-form";
import clsx from "clsx";
import { SignUpFormData } from "@/pages/login";

interface ImageDropzoneProps {
  dropzoneText: string;
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  error?: FieldErrors<SignUpFormData>["profilePicture"];
}

const ImageDropzone = ({
  dropzoneText,
  onFileSelect,
  selectedFile,
  error,
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileSelect(file);
    },
  });

  return (
    <div className="p-2">
      <div
        {...getRootProps()}
        className={clsx(
          "border-2 border-dashed rounded-lg p-4 xl:p-6 cursor-pointer text-center text-secondary",
          "transition-all duration-200",
          error ? "border-red-500" : "border-primary",
          "hover:opacity-50"
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p className="text-sm sm:text-base">{dropzoneText}</p>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default ImageDropzone;
