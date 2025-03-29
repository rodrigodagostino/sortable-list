import './sortable-list';
import './sortable-item';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
		<sortable-list>
			<sortable-item>Item 1</sortable-item>
			<sortable-item>Item 2</sortable-item>
			<sortable-item>Item 3</sortable-item>
			<sortable-item>Item 4</sortable-item>
			<sortable-item>Item 5</sortable-item>
		</sortable-list>
  </div>
`;
