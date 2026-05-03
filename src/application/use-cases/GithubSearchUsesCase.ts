import GithubSearchGateway from "../../adapters/out/github/GithubSearchGateway";
import type { RepositoryDomain } from "../domain/Repository";
import type { UserDomain } from "../domain/User";
import type {
	GithubGatewayPort,
	GithubSearchPort,
} from "../ports/GithubSearch";

export default class GithubSearchUsesCase implements GithubSearchPort {
	constructor(
		private readonly query: GithubGatewayPort = new GithubSearchGateway(),
	) {}

	async repository(
		user: string,
		repository: string,
	): Promise<RepositoryDomain | string> {
		const data = await this.query.repository<RepositoryDomain>(
			user,
			repository,
		);
		if (typeof data === "string") return "repository or user not found";

		return data;
	}

	async user(name: string): Promise<UserDomain | string> {
		const data = await this.query.user<UserDomain>(name);
		if (typeof data === "string") return "user not found";

		return data;
	}
}


