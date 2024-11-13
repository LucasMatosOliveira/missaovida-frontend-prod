import React, { ReactNode } from 'react';

type FormSectionProps = {
    title: string;
    children: ReactNode;
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
        {title}
      </h2>
      {children}
    </div>
  );
};