import type { RepositoryDomain } from "../domain/Repository";
import type { UserDomain } from "../domain/User";

export interface GithubSearchPort {
	user(name: string): Promise<UserDomain | string>;
	repository(
		user: string,
		repository: string,
	): Promise<RepositoryDomain | string>;
}

export interface GithubGatewayPort {
	user<T>(name: string): Promise<T | string>;
	repository<T>(user: string, repository: string): Promise<T | string>;
}
