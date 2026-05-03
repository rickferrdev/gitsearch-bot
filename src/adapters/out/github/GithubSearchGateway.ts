import type { GithubGatewayPort } from "../../../application/ports/GithubSearch";

export default class GithubSearchGateway implements GithubGatewayPort {
	constructor(
		private readonly apiGithubUrl: string = "https://api.github.com",
	) { }


	async fetchGateway<T>(endpoint: string): Promise<T | null | Error> {
		try {
			const response = await fetch(`${this.apiGithubUrl}${endpoint}`, {
				headers: {
					"User-Agent": "github.com/rickferrdev/gitsearch-bot"
				}
			})

			if (response.status === 404) return null
			if (!response.ok) return new Error("Error processing request")

			return response.json() as T
		} catch {
			return new Error("Error processing request")
		}
	}
}
