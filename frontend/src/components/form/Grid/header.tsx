import React from 'react';
import { SignOutButton } from '@/components/ui/SignOutButton';
import { FormRow } from '../FormRow';
import { FormColumn } from '../FormColumn';

interface HeaderProps {
  pageTitle: string;
}

export function Header({ pageTitle }: HeaderProps) {

  return (
    <FormRow>
      <div className="header-fixed">
        <FormColumn span={4}>
          <img
            src="https://revwildodosanjos.com.br/wp-content/themes/revwildo-spa/assets/images/vida.png"
            alt="Logo"
            className="logo"
          />
        </FormColumn>
        <FormColumn span={4}>
          <h1 className="header-text">{pageTitle}</h1>
        </FormColumn>
        <FormColumn span={4} className=''>
          <SignOutButton className='mr-4' />
        </FormColumn>
      </div>
    </FormRow>

  );
}

export default Header;
