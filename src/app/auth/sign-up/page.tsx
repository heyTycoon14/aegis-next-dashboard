"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { notify } from "@/utils/notifications";
import { useRouter } from "next/navigation";

// Custom CPF validator (basic version)
function validateCPF(value: string) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) || /^\d{11}$/.test(value);
}

// Zod schema
const registerSchema = z
  .object({
    username: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    first_name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    last_name: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres"),
    cpf: z.string().refine(validateCPF, { message: "CPF inválido" }),
    password: z
      .string()
      .min(6, "Senha deve conter no mínimo 6 caracteres")
      .regex(/[A-Z]/, "Senha deve conter uma letra maiúscula")
      .regex(/[0-9]/, "Senha deve conter um número")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Senha deve conter um caractere especial",
      ),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
  });

// Infer types from schema
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Form Submitted:", data);
    // You can send data to your API here
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    console.log(result, 'here')

    if (!response.ok) {
      notify({
        type: "error",
        message: "Error",
        description: result.error,
      });
      return;
    }
    notify({
      type: "success",
      message: "Cadastro realizado!",
      description:
        "Verifique seu e-mail para ativar sua conta.<br><br>(Caso não encontre verifique a caixa de spam)",
    });

    router.push("/auth/sign-in");
  };

  return (
    <>
      <Head>
        <title>Cadastro | Plataforma</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-dark p-4">
        <div className="bg-dark-lighter w-full max-w-md rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <img
              src="/images/blue-white-logo.png"
              alt="Logo"
              className="mx-auto mb-4 h-16 w-16"
            />
            <h1 className="text-2xl font-bold text-gray-100">Cadastro</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Usuário
              </label>
              <input
                {...register("username")}
                className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                  errors.username ? "border-red-500" : "border-dark-light"
                } focus:border-primary focus:outline-none`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">Email</label>
              <input
                type="email"
                {...register("email")}
                className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                  errors.email ? "border-red-500" : "border-dark-light"
                } focus:border-primary focus:outline-none`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Nome</label>
                <input
                  {...register("first_name")}
                  className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                    errors.first_name ? "border-red-500" : "border-dark-light"
                  } focus:border-primary focus:outline-none`}
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Sobrenome
                </label>
                <input
                  {...register("last_name")}
                  className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                    errors.last_name ? "border-red-500" : "border-dark-light"
                  } focus:border-primary focus:outline-none`}
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* CPF */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">CPF</label>
              <input
                {...register("cpf")}
                placeholder="000.000.000-00"
                className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                  errors.cpf ? "border-red-500" : "border-dark-light"
                } focus:border-primary focus:outline-none`}
              />
              {errors.cpf && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.cpf.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">Senha</label>
              <input
                type="password"
                {...register("password")}
                className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                  errors.password ? "border-red-500" : "border-dark-light"
                } focus:border-primary focus:outline-none`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Confirmar Senha
              </label>
              <input
                type="password"
                {...register("passwordConfirmation")}
                className={`w-full rounded-xl border bg-dark p-3 text-gray-200 ${
                  errors.passwordConfirmation
                    ? "border-red-500"
                    : "border-dark-light"
                } focus:border-primary focus:outline-none`}
              />
              {errors.passwordConfirmation && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="hover:bg-primary-dark w-full rounded-xl bg-primary p-3 font-semibold text-white transition"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
