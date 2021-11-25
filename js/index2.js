// SOMENTE EXECUTANDO APOS CARREGADA A TELA TODA
window.onload = async () => {
	// DEFININDO O LOCAL DOS CARDS
	const cardContainer = document.getElementById('cards');

	// EFETUANDO A CAPTURA DOS TODOS
	const getAllTodos = await fetch('https://jsonplaceholder.typicode.com/todos/');
	const todoList = await getAllTodos.json();

	// GERANDO OS CARDS VIA LOOP
	todoList.map((item) => {
		let cardStyle = item.completed === true ? 'completed' : 'not-completed';

		// CRIANDO O CARD
		let newCard = `<div class="card ${cardStyle}-card"><div class="card-body ${cardStyle}-body"><span class="${cardStyle}">${item.id} ${item.title}</span></div></div>`;

		// GRAVANDO O CARD NA PAGINA
		cardContainer.innerHTML += newCard;
	});
};
