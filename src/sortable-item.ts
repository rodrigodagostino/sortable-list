class SortableItem extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		shadow.innerHTML = `
			<style>
				:host {
					user-select: none;
				}
			</style>
			<slot></slot>
		`;
	}
}

customElements.define('sortable-item', SortableItem);
