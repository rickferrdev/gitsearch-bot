import { type Args, Command, type MessageCommand } from "@sapphire/framework";
import type { Awaitable, Message } from "discord.js";
import type { GithubSearchPort } from "../../../../application/ports/GithubSearch";
import GithubSearchUsesCase from "../../../../application/use-cases/GithubSearchUsesCase";
import MakeEmbedBuilder from "../../../../infrastructure/embeds/MakeEmbedBuilder";

export default class Search extends Command {
	constructor(
		ctx: Command.LoaderContext,
		opts: Command.Options,
		private readonly search: GithubSearchPort = new GithubSearchUsesCase(),
		private readonly embed = new MakeEmbedBuilder(),
	) {
		super(ctx, {
			...opts,
		});
	}

	override async messageRun(
		message: Message,
		args: Args,
		_context: MessageCommand.RunContext,
	): Promise<Awaitable<unknown>> {
		if (!message.channel.isSendable() || !message.channel.isTextBased()) return;
		const input = await args.pick("string").catch(() => null);

		if (!input) return message.channel.send("required value not provided");
		const mode = input.trim().includes("/") ? "repository" : "user";

		if (mode === "repository") {
			const [user, repository] = input.split("/").map((value) => value.trim());
			if (!user || !repository)
				return await message.channel.send(
					"you need to provide the user and the repository",
				);

			const data = await this.search.repository(user, repository);
			if (typeof data === "string") return await message.channel.send(data);

			return await message.channel.send({
				embeds: [this.embed.fromRepository(data)],
			});
		}

		const data = await this.search.user(input);
		if (typeof data === "string") return message.channel.send(data);

		return await message.channel.send({
			embeds: [this.embed.fromUser(data)],
		});
	}
}
