"use client";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/form/Grid";
import { createColumns } from "@/components/form/Grid/columns";
import { useEffect, useState } from "react";
import { InternosApi } from "../formulario/internos.api";
import { Interno } from "@/components/domains/formulario/entidades";
import { jwtDecode } from "jwt-decode";
import { AppRoutes } from "@/commom/http/app-routes";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export function DashboardGrid({ idInterno, onDadosSalvos, newTab }: DashboardProps) {
  const [userData, setUserData] = useState<Interno[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [isLogoutToastShown, setIsLogoutToastShown] = useState(false);
  const router = useRouter();

  const getToken = () => localStorage.getItem("token");

  const checkTokenValidity = (currentToken: string | null) => {
    if (!currentToken) {
      setIsTokenValid(false);
      return;
    }

    try {
      const decoded: { exp: number } = jwtDecode(currentToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp <= currentTime) {
        setIsTokenValid(false);
        if (!hasRedirected && !isLogoutToastShown) {
          initiateLogoutWithCountdown();
        }
        return;
      }

      setIsTokenValid(true);
      const timeUntilExpiration = decoded.exp - currentTime;

      setLogoutTimeout(Math.min(timeUntilExpiration, 3600) * 1000);
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      setIsTokenValid(false);
      if (!hasRedirected && !isLogoutToastShown) {
        initiateLogoutWithCountdown();
      }
    }
  };

  const setLogoutTimeout = (timeout: number) => {
    setTimeout(() => {
      const currentToken = getToken();
      checkTokenValidity(currentToken);
    }, timeout);
  };

  const initiateLogoutWithCountdown = () => {
    setIsLogoutToastShown(true);
    let countdown = 5;
    const toastId = toast.info(`Acesso expirado. Redirecionando em ${countdown} segundos...`, {
      autoClose: false
    });

    const countdownInterval = setInterval(() => {
      countdown -= 1;
      toast.update(toastId, {
        render: `Acesso expirado. Redirecionando em ${countdown} segundos...`,
      });

      if (countdown <= 0) {
        clearInterval(countdownInterval);
        toast.dismiss(toastId);
        setIsLogoutToastShown(false);
        signOut({ callbackUrl: AppRoutes.Login() });
      }
    }, 1000);
  };

  useEffect(() => {
    const currentToken = getToken();
    checkTokenValidity(currentToken);
  }, []);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const api = new InternosApi();
        const res = await api.getInternosForGrid(token);
        setUserData(res);
      };

      fetchData();
    } else {
      toast.warn("Usuário não encontrado");
    }
  }, [token]);

  const handleAlterar = (id: string, nome: string) => {
    newTab?.(id, nome);
  };

  const atualizarDados = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        const fetchData = async () => {
          const api = new InternosApi();
          const res = await api.getInternosForGrid(token);
          setUserData(res);
        };

        fetchData();
      } else {
        toast.warn("Usuário não encontrado");
      }
};

  const columns = createColumns(handleAlterar);

  return (
    <>
      {isTokenValid ? (
        <DataTable columns={columns} data={userData} actionsAddTab={newTab} onAlterar={handleAlterar} refreshData={atualizarDados}/>
      ) : (
        <div>Token inválido. Redirecionando...</div>
      )}
    </>
  );
}

export interface DashboardProps {
  idInterno?: string;
  onDadosSalvos?: (interno: any, isNovo: boolean) => void;
  newTab?: (idInterno: string, descricao: string) => void;
}
