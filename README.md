# Aurora CPF Cleaner

Extensão Chrome Manifest V3 que oculta automaticamente elementos com a classe `.aluno-cpf` nas páginas visitadas.

## O que faz
- Oculta elementos `.aluno-cpf` em páginas HTTP/HTTPS.
- Continua funcionando quando o site atualiza o conteúdo dinamicamente.
- Popup em português para ativar/desativar a ocultação.
- Salva a preferência no armazenamento local do Chrome.

## Baixar
Abra **Actions → Build extension → execução mais recente → Artifacts** e baixe o artefato `Aurora-CPF-Cleaner`. Ele contém o ZIP da extensão e um CRX de compilação.

## Instalar para testar no Chrome (recomendado)
O Chrome pode bloquear CRX gerado fora da Chrome Web Store com o erro `CRX_REQUIRED_PROOF_MISSING`. Isso é uma regra de segurança do navegador; assinar o arquivo com uma chave própria não substitui a assinatura de distribuição exigida pelo Chrome.

Para testar esta extensão:
1. Extraia o arquivo `Aurora-CPF-Cleaner.zip`.
2. Abra `chrome://extensions`.
3. Ative **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta extraída que contém o `manifest.json`.

Não tente instalar o CRX por arrastar e soltar para esse teste. O ZIP extraído é o pacote correto para **Carregar sem compactação**.

## Sobre o CRX e a chave persistente
O workflow também gera um CRX3 assinado com chave própria. Ele pode ser útil em fluxos de distribuição compatíveis, mas **não garante instalação local direta no Chrome**. Para distribuição normal a outros usuários, publique a extensão pela Chrome Web Store ou use um método de instalação gerenciado compatível com as políticas do Chrome.

Para manter o mesmo ID em compilações assinadas com a mesma chave, configure o segredo de repositório `CRX_PRIVATE_KEY_B64` com a chave PEM privada codificada em Base64.

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

Nunca faça commit da chave privada. Sem o segredo, o workflow gera um CRX de teste com chave temporária; o ID muda na próxima compilação.
