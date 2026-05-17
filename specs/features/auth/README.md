# Auth (referência implementada)

A feature **Auth** já está implementada e serve como referência dourada no código.

| Área | Caminho |
| ---- | ------- |
| Feature root | `src/features/Auth/` |
| Navegação aninhada | `src/features/Auth/navigation/AuthNavigator.tsx` |
| Serviços | `src/features/Auth/services/` |
| Estado global (Zustand) | `src/features/Auth/stores/auth.store.ts` |
| Telas | `src/features/Auth/screens/` |

Não é necessário reescrever specs completas de Auth para trabalhos de rotina. Crie ou atualize um spec em `specs/features/auth/` apenas quando houver **mudança de comportamento**, novo fluxo, ou requisito de produto documentado.

Para novas features, use o template em [`specs/_templates/feature-spec.md`](../../_templates/feature-spec.md).
