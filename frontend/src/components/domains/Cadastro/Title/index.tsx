import { PropsWithChildren } from "react";

export function CadastroTitle({onClickVoltar, children}: CadastroTitleProps) {
    return (
        <div>
            <div className="grid grid-cols-2">
            <div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-md text-black" onClick={onClickVoltar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Voltar</span>
              </button>
            </div>
            <div className="flex justify-between items-center mb-6" style={{ marginLeft: '-100px' }}>
              <h2 className="text-xl font-bold">Formulário de Cadastro</h2>
            </div>
          </div>
          {children}
        </div>
    );
}

export interface CadastroTitleProps extends PropsWithChildren {
    onClickVoltar: () => void;
}
