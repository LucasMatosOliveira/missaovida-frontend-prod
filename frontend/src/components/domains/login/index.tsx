"use client"
import { FormProvider } from "react-hook-form";
import Image from "next/image";
import { FormInput } from "@/components/form/FormInput";
import { UseLoginPage } from "./hook";
import { UserLoginSchema } from "./schema";
import vida from "../../../../public/unnamed.png"

export default function LoginPage() {
    const { formMethods, handleSalvar } = UseLoginPage()
    const { handleSubmit, formState: { errors, isSubmitting } } = formMethods;

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleSalvar)}>
                <main className="flex w-full h-screen items-center justify-center bg-gray-100">
                    <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">
                        <div className="text-center mb-6">
                            <Image
                                src={vida}
                                width={500}
                                height={300}
                                alt="Missao Vida"
                                style={{
                                    width: '50%',
                                    height: 'auto'
                                }}
                                className="mx-auto mb-6" />
                            <p className="text-gray-600">Entre com sua conta para continuar</p>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-0">Usuário</label>
                            <FormInput<UserLoginSchema> name="username" transform="none"/>

                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-0 mt-4">Senha</label>
                            <FormInput<UserLoginSchema> name="password" type="password" transform="none"/>
                        </div>
                        <div className="flex items-center justify-center pt-2">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="bg-customGreen hover:bg-customGreenHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Entrar
                            </button>
                        </div>
                    </div>
                </main>
            </form>
        </FormProvider>
    );
}