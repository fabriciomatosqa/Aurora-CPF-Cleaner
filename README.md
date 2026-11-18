# Aurora CPF Cleaner

Extensão Chrome Manifest V3 que oculta automaticamente elementos com a classe `.aluno-cpf` nas páginas visitadas.

## O que faz
- Oculta elementos `.aluno-cpf` em páginas HTTP/HTTPS.
- Continua funcionando quando o site atualiza o conteúdo dinamicamente.
- Popup em português para ativar/desativar a ocultação.
- Salva a preferência no armazenamento local do Chrome.

## Baixar
Após a execução do workflow **Build extension**, abra **Actions → Build extension → execução mais recente → Artifacts** e baixe `Aurora-CPF-Cleaner`. O ZIP contém o CRX3 e o ZIP de instalação.

## Instalação pelo ZIP
1. Extraia `Aurora-CPF-Cleaner.zip`.
2. Abra `chrome://extensions`.
3. Ative **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta extraída.

## CRX e chave persistente
O workflow gera um CRX3. Para manter o mesmo ID da extensão em compilações futuras, configure o segredo de repositório `CRX_PRIVATE_KEY_B64` com a chave PEM privada codificada em Base64.

Gere uma chave permanente em Linux/macOS:
```bash
openssl genrsa -out aurora-cpf-cleaner.pem 2048
base64 -w 0 aurora-cpf-cleaner.pem
```

No Windows PowerShell (com OpenSSL instalado):
```powershell
openssl genrsa -out aurora-cpf-cleaner.pem 2048
[Convert]::ToBase64String([IO.File]::ReadAllBytes("aurora-cpf-cleaner.pem"))
```

No GitHub, abra **Settings → Secrets and variables → Actions → New repository secret**:
- Name: `CRX_PRIVATE_KEY_B64`
- Secret: o texto Base64 gerado acima.

Nunca faça commit da chave privada. Se o segredo ainda não existir, o workflow gera um CRX de teste com uma chave temporária; ele funciona para teste, mas terá outro ID na próxima compilação. Configure a chave persistente antes de distribuir atualizações.
