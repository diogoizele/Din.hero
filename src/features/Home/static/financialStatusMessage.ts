export const financialStatusMessages = [
  {
    score: 0,
    level: 'excellent',
    messages: [
      'Tudo sob controle',
      'Tudo em dia',
      'Nenhuma preocupação no momento',
      'Nenhuma pendência encontrada',
    ],
  },
  {
    score: 1,
    level: 'excellent',
    messages: [
      'Seu mês está tranquilo',
      'Pagamentos bem organizados',
      'Situação financeira organizada',
    ],
  },
  {
    score: 2,
    level: 'excellent',
    messages: [
      'Boa gestão até aqui',
      'Fluxo de pagamentos estável',
      'Contas seguindo como esperado',
    ],
  },
  {
    score: 3,
    level: 'stable',
    messages: [
      'Tudo caminhando normalmente',
      'Rotina financeira equilibrada',
      'Próximos vencimentos sob controle',
    ],
  },
  {
    score: 4,
    level: 'stable',
    messages: [
      'Há contas chegando',
      'Fique atento aos próximos dias',
      'Algumas contas exigem atenção',
    ],
  },
  {
    score: 5,
    level: 'warning',
    messages: [
      'Algumas cobranças estão próximas',
      'Hora de revisar pagamentos',
      'Há vencimentos se aproximando',
    ],
  },
  {
    score: 6,
    level: 'warning',
    messages: [
      'Vencimentos exigem atenção',
      'Próximos dias serão importantes',
      'Organize os próximos pagamentos',
    ],
  },
  {
    score: 7,
    level: 'high-warning',
    messages: [
      'Existem pagamentos acumulando',
      'Evite deixar contas vencerem',
      'Existem contas perto do vencimento',
    ],
  },
  {
    score: 8,
    level: 'critical',
    messages: [
      'Priorize pagamentos mais próximos',
      'Sua atenção é necessária',
      'Evite novos atrasos agora',
    ],
  },
  {
    score: 9,
    level: 'critical',
    messages: [
      'Existem atrasos pendentes',
      'Regularize pagamentos em aberto',
      'Você possui contas vencidas',
    ],
  },
  {
    score: 10,
    level: 'emergency',
    messages: [
      'Contas vencidas precisam de ação',
      'Resolva pendências prioritárias',
      'Pagamentos urgentes encontrados',
    ],
  },
] as const;
