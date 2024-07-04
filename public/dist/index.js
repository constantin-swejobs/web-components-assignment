"use strict";
class MyCardComponent extends HTMLElement {
    constructor() {
        super();
        // NOTE: Using a string template for demo purposes, to keep teh setup simple.
        // In production workflows, tooling to enable external HTML/CSS file imports
        // or inline typed fragment (tagged templates) to improve development experience
        // around linting/automated formatters/code checkers which will be bypassed in 
        // the current implementation. 
        let template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;

                    padding: 1rem;
                    border-radius: .5rem;
                    border: 1px solid #cdcdcd;

                    box-shadow: 0 1px 6px rgba(43, 42, 42, .1);
                }

                header {
                    /* Accept color customization through "--my-card-headline-color",
                       otherwise default on #333 */
                    color: var(--my-card-headline-color, #333);

                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 1rem;
                }
            </style>

            <header></header>
            <main>
                <slot></slot>
            </main>
        `;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(template.content);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        var _a;
        if (name === "headline") {
            const headerRef = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("header");
            if (headerRef != null) {
                headerRef.innerText = newValue || "";
                headerRef.title = newValue || "";
            }
        }
    }
}
MyCardComponent.observedAttributes = ["headline"];
customElements.define("my-card", MyCardComponent);
