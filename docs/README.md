# GitSearch-Bot (Discord)

![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-runtime-000000?style=for-the-badge&logo=bun&logoColor=white)
![Discord.js](https://img.shields.io/badge/Discord.js-14-5865F2?style=for-the-badge&logo=discord&logoColor=white)
![Sapphire](https://img.shields.io/badge/Sapphire-Framework-3B82F6?style=for-the-badge)
![Biome](https://img.shields.io/badge/Biome-lint%20%26%20format-60A5FA?style=for-the-badge)

GitSearch-Bot is a small Discord bot built with TypeScript, Bun, Discord.js, and Sapphire Framework.

This is a simple study project. Its goal is to practice TypeScript, command handling, embeds, external API consumption, and a layered project structure using adapters, ports, use cases, and domain types.

## Features

- `ping` command that sends an initial response and edits it with the WebSocket latency.
- `search` command that automatically detects whether the input is a GitHub user or repository.
- GitHub user lookup.
- GitHub repository lookup.
- Discord embed responses.
- Initial layered architecture with inbound adapters, outbound adapters, use cases, ports, and domain models.

## Stack

- Bun as the runtime.
- TypeScript with strict settings.
- Discord.js for Discord integration.
- Sapphire Framework for command structure.
- Biome for linting and formatting.
- GitHub public API as the data source.

## Project Structure

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

## Flow

```txt
Discord command
  -> application use case
  -> application port
  -> GitHub gateway
  -> GitHub API
```

The inbound Discord adapter receives the message, parses the input, and calls the required application use case.

The use case coordinates the application behavior and delegates external data access through a port.

The outbound GitHub adapter implements the communication with the GitHub API.

## Requirements

- Bun installed.
- A Discord bot created in the Discord Developer Portal.
- The bot token stored in a `.env` file.

## Environment Variables

Create a `.env` file in the project root:

```env
DISCORD_TOKEN=your_discord_bot_token
```

## Installation

```bash
bun install
```

## Project Commands

Run the bot in watch mode:

```bash
bun run dev
```

Run the bot normally:

```bash
bun run start
```

Run TypeScript type checking:

```bash
bun run check
```

Run Biome checks:

```bash
bun run lint
```

Run Biome with automatic fixes:

```bash
bun run format
```

## Bot Commands

```txt
@mention ping
```

Sends an initial response and then edits it with the WebSocket ping.

```txt
@mention search torvalds
```

Searches for a GitHub user.

```txt
@mention search facebook/react
```

Searches for a GitHub repository.

## Note

This project is not intended to be a complete production-ready bot. It is a learning playground for TypeScript, Sapphire, Discord.js, embeds, GitHub API calls, and basic layered architecture.
