import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppRoutes } from "@/commom/http/app-routes";
import { UserLoginSchema, userLoginSchema } from "./schema";
import { setToken as setToken2 } from "@/store/login";
import { toast } from "react-toastify";

export function UseLoginPage() {
    const router = useRouter();

    const formMethods = useForm<UserLoginSchema>({
        resolver: zodResolver(userLoginSchema),
        mode: 'onChange'
    });

    const { reset, setError } = formMethods;

    const handleSalvar = async (data: UserLoginSchema) => {
        const response = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false
        });

        console.log("Usuário autenticado:", response);

        if (response?.error) {
            console.log(response?.error)
            toast.error("Erro ao autenticar usuário");
            return;
        }

        const token = response?.ok ? (await getToken()) : null;
        if (typeof window !== "undefined") {
            if (token) {
                localStorage.setItem('token', token!);
                //console.log(localStorage.getItem('token'))
                //console.log({token, teste:  typeof window})
                setToken2(token);
            }
        }

        if (token) {
            setToken2(token);
            router.push(AppRoutes.Dashboard());
        } else {
            console.error('Token não encontrado após autenticação');
            alert("Erro ao autenticar, tente novamente.");
        }
    };

    return {
        handleSalvar,
        formMethods
    };
}

async function getToken() {
    const session = await getSession();
    return session?.user?.token;
}
