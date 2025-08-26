# Corelab Challenge - Frontend

##  Descrição
Este PR implementa o **frontend do To-Do App**, em **React + TypeScript + Vite**, consumindo a API do backend.  
A aplicação conta com **UI responsiva (mobile-first)**, integração com a API e filtros dinâmicos.

---

## Tecnologias
- React + TypeScript + Vite
- Axios (consumo da API)
- Sass (estilização responsiva)
- ESLint + Prettier
- GitHub Actions (CI/CD)

---

## Funcionalidades
- Criar tarefas (formulário).
- Listar todas as tarefas.
- Favoritar/desfavoritar tarefas.
- Excluir tarefas.
- Filtros por **favorito** e **cor**.
- Layout responsivo (mobile-first).

---

##  Como rodar

### Localmente
```bash
npm install
npm run dev
App disponível em: http://localhost:5173

Integração com Backend Docker
Se o backend estiver rodando via Docker (http://localhost:4000), o frontend consome automaticamente as rotas da API.

CI/CD
Pipeline configurado em .github/workflows/ci.yml
Executa automaticamente em cada push/PR:

Lint (npm run lint)

Build (Vite)

Testes (quando configurados)