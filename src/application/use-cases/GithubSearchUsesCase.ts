import GithubSearchGateway from "../../adapters/out/github/GithubSearchGateway";
import type { RepositoryDomain } from "../domain/Repository";
import type { UserDomain } from "../domain/User";
import type {
	GithubGatewayPort,
	GithubSearchPorts,
} from "../ports/GithubSearch";

export default class GithubSearchUsesCase implements GithubSearchPorts {
	constructor(
		private readonly query: GithubGatewayPort = new GithubSearchGateway(),
	) {}

	async repository(
		user: string,
		repository: string,
	): Promise<RepositoryDomain | Error> {
		if (!user || !repository) return new Error("invalid user or repository")
		const data = await this.query.fetchGateway<RepositoryDomain>(`/repos/${user}/${repository}`);

		return this.handleGatewayResponse(data, "repository not found")
	}

	async user(name: string): Promise<UserDomain | Error> {
		if (!name) return new Error("invalid name")
		const data = await this.query.fetchGateway<UserDomain>(`/users/${name}`);

		return this.handleGatewayResponse(data, "user not found")
	}

	private handleGatewayResponse<T>(data: T | null | Error, message: string): T | Error {
		if (!data) return new Error(message)
		if (data instanceof Error) return new Error(`internal error ocurred: ${data.message}`)

		return data
	}
}
