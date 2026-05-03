import { join } from "node:path";
import { SapphireClient } from "@sapphire/framework";

class Client extends SapphireClient {
	constructor() {
		super({
			intents: ["GuildMessages", "MessageContent", "Guilds"],
			loadMessageCommandListeners: true,
		});

		this.stores
			.get("commands")
			.registerPath(
				join(import.meta.dirname, "adapters", "in", "discord", "commands"),
			);
	}
}

const client = new Client();

client.login(process.env.DISCORD_TOKEN as string);
