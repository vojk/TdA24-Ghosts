import { LoginBox } from './LoginBox';

export function LoginPage() {

  return (
    <>
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-xl">
          <LoginBox />
        </div>
      </div>
    </>
  );
}
