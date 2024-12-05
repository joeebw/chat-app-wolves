import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import SignInInputs from "@/pages/login/SignInInputs";
import SignUpInputs from "@/pages/login/SignUpInputs";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    quote: z.string().min(1, "Quote is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

const LoginPage = () => {
  const isSignIn = useStore((state) => state.isSignIn);
  const setIsSignIn = useStore((state) => state.setIsSignIn);

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const form = isSignIn ? signInForm : signUpForm;

  const handleSignIn = (data: SignInFormData) => {
    console.log("data sign in: ", data);
  };

  const handleSignUp = (data: SignUpFormData) => {
    console.log("data sign up: ", data);
  };

  return (
    <form
      onSubmit={
        isSignIn
          ? signInForm.handleSubmit(handleSignIn)
          : signUpForm.handleSubmit(handleSignUp)
      }
      className="flex items-center justify-center h-screen"
    >
      <div className="p-16 bg-[#3c4d5d9a] w-[33rem] backdrop-blur-xl rounded-2xl shadow-xl">
        <h2 className="text-2xl font-medium">
          Welcome to WolfChat! Log in to connect with your pack.
        </h2>
        <div className="flex flex-col gap-7 mt-7">
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          {isSignIn ? (
            <SignInInputs signInForm={signInForm} />
          ) : (
            <SignUpInputs signUpForm={signUpForm} />
          )}
        </div>
        <Button type="submit" variant="secondary" className="w-full mt-7">
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
        <p
          className="mt-5 text-sm underline cursor-pointer"
          onClick={() => {
            if (isSignIn) {
              signInForm.reset();
            } else {
              signUpForm.reset();
            }
            setIsSignIn();
          }}
        >
          {isSignIn
            ? "Don't have an account? Sign up here"
            : "Already have an account? Sign in here"}
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
