"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    document.cookie = `admin=${password}; path=/`;
    router.push("/admin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl mb-4">Login Admin</h1>
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full max-w-sm"
      />
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </div>
  );
}
