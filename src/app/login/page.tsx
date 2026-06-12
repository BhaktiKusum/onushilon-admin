import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Onushilon Admin
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}