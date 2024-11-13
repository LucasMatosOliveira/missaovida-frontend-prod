import { AppRoutes } from "@/commom/http/app-routes";
import { useRouter } from "next/navigation";
import { CadastroTitle } from "./Title";
import { InternoInsalt } from "../formulario";

export function Cadastro() {
    const router = useRouter();

    const handleClick = () => router.push(AppRoutes.Dashboard())
    return (
        <div>
            <CadastroTitle onClickVoltar={handleClick}>
            </CadastroTitle>
        </div>
    );
}