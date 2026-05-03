import { EmbedBuilder } from "discord.js";
import type { RepositoryDomain } from "../../application/domain/Repository";
import type { UserDomain } from "../../application/domain/User";

export default class MakeEmbedBuilder {
	constructor(private readonly builder = new EmbedBuilder()) {}

	fromRepository(repository: RepositoryDomain): EmbedBuilder {
		return this.builder
			.setTitle(repository.full_name)
			.setURL(repository.html_url)
			.setDescription(repository.description ?? "N/A")
			.addFields([
				{
					name: "Stars",
					value: String(repository.stargazers_count),
					inline: true,
				},
				{ name: "Forks", value: String(repository.forks_count), inline: true },
				{
					name: "Issues",
					value: String(repository.open_issues_count),
					inline: true,
				},
				{ name: "Language", value: repository.language ?? "N/A", inline: true },
				{ name: "Branch", value: repository.default_branch, inline: true },
				{
					name: "License",
					value: repository.license?.name ?? "N/A",
					inline: true,
				},
			]);
	}

	fromUser(user: UserDomain): EmbedBuilder {
		return new EmbedBuilder()
			.setTitle(user.login)
			.setURL(user.html_url)
			.setThumbnail(user.avatar_url)
			.addFields([
				{ name: "Type", value: user.type, inline: true },
				{ name: "ID", value: String(user.id), inline: true },
				{ name: "Admin", value: user.site_admin ? "Yes" : "No", inline: true },
			]);
	}
}
