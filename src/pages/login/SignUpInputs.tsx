import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

type Props = {
  signUpForm: UseFormReturn<
    {
      email: string;
      quote: string;
      password: string;
      confirmPassword: string;
    },
    any,
    undefined
  >;
};

const SignUpInputs = ({ signUpForm }: Props) => {
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
          placeholder="Quote for your profile..."
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
    </>
  );
};

export default SignUpInputs;
