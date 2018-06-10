export interface IDynaDomChangesConfig {
    rootNode?: Element;
    detectChanges?: EChangeType[];
    debounceTime?: number;
    onChange: (mutations: MutationRecord[]) => void;
}
export declare enum EChangeType {
    ATTR_CHANGE = "ATTR_CHANGE",
    SUB_NODES_CHANCES = "SUB_NODES_CHANCES"
}
export declare class DynaDomObserver {
    private config;
    constructor(config: IDynaDomChangesConfig);
    dispose(): void;
    private domObserver;
    private collectedMutations;
    private initDomObserverForChanges;
    private handleDomChange;
}
