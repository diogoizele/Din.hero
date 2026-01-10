import React from 'react';

import { BillFormComponent } from '@features/Bills/components';
import { useRegisterBill } from '../hooks/useRegisterBill';

function RegisterBill() {
  const { onSubmit } = useRegisterBill();

  return (
    <BillFormComponent
      title="Cadastrar Conta"
      submitLabel="Cadastrar"
      onSubmit={onSubmit}
    />
  );
}

export default RegisterBill;
