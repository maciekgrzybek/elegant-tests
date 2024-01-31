import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export class Locator {
	private constructor(public readonly testId: string) {}

	public static of(testId: string) {
		return new Locator(testId);
	}
}

export type Target = string | RegExp | Locator;

enum QueryType {
	Single = "single",
	Multiple = "multiple",
}

export class PageBuilder {
	private static roles = ["textbox", "radio"];
	public when(): PageBuilder {
		return this;
	}

	public then() {
		return {
			textInput: {
				isVisible: () => {
					expect(screen.getByRole("textbox")).toBeVisible();
				},
				isNotVisible: () => {
					expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
				},
			},
			text: (text: Target) => ({
				isVisible: async () => {
					expect(await this.findElement(text)).toBeVisible();
				},
				isNotVisible: async () => {
					expect(await this.doesNotExist(text)).toBeNull();
				},
			}),
			spinner: () => ({
				isVisible: async () => {
					expect(await this.findElement(Locator.of("spinner"))).toBeVisible();
				},
			}),
		};
	}

	public async typing(target: Target, text: string): Promise<void> {
		const targetElement = await this.findElement(target);
		await userEvent.type(targetElement, text);
	}

	public async tapping(target: Target): Promise<void> {
		const targetElement = await this.findElement(target);
		await userEvent.click(targetElement);
	}

	public async tappingFirstOf(target: Target): Promise<void> {
		const [targetElement] = await this.findElements(target);
		await userEvent.click(targetElement);
	}

	public async findElement(target: Target): Promise<HTMLElement> {
		return this.find(target, QueryType.Single) as Promise<HTMLElement>;
	}

	public async findElements(target: Target): Promise<HTMLElement[]> {
		return this.find(target, QueryType.Multiple) as Promise<HTMLElement[]>;
	}

	private async find(
		target: Target,
		queryType: QueryType,
	): Promise<HTMLElement | HTMLElement[]> {
		if (this.isHtmlRole(target)) {
			return queryType === QueryType.Single
				? await screen.findByRole(target)
				: await screen.findAllByRole(target);
		} else if (this.isText(target)) {
			return queryType === QueryType.Single
				? await screen.findByText(target)
				: await screen.findAllByText(target);
		} else {
			return queryType === QueryType.Single
				? screen.getByTestId(target.testId)
				: screen.getAllByTestId(target.testId);
		}
	}

	private async doesNotExist(target: Target): Promise<HTMLElement | null> {
		if (this.isHtmlRole(target)) {
			return screen.queryByRole(target);
		} else if (this.isText(target)) {
			return await screen.queryByText(target);
		} else {
			return screen.queryByTestId(target.testId);
		}
	}

	private isHtmlRole(target: Target): target is string {
		return typeof target === "string" && PageBuilder.roles.includes(target);
	}

	private isText(target: Target): target is string | RegExp {
		return typeof target === "string" || target instanceof RegExp;
	}
}
