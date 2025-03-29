class SortableList extends HTMLElement {
	pointerOrigin: { x: number; y: number } = { x: 0, y: 0 };
	ghost: HTMLElement = document.createElement('div');

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

		this.handlePointerDown = this.handlePointerDown.bind(this);
		this.handlePointerMove = this.handlePointerMove.bind(this);
		this.handlePointerUp = this.handlePointerUp.bind(this);
	}

	handlePointerDown(event: PointerEvent) {
		const target = event.target as HTMLElement;
		const currItem: HTMLElement | null = target.closest('sortable-item');

		if (!currItem) return;

		this.pointerOrigin = { x: event.clientX, y: event.clientY };
		const clone = currItem.cloneNode(true) as HTMLElement;
		this.ghost.style.position = 'fixed';
		this.ghost.style.left = `${currItem.getBoundingClientRect().x}px`;
		this.ghost.style.top = `${currItem.getBoundingClientRect().y}px`;
		this.ghost.appendChild(clone);
		document.body.appendChild(this.ghost);
		currItem?.setPointerCapture(event.pointerId);

		currItem.addEventListener('pointermove', this.handlePointerMove);
		currItem.addEventListener(
			'pointerup',
			() => {
				currItem.removeEventListener('pointermove', this.handlePointerMove);
				this.handlePointerUp();
			},
			{ once: true }
		);
	}

	handlePointerMove(event: PointerEvent) {
		this.ghost.style.transform = `translate3d(${event.clientX - this.pointerOrigin.x}px, ${event.clientY - this.pointerOrigin.y}px, 0)`;
	}

	handlePointerUp() {
		this.ghost.removeAttribute('style');
		this.ghost.replaceChildren();
		this.ghost.remove();
	}

	connectedCallback() {
		this.addEventListener('pointerdown', this.handlePointerDown);
	}

	disconnectedCallback() {
		this.removeEventListener('pointerdown', this.handlePointerDown);
	}
}

customElements.define('sortable-list', SortableList);
