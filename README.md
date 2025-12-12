# Portfólio — Juan Pimentel

Stack: Vite + React + Tailwind CSS v4 (plugin @tailwindcss/vite) + Framer Motion + Lucide + TanStack Query + Axios + React Hook Form + Zod + Zustand.

## Como rodar

```bash
npm install
npm run dev
```

## Env

- `VITE_CONTACT_ENDPOINT` — URL absoluta ou caminho relativo para o endpoint que receberá o POST do formulário de contato. Exemplos:
	- `VITE_CONTACT_ENDPOINT=http://localhost:3001/contact`
	- `VITE_CONTACT_ENDPOINT=/contact`
	- Se definido como URL absoluta, o frontend fará a chamada diretamente; se definido como caminho relativo, a mesma origem que serviu o frontend será usada.
	- Observação: este projeto exige sempre `VITE_CONTACT_ENDPOINT` para envio do formulário de contato (obrigatório).
## Imagem de avatar

Coloque `1686470831071.jpeg` em `public/avatar.jpeg` (ou ajuste `avatarPath` em `src/data/content.ts`).

## Ajustes de Tailwind v4

- Uso do plugin oficial em `vite.config.ts`.
- Import único em `src/index.css`: `@import "tailwindcss";`
- Não é necessário `tailwind.config` para começar; crie com `npx tailwindcss init` se quiser customizar.

## Seções implementadas

- Hero com CTA, tema (Auto/Light/Dark), troca de idioma (PT/EN) e links GitHub/LinkedIn.
- Skills, Experiência, Projetos (status ao vivo para projetos interativos), Formação.
- Contato com formulário validado (React Hook Form + Zod) e links diretos.

## Observação sobre projetos interativos

Os cards chamam o endpoint configurado em `apiConfig` para mostrar status. Se houver CORS ou instância off, o status exibirá indisponível.
