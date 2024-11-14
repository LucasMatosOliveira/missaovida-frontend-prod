import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Icon from 'react-icons-kit';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { InternosApi } from '@/components/domains/formulario/internos.api';
import { toast } from 'react-toastify';
import { ColumnDef } from '@tanstack/react-table';
import { Interno } from '@/components/domains/formulario/entidades';

const ActionCell = ({ row, onAlterar }: { row: any; onAlterar?: (idInterno: string, nome: string) => void }) => {
  const user = row.original;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Só executa no cliente
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const actionInterno = async (userId: string, action: 'ativar' | 'desativar') => {
    const api = new InternosApi();
    if (action === 'desativar') {
      if (token) {
        await api.desativar(userId, token);
      } else {
        toast.error('Usuário não autenticado');
      }
    } else {
      if (token) {
        await api.ativar(userId, token);
      } else {
        toast.error('Usuário não autenticado');
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="h-8 w-8 p-0 border-black hover:bg-slate-700">
          <Icon icon={chevronDown} className="text-gray-500" />
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
        {user.ativo ? (
          <DropdownMenuItem onClick={() => actionInterno(user.id_acolhido.toString(), 'desativar')}>Desativar</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => actionInterno(user.id_acolhido.toString(), 'ativar')}>Ativar</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const createColumns = (onAlterar?: (idInterno: string, nome: string) => void): ColumnDef<Interno>[] => [
  {
    accessorKey: 'nome_acolhido',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-black"
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
      const value = row.getValue('naturalidade');
      return <div className="font-medium">{value as string}</div>;
    },
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
      const formatted = ativo ? 'Sim' : 'Não';
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell row={row} onAlterar={onAlterar} />,
  },
];
