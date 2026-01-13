import React from 'react';

import { BillFormComponent } from '@core/components';
import { BillFormModes } from '@core/components/BillFormComponent';
import { useRegisterBill } from '../hooks/useRegisterBill';

function RegisterBill() {
  const { onSubmit } = useRegisterBill();

  return (
    <BillFormComponent
      title="Cadastrar Conta"
      submitLabel="Cadastrar"
      mode={BillFormModes.CREATE_BILL}
      onSubmit={onSubmit}
    />
  );
}

export default RegisterBill;
