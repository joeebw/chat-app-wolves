import { Input } from "@/components/ui/input";
import { SignUpFormData } from "@/pages/login";
import ImageDropzone from "@/pages/login/ImageDropzone";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  signUpForm: UseFormReturn<SignUpFormData, any, undefined>;
};

const SignUpInputs = ({ signUpForm }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      signUpForm.setValue("profilePicture", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type="email"
          placeholder="Email"
          {...signUpForm.register("email")}
        />
        {signUpForm.formState.errors.email && (
          <p className="text-sm text-red-500">
            {signUpForm.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type="text"
          placeholder="Name"
          {...signUpForm.register("name")}
        />
        {signUpForm.formState.errors.name && (
          <p className="text-sm text-red-500">
            {signUpForm.formState.errors.name?.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type="text"
          placeholder="Add a personal quote to your profile..."
          {...signUpForm.register("quote")}
        />
        {signUpForm.formState.errors.quote && (
          <p className="text-sm text-red-500">
            {signUpForm.formState.errors.quote.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type="password"
          placeholder="Password"
          {...signUpForm.register("password")}
        />
        {signUpForm.formState.errors.password && (
          <p className="text-sm text-red-500">
            {signUpForm.formState.errors.password.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type="password"
          placeholder="Confirm Password"
          {...signUpForm.register("confirmPassword")}
        />
        {signUpForm.formState.errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {signUpForm.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
      <ImageDropzone
        dropzoneText="Drag and drop a profile picture, or click to select"
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
        error={signUpForm.formState.errors.profilePicture}
      />
    </>
  );
};

export default SignUpInputs;
