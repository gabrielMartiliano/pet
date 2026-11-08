#  PET_SAUDE

Aplicação completa para gestão de saúde e atendimento pet, desenvolvida com arquitetura moderna containerizada usando **Docker Compose**, **NestJS** (Backend), **Next.js** (Frontend), **PostgreSQL** (Banco de Dados) e **Nginx** (Proxy Reverso).

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** NestJS, TypeScript, Prisma ORM
* **Banco de Dados:** PostgreSQL
* **Proxy / Web Server:** Nginx
* **Containerização:** Docker & Docker Compose

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado no seu ambiente:

* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (com Docker Compose habilitado)

---

## 🚀 Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git https://github.com/gabrielMartiliano/pet
cd pet
```

---

### 2. Configurar as Variáveis de Ambiente (`.env`)

O projeto possui um arquivo de exemplo denominado `.env_exemplo`. Copie esse arquivo para criar seu `.env` local:

#### No Terminal (Linux/macOS ou PowerShell):
```bash
cp .env_exemplo .env
```

#### Conteúdo de exemplo no `.env`:
```env
# --- PostgreSQL ---
POSTGRES_USER=Usuario
POSTGRES_PASSWORD=SuaSenha
POSTGRES_DB=PET_db

# ---env Backend (Prisma & NestJS) ---
DATABASE_URL="postgresql://Usuario:SuaSenha@db:5432/PET_db?schema=public"

PORT=3000
NODE_ENV=development
JWT_SECRET=SENHA_SUPER_SECRETA_DEVELOPMENT_2026

# ---env Frontend (Next.js) --- 
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
```


---

### 3. Subir os Containers com Docker Compose

Suba todos os serviços (`db`, `backend`, `frontend` e `nginx`):

```bash
docker compose up -d --build
```

Para checar o status dos serviços em execução:
```bash
docker compose ps
```

---

### 4. Executar as Migrações do Banco de Dados (Prisma)

Após os containers estarem iniciados e saudáveis, crie as tabelas no PostgreSQL executando as migrações:

```bash
docker compose exec backend npx prisma migrate dev
```

---

## 🌐 Mapeamento de Portas e Endereços

| Serviço | URL / Porta | Descrição |
| :--- | :--- | :--- |
| **Frontend (via Nginx)** | `http://localhost:8080` | Interface do usuário |
| **API Backend (NestJS)** | `http://localhost:8080/api` | Endpoints e rotas da API |
| **Banco de Dados (PostgreSQL)** | `localhost:5432` | Conexão direta com o BD |
| **Prisma Studio** | `http://localhost:5555` | Interface gráfica para gerenciar dados |

---

## 🛠️ Comandos Úteis

### 🗄️ Gerenciamento do Banco de Dados (Prisma)

* **Iniciar o Prisma Studio (Visualizador Web):**
  ```bash
  docker compose exec backend npx prisma studio --port 5555 --browser none
  ```
  *Acesse em `http://localhost:5555` no seu navegador.*

* **Popular o banco de dados (Seed):**
  ```bash
  docker compose exec backend npx prisma db seed
  ```

* **Resetar a base de dados (Recria do zero):**
  ```bash
  docker compose exec backend npx prisma migrate reset
  ```

---

### 🔍 Logs e Manutenção

* **Ver os logs de todos os containers:**
  ```bash
  docker compose logs -f
  ```

* **Ver os logs apenas do backend:**
  ```bash
  docker compose logs -f backend
  ```

* **Acessar o terminal interno do container do backend:**
  ```bash
  docker compose exec backend sh
  ```

---

### 🛑 Parar a Aplicação

* **Parar os containers mantendo os dados intactos:**
  ```bash
  docker compose down
  ```

* **Parar containers e apagar os volumes de dados:**
  ```bash
  docker compose down -v
  ```
