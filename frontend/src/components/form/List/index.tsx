import { PropsWithChildren } from "react";

export * from './Header';
export * from './Header/Actions';
export * from './Header/BtnAdd';
export * from './Header/Column';
export * from './Body';
export * from './Item';
export * from './Item/Column';
export * from './Item/BtnRemove';

export function List({ children }: PropsWithChildren) {
    return (
        <div className="table-container">
            <table className="table rounded-table table-striped mb-0">
                {children}
            </table>
        </div>
    )
}