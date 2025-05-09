import Link from "next/link";
import SignupComponent from "../SignupComponent";
// import GoogleSigninButton from "../GoogleSigninButton";

export default function Signup() {
  return (
    <>
      {/* <GoogleSigninButton text="Sign in" />

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div> */}

      <div>
        <SignupComponent />
      </div>

      <div className="mt-6 text-center">
        <p>
          Do you have already account?{" "}
          <Link href="/auth/sign-in" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
