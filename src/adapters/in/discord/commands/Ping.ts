import {
	type Args,
	type Awaitable,
	Command,
	type MessageCommand,
} from "@sapphire/framework";
import type { Message } from "discord.js";

export default class Ping extends Command {
	constructor(ctx: Command.LoaderContext, opts: Command.Options) {
		super(ctx, {
			...opts,
			name: "ping",
		});
	}

	override async messageRun(
		message: Message,
		_args: Args,
		_context: MessageCommand.RunContext,
	): Promise<Awaitable<unknown>> {
		if (!message.channel.isSendable() || !message.channel.isTextBased()) return;

		const content = await message.channel.send("pong!");

		await new Promise((resolve) => setTimeout(resolve, 3000));

		return content.edit(`ping: ${this.container.client.ws.ping}ms`);
	}
}
