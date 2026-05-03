# GitSearch-Bot

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-runtime-000000?style=for-the-badge&logo=bun&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-14-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Sapphire](https://img.shields.io/badge/Sapphire-Framework-3B82F6?style=for-the-badge)
![Biome](https://img.shields.io/badge/Biome-lint%20%26%20format-60A5FA?style=for-the-badge)

GitSearch-Bot e um bot simples para Discord feito com TypeScript, Bun, Discord.js e Sapphire Framework.

Este projeto foi criado para estudo, pratica de arquitetura em camadas e experimentacao com comandos, embeds e consumo da API publica do GitHub.

## Funcionalidades

- Comando `ping`, que envia uma resposta inicial e edita a mensagem com a latencia do WebSocket.
- Comando `search`, que identifica automaticamente se a busca e por usuario ou repositorio.
- Busca de usuarios no GitHub.
- Busca de repositorios no GitHub.
- Respostas formatadas com embeds do Discord.
- Separacao inicial entre adapters, use cases, ports e domain.

## Stack

- Bun como runtime.
- TypeScript em modo estrito.
- Discord.js para integracao com o Discord.
- Sapphire Framework para estrutura dos comandos.
- Biome para lint e formatacao.
- API publica do GitHub como fonte dos dados.

## Estrutura

```txt
src/
  adapters/
    in/
      discord/
        commands/
          Ping.ts
          Search.ts
    out/
      github/
        GithubSearchGateway.ts
  application/
    domain/
      Repository.ts
      User.ts
    ports/
      GithubSearch.ts
    use-cases/
      GithubSearchUsesCase.ts
  infrastructure/
    embeds/
      MakeEmbedBuilder.ts
  shared/
    config/
      env.ts
  index.ts
```

## Fluxo

```txt
Discord command
  -> application use case
  -> application port
  -> GitHub gateway
  -> GitHub API
```

O adapter de entrada recebe a mensagem do Discord, interpreta o argumento e chama o caso de uso necessario.

O caso de uso centraliza a regra da aplicacao e delega a busca para uma porta.

O adapter de saida implementa a comunicacao com a API do GitHub.

## Requisitos

- Bun instalado.
- Um bot criado no Discord Developer Portal.
- Token do bot salvo no arquivo `.env`.

## Variaveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DISCORD_TOKEN=seu_token_do_discord
```

## Instalacao

```bash
bun install
```

## Comandos do projeto

```bash
bun run dev
```

Executa o bot em modo watch.

```bash
bun run start
```

Executa o bot normalmente.

```bash
bun run check
```

Roda a verificacao de tipos do TypeScript.

```bash
bun run lint
```

Roda o Biome sem aplicar correcoes.

```bash
bun run format
```

Roda o Biome aplicando correcoes automaticas.

## Comandos do bot

```txt
@mention ping
```

Retorna uma mensagem inicial e depois edita com o ping do WebSocket.

```txt
@mention torvalds
```

Busca um usuario do GitHub.

```txt
@mention facebook/react
```

Busca um repositorio do GitHub.

## Observacao

Este projeto nao tem objetivo de ser um bot completo ou pronto para producao. A ideia e servir como laboratorio para estudar TypeScript, Sapphire, Discord.js, adapters, ports, use cases e organizacao de codigo.
