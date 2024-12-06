import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import SignInInputs from "@/pages/login/SignInInputs";
import SignUpInputs from "@/pages/login/SignUpInputs";
import { signIn, signUp } from "@/lib/firebase";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    quote: z.string().min(1, "Quote is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    profilePicture: z
      .instanceof(File, { message: "Profile picture is required" })
      .refine((file) => file !== undefined, "Profile picture is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const isSignIn = useStore((state) => state.isSignIn);
  const setIsSignIn = useStore((state) => state.setIsSignIn);

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const form = isSignIn ? signInForm : signUpForm;

  const isLoading = form.formState.isSubmitting;

  const handleSignIn = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      navigate("/chat", { replace: true });
    } catch (error: any) {
      let errorMessage;
      console.log(error.code);
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid email or password";
          break;

        default:
          errorMessage = "An error occurred during sign in";
      }

      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      await signUp(data);
      navigate("/chat", { replace: true });
    } catch (error: any) {
      let errorMessage;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Sign up is currently disabled";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be stronger";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Check your connection";
          break;
        case "storage/unauthorized":
          errorMessage = "Error uploading profile picture";
          break;
        default:
          errorMessage = "An error occurred during sign up";
      }
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <form
      onSubmit={
        isSignIn
          ? signInForm.handleSubmit(handleSignIn)
          : signUpForm.handleSubmit(handleSignUp)
      }
      className="flex items-center justify-center min-h-screen"
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
        <Button
          type="submit"
          variant="secondary"
          className="w-full mt-7"
          disabled={form.formState.isSubmitting}
        >
          {isLoading && <Loader2 className="animate-spin" />}
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
