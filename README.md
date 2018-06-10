# About

Detect dom changes with debounce protection.

Get all collected mutations in the meantime.

Written in Typescript, runs everywhere.

# Usage

```
    // create your observer for your container
    const myOberver = new DynaDomObserver({
          rootNode: document.querySelector('#my-component'), 
          onChange: (mutations) => console.log('detected mutations', mutations);
    });

    // when you finish, clean it up
    myObserver.dispose();

```

# Config

```
IDynaDomChangesConfig {
  rootNode?: Element;                               // optional, default is document.body
  detectChanges?: EChangeType[];                    // optional, default is [EChangeType.ATTR_CHANGE, EChangeType.SUB_NODES_CHANCES]
  debounceTime?: number;                            // optional, timeout in ms, triggers or 1st, debounces the rest, triggers each this timeout, default 300
  onChange: (mutations: MutationRecord[]) => void;  // required, triggers on change
}
```

# Reference

[Dom observer, this strange guy](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)