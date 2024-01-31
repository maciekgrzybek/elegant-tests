import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render as rtlRender } from "@testing-library/react";

import type { ReactElement } from "react";



import { QueryClientProvider } from "react-query";
import { queryClient } from "../query-client";

interface BuilderWrapper<C extends React.ElementType = React.ElementType> {
	Component: C;
	props?: React.ComponentPropsWithoutRef<C>;
}

export class RenderBuilder {

	private wrappers: BuilderWrapper[] = [];
	private renderOptions: Omit<RenderOptions, "queries"> = {};

	// public withRouter = ({
	//   paths = ['/'],
	//   route = '/',
	//   initialEntries = [route],
	// }: WithRouter = {}): RenderBuilder => {
	//   // Wrapped in router
	//   return this;
	// };

	withFetchProvider = (): RenderBuilder => {
		this.withWrappingComponent({
			Component: QueryClientProvider,
			props: { client: queryClient },
		});
		return this;
	};

	// public withStore = (setupFn?: (store: RootStore) => void): RenderBuilder => {
	//   const { store, Provider } = setupRootStoreProvider();

	//   setupFn?.(store);

	//   this.withWrappingComponent({ Component: Provider });
	//   return this;
	// };

	// public withI18nProvider = (): RenderBuilder => {
	//   this.withWrappingComponent({ Component: I18nProvider });
	//   return this;
	// };

	public withModal = () => {
		const ModalWrapper: React.ElementType = ({ children }) => (
			<div>
				{children}
				<div id="modal-root" />
			</div>
		);
		this.withWrappingComponent({
			Component: ModalWrapper,
		});
		return this;
	};

	public withWrappingComponent = <C extends React.ElementType>(wrapper: {
		Component: C;
		props?: React.ComponentPropsWithoutRef<C>;
	}): RenderBuilder => {
		this.wrappers.push(wrapper);
		return this;
	};

	public render = (ui: ReactElement): RenderResult => {
		const Wrapper: React.ElementType = ({ children }) => (
			<>
				{[...this.wrappers].reverse().reduce(
					(wrapped, wrapper) => (
						<wrapper.Component {...wrapper.props}>{wrapped}</wrapper.Component>
					),
					children,
				)}
			</>
		);

		this.renderOptions.wrapper = Wrapper;

		return { ...rtlRender(ui, this.renderOptions) };
	};
}
