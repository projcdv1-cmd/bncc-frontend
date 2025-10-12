# BNCC App

App de login simples construído com Expo React Native.

## Funcionalidades

- ✅ Tela de login com validação
- ✅ Autenticação via API backend
- ✅ Suporte a cookies HTTP com credentials: true
- ✅ Persistência de dados do usuário
- ✅ Tela inicial pós-login
- ✅ Função de logout

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

O arquivo `.env` já está configurado com:

```
API_URL=http://localhost:8000
```

### 3. Backend esperado

O app espera um endpoint no backend:

- **Rota:** `POST /auth/login`
- **Payload esperado:**

```json
{
  "email": "augusto.t.seabra79@gmail.com",
  "senha": "admin123"
}
```

### 4. Executar o app

```bash
npm start
```

## Arquitetura

- **AuthContext**: Gerencia estado de autenticação
- **AsyncStorage**: Persiste dados do usuário localmente
- **Axios**: Configurado com `withCredentials: true` para cookies
- **Expo Router**: Navegação baseada em arquivos

## Estrutura de arquivos principais

```
app/
  ├── _layout.tsx          # Layout principal com AuthProvider
  ├── login.tsx            # Tela de login
  └── (tabs)/
      ├── _layout.tsx      # Layout das tabs
      └── index.tsx        # Tela inicial pós-login

contexts/
  └── AuthContext.tsx      # Context de autenticação

services/
  └── api.ts              # Configuração do axios e endpoints
```

## Como usar

1. Execute o app (`npm start`)
2. Na tela de login, digite:
   - Email: `augusto.t.seabra79@gmail.com`
   - Senha: `admin123`
3. Após login bem-sucedido, você será direcionado para a tela inicial
4. Use o botão "Sair" para fazer logout

## Observações

- O app está configurado para conectar com um backend local na porta 8000
- Os cookies HTTP são automaticamente gerenciados pelo axios
- O estado de login persiste entre reinicializações do app
