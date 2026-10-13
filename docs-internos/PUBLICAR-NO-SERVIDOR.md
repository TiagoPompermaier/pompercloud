# Publicar em docs.pompermaiercont.com.br

Como funciona: o conteúdo fica no GitHub. A cada alteração salva, o GitHub monta o site
e envia os arquivos prontos por FTP para a hospedagem da Pompermaier (cPanel ou Plesk).
Ninguém precisa instalar nada no próprio computador.

```
Editar página no GitHub  →  GitHub monta o site  →  envia por FTP  →  docs.pompermaiercont.com.br
```

Esta configuração é feita **uma única vez**.

---

## Parte 1: na hospedagem (quem administra o cPanel/Plesk)

### 1. Criar o subdomínio

- **cPanel:** Domínios (ou Subdomínios) → criar `docs` em `pompermaiercont.com.br`.
- **Plesk:** Sites e Domínios → Adicionar subdomínio → `docs`.

Anote a pasta criada para o subdomínio (ex.: `/home/usuario/docs.pompermaiercont.com.br`).

Se o DNS do domínio não estiver na própria hospedagem (ex.: está na Cloudflare ou no Registro.br),
crie lá um registro **A** para `docs` com o mesmo IP do site principal.

### 2. Ativar HTTPS

- **cPanel:** SSL/TLS Status → rodar AutoSSL para `docs.pompermaiercont.com.br`.
- **Plesk:** SSL/TLS Certificates → Let's Encrypt.

### 3. Criar uma conta FTP só para a documentação

- **cPanel:** Contas FTP → nova conta, com o **diretório** apontando para a pasta do subdomínio.
- **Plesk:** Acesso FTP → nova conta, com o diretório inicial na pasta do subdomínio.

Anote: servidor FTP (ex.: `ftp.pompermaiercont.com.br`), usuário e senha.
Restringir a conta à pasta do subdomínio evita que um erro afete os outros sites.

---

## Parte 2: no GitHub

### 4. Criar o repositório

1. Crie uma conta (ou use a da empresa) em https://github.com.
2. Novo repositório → nome `pompercloud-docs` → **Private**.
3. Na página do repositório: "uploading an existing file" → arraste **o conteúdo** da pasta
   `pompercloud-docs` (incluindo a pasta `.github`) → Commit changes.

> No Windows, a pasta `.github` aparece normalmente. No Mac, use Cmd+Shift+. para exibir pastas ocultas.

### 5. Cadastrar os dados do FTP como segredos

Repositório → Settings → Secrets and variables → Actions → New repository secret.
Crie os três, com estes nomes exatos:

| Nome | Valor |
|---|---|
| `FTP_SERVIDOR` | ex.: `ftp.pompermaiercont.com.br` |
| `FTP_USUARIO` | usuário da conta FTP criada no passo 3 |
| `FTP_SENHA` | senha da conta FTP |

Os segredos ficam criptografados e não aparecem para ninguém, nem no código.

### 6. Primeira publicação

Aba **Actions** → "Publicar documentação" → **Run workflow**.
Em cerca de 2 minutos o site estará em https://docs.pompermaiercont.com.br.

A partir daí, toda alteração salva no repositório publica sozinha.

---

## Editar uma página depois de publicado

1. No GitHub, abra o arquivo em `src/content/docs/...`.
2. Clique no lápis (Edit).
3. Faça a alteração → **Commit changes**.
4. Acompanhe na aba Actions: ✅ verde = publicado. ❌ vermelho = algo errado
   (geralmente um campo do cabeçalho); o site continua no ar com a versão anterior.

---

## Se der erro

| Sintoma na aba Actions | Causa provável | Solução |
|---|---|---|
| Falha em "Enviar para o servidor" com erro de conexão ou TLS | Servidor não aceita FTPS | Em `.github/workflows/publicar.yml`, troque `protocol: ftps` por `protocol: ftp` |
| Falha de login no FTP | Segredo com nome ou valor errado | Confira os três segredos do passo 5 |
| Site abre, mas arquivos ficaram numa subpasta | A conta FTP não abre direto na pasta do subdomínio | Ajuste o diretório da conta FTP, ou mude `server-dir` no workflow para o caminho certo, terminando em `/` |
| Falha em "Montar o site" | Erro em alguma página | Abra o passo com erro: a mensagem diz qual arquivo e qual campo |

Plesk em servidor **Windows** não usa o arquivo `.htaccess` incluído no projeto. O site funciona,
mas a página de erro 404 e o redirecionamento para HTTPS precisam ser configurados no painel.
