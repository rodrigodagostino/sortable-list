class SortableList extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });

		shadow.innerHTML = `
			<style>
				:host {
					display: flex;
					flex-direction: column;
				}
			</style>
			<slot></slot>
		`;
	}
}

customElements.define('sortable-list', SortableList);
