import * as debounce from "lodash.debounce";

export interface IDynaDomChangesConfig {
	rootNode?: Element;
	detectChanges?: EChangeType[];
	debounceTime?: number; // in ms
	onChange: (mutations: MutationRecord[]) => void;
}

export enum EChangeType {
	ATTR_CHANGE = "ATTR_CHANGE",
	SUB_NODES_CHANCES = "SUB_NODES_CHANCES",
}

const defaultConfig: IDynaDomChangesConfig = {
	rootNode: document.body,
	detectChanges: [
		EChangeType.ATTR_CHANGE,
		EChangeType.SUB_NODES_CHANCES,
	],
	debounceTime: 300, // ms,
	onChange: (mutations: MutationRecord[]) => undefined,
};

// dev help: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

export class DynaDomObserver {
	constructor(private config: IDynaDomChangesConfig) {
		this.config = {
			...defaultConfig,
			...this.config,
		};

		this.handleDomChange = debounce(
			this.handleDomChange.bind(this),
			this.config.debounceTime,
			{leading: true, maxWait: this.config.debounceTime},
		);
		this.initDomObserverForChanges();
	}

	public dispose(): void {
		this.domObserver.disconnect();
	}

	private domObserver: MutationObserver;
	private collectedMutations: MutationRecord[] = [];

	private initDomObserverForChanges(): void {
		this.domObserver = new MutationObserver((mutations: MutationRecord[], observer: MutationObserver) => {
			if (mutations.length) {
				this.collectedMutations = this.collectedMutations.concat(mutations);
				this.handleDomChange();
			}
		});

		this.domObserver.observe(
			this.config.rootNode,
			{
				attributes: this.config.detectChanges.indexOf(EChangeType.ATTR_CHANGE) > -1,
				childList: this.config.detectChanges.indexOf(EChangeType.SUB_NODES_CHANCES) > -1,
				subtree: this.config.detectChanges.indexOf(EChangeType.SUB_NODES_CHANCES) > -1,
			},
		);
	}

	private handleDomChange(): void {
		const mutations: MutationRecord[] = this.collectedMutations.concat();
		this.collectedMutations = [];
		this.config.onChange(mutations);
	}
}
