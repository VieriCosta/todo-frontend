# 📝 Todo Frontend (Corelab Challenge)

Aplicação frontend em **React + TypeScript + Vite + Sass**, consumindo a API do backend.

---

## 🚀 Funcionalidades
- Criar tarefas (formulário).
- Listar todas as tarefas.
- Favoritar/desfavoritar.
- Excluir tarefa.
- Filtros por **favorito** e **cor**.
- Layout **responsivo (mobile-first)**.
- Integração com backend em `http://localhost:4000/api`.

---

## 📂 Estrutura
todo-frontend/
├── src/
│ ├── components/
│ │ ├── TodoForm.tsx
│ │ ├── TodoList.tsx
│ │ ├── TodoItem.tsx
│ │ └── TodoFilters.tsx
│ ├── services/api.ts # Axios config
│ ├── types/Todo.ts # Tipagem
│ ├── styles/index.scss # Estilos globais
│ ├── App.tsx
│ └── main.tsx
├── .github/workflows/ci.yml
├── package.json
└── README.md

yaml
Copiar código

---

## ⚙️ Como rodar

### ▶️ Localmente
```bash
npm install
npm run dev
App disponível em: http://localhost:5173

🐳 Integração com Backend Docker
Se o backend estiver rodando via Docker (localhost:4000), o frontend já consome automaticamente as rotas da API.

🚀 CI/CD
Workflow no .github/workflows/ci.yml

Executa automaticamente:

Lint

Build (Vite)

Testes (quando configurados)