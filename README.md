# Entrelinhas

App de biblioteca feito com **Expo Router** (atividade da Aula 8: Navegação Entre Telas).

## Fluxo
**Login → Home (lista) → Detalhe do livro**, com rotas protegidas.

- `app/(auth)/login.tsx`: login com `router.replace('/')` (usuário `aluno`, senha `123`)
- `app/(app)/_layout.tsx`: `<Redirect href="/login" />` quando não há sessão
- `context/AuthContext.tsx`: `AuthProvider` no layout raiz (`usuario`, `entrar`, `sair`)
- `app/(app)/livro/[id].tsx`: detalhe via `useLocalSearchParams` + `Number(id)`
- Bônus: abas Início e Perfil, com botão Sair no Perfil
- Cores centralizadas em `constants/theme.ts` (modo escuro)
- Capas dos livros: [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)

## Como rodar
Requer Node 22.13 ou mais novo.

```bash
npm install
npx expo start
```

Leia o QR code com o app **Expo Go** no celular.
