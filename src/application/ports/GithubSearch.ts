import type { RepositoryDomain } from "../domain/Repository";
import type { UserDomain } from "../domain/User";

export interface GithubSearchPorts {
	user(name: string): Promise<UserDomain | Error>;
	repository(
		user: string,
		repository: string,
	): Promise<RepositoryDomain | Error>;
}

export interface GithubGatewayPort {
	fetchGateway<T>(endpoint: string): Promise<T | null | Error>
}
