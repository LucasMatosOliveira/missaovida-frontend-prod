import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown'
import { Interno } from '@/components/domains/formulario/entidades';
import { InternosApi } from '@/components/domains/formulario/internos.api';
import { toast } from 'react-toastify';

export type User = {
  id_acolhido: number;
  nome_acolhido: string;
  naturalidade: string;
  cpf_acolhido: string;
  rg_acolhido: string;
  orgao_expedidor_rg: string;
  data_nascimento: string;
  declaracao_racial: string;
  filiacao_pai: string;
  filiacao_mae: string;
  endereco_familiar: string;
  telefone: string;
  whatsapp: string;
  escolaridade_acolhido: string;
  profissao_acolhido: string;
  estado_civil_acolhido: string;
  apoio_familiar: boolean;
  nome_apoio: string;
  endereco_apoio: string;
  religiao_acolhido: boolean;
  qual_religiao: string;
  ativo: boolean;
  filho: Array<{
    nome_filho: string;
    paga_pensao: boolean;
  }>;
  saude: Array<{
    tratamento_psiquiatrico: boolean;
    local_tratamento: string;
    medicamento_psicotropico: boolean;
    descricao_psicotropico: string;
    medicamento_uso_continuo: boolean;
    descricao_uso_continuo: string;
    lesao_fisica: boolean;
    local_lesao_fisica: string;
    doenca_respiratoria: boolean;
    nome_doenca_respiratoria: string;
    alergia_alimentar: boolean;
    nome_alimento: string;
    alergia_medicamentos: boolean;
    nome_alergia_medicamento: string;
    alguma_doenca: boolean;
    nome_doenca: string;
    problema_coracao: boolean;
    doenca_coracao: string;
    tem_cancer: boolean;
    historico_cancer: string;
    tipo_cancer: string;
    tentativa_suicidio: boolean;
    automutilacao: boolean;
  }>;
  vidajuridica: any[];
  substancia: any[];
  social: any[];
  termoguarda: any[];
};

export const createColumns = (onAlterar?: (idInterno: string, nome: string) => void): ColumnDef<Interno>[] => [
  {
    accessorKey: 'nome_acolhido',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='text-black'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4 text-black" />
      </Button>
    ),
  },
  {
    accessorKey: 'naturalidade',
    header: 'Naturalidade',
    cell: ({ row }) => {
      const value = row.getValue('naturalidade')
      return <div className="font-medium">{value as string}</div>;
    }
  },
  {
    accessorKey: 'data_nascimento',
    header: 'Data de Nascimento',
    cell: ({ row }) => {
      const date = new Date(row.getValue('data_nascimento'));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'ativo',
    header: 'Ativo',
    cell: ({ row }) => {
      const ativo = row.original.ativo;
      const formatted = ativo ? "Sim" : "Não";
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      const token = localStorage.getItem("token");
      const actionInterno = async (userId: string, action: "ativar" | "desativar") => {
        const api = new InternosApi();
        if (action === 'desativar') {
          if (token) {
            await api.desativar(userId, token);
          }
          else
            toast.error("Usuário não atutenticado");
        }
        else {
          if (token) {
            await api.ativar(userId, token);
          }
          else
            toast.error("Usuário não atutenticado");
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="h-8 w-8 p-0 border-black hover:bg-slate-700">
              <Icon icon={chevronDown} className='text-gray-500 ' />
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (onAlterar) {
                  onAlterar(user.id_acolhido.toString(), user.nome_acolhido);
                }
              }}
            >
              Visualizar/Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.ativo ?
              <DropdownMenuItem onClick={() => actionInterno(user.id_acolhido.toString(), 'desativar')}>Desativar</DropdownMenuItem>
              : <DropdownMenuItem onClick={() => actionInterno(user.id_acolhido.toString(), 'ativar')}>Ativar</DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
