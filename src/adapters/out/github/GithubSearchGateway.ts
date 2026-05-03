import type { GithubGatewayPort } from "../../../application/ports/GithubSearch";

export default class GithubSearchGateway implements GithubGatewayPort {
	constructor(
		private readonly apiGithubUrl: string = "https://api.github.com",
	) {}

	async call(url: string): Promise<Response> {
		const response = await fetch(url, {
			headers: {
				"User-Agent": "github.com/rickferrdev/gitsearch-bot",
			},
		});

		return response;
	}

	async repository<T>(user: string, repository: string): Promise<T | string> {
		const response = await this.call(
			`${this.apiGithubUrl}/repos/${user}/${repository}`,
		);

		if (response.status === 404) return "resource not found";
		if (!response.ok) return "internal error in api github";

		return response.json() as T;
	}

	async user<T>(name: string): Promise<T | string> {
		const response = await this.call(`${this.apiGithubUrl}/users/${name}`);

		if (response.status === 404) return "resource not found";
		if (!response.ok) return "internal error in api github";

		return response.json() as T;
	}
}
