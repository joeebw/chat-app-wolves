import { Input } from "@/components/ui/input";
import { SignInFormData } from "@/pages/login";
import { UseFormReturn } from "react-hook-form";

type Props = {
  signInForm: UseFormReturn<SignInFormData, any, undefined>;
};

const SignInInputs = ({ signInForm }: Props) => {
  return (
    <>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type="email"
          placeholder="Email"
          {...signInForm.register("email")}
        />
        {signInForm.formState.errors.email && (
          <p className="text-sm text-red-500">
            {signInForm.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Input
          className="!text-base bg-input-background"
          type={"password"}
          placeholder="Password"
          {...signInForm.register("password")}
        />
        {signInForm.formState.errors.password && (
          <p className="text-sm text-red-500">
            {signInForm.formState.errors.password.message}
          </p>
        )}
      </div>
    </>
  );
};

export default SignInInputs;
