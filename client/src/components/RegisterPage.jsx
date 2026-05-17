import { RegisterBox } from "./RegisterBox";

export function RegisterPage() {

  return (
    <>
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-3xl">
          <RegisterBox />
        </div>
      </div>
    </>
  );
}
