export const SLIDES = [
  {
    headline: 'Organize pagamentos\nsem esforço',
    subline: 'Cadastre contas, receba lembretes e veja o impacto real no mês.',
  },
  {
    headline: 'Lembretes\nautomáticos',
    subline: 'Nunca mais esqueça um vencimento. Notificações no momento certo.',
  },
  {
    headline: 'Visão clara\ndo seu mês',
    subline: 'Entenda de uma vez por todas para onde vai o seu dinheiro.',
  },
] as const;

export type SlideItem = (typeof SLIDES)[number];
