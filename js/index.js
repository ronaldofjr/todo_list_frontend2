Date.prototype.toDateInputValue = function () {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
};

// SOMENTE EXECUTANDO APOS CARREGADA A TELA TODA
window.onload = async () => {
	// FORMATACAO DE DATA
	const dateFormat = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

	// DEFININDO LOCAL DOS CARDS
	const cards = document.getElementById('cards');

	// DEFININDO LOCAL DO ERRO
	const errorTxt = document.getElementById('error');

	// DEFININDO OS ITENS DA PAGINA
	const inputCriacao = document.getElementById('date_criacao');
	const inputLimite = document.getElementById('date_limite');
	const inputTarefa = document.getElementById('tarefa');
	const submitButton = document.getElementById('cadastrar');

	// DEFININDO DATA DE HOJE
	let today = new Date();
	inputCriacao.value = new Date().toDateInputValue();

	// CRIANDO EVENTO PARA O SUBMIT
	submitButton.addEventListener('click', (e) => {
		// EVITANDO SUBMIT
		e.preventDefault();

		// LIMPANDO ERRO
		errorTxt.innerHTML = '';
		errorTxt.style.display = 'none';

		// CRIANDO VALIDACOES
		let validated = validarForm();

		if (!validated) {
			errorTxt.style.display = 'block';
		} else {
			addTodo();
			clearForm();
		}
	});

	// VALIDANDO FORMULARIO
	function validarForm() {
		if (inputLimite.value.length <= 0) {
			errorTxt.innerHTML += '<div>Preencha o campo DATA LIMITE</div>';
			return false;
		} else if (inputTarefa.value.length <= 0) {
			errorTxt.innerHTML += '<div>Preencha o campo TAREFA</div>';
			return false;
		} else if (inputTarefa.value.length < 10) {
			errorTxt.innerHTML += '<div>O campo TAREFA necessita de no mínimo 10 caracteres</div>';
			return false;
		} else {
			return true;
		}
	}

	// ADICIONANDO TODO
	function addTodo() {
		let data0 = new Date(inputCriacao.value + ' 00:00:00');
		let data1 = new Date(inputLimite.value + ' 00:00:00');

		let newId = Math.floor(Math.random() * 999999999 + 1) + Math.floor(Math.random() * 100000 + 1);

		//  li = document.createElement('div');
		// var inputValue = document.getElementById('myInput').value;
		// var t = document.createTextNode(inputValue);
		// li.appendChild(t);
		// if (inputValue === '') {
		// 	alert('You must write something!');
		// } else {
		// 	document.getElementById('myUL').appendChild(li);
		// }
		// document.getElementById('myInput').value = '';

		// var span = document.createElement('SPAN');
		// var txt = document.createTextNode('\u00D7');
		// span.className = 'close';
		// span.appendChild(txt);
		// li.appendChild(span);

		// for (i = 0; i < close.length; i++) {
		// 	close[i].onclick = function () {
		// 		var div = this.parentElement;
		// 		div.style.display = 'none';
		// 	};
		// }

		let newCard = `
            <ul class="">
                <li class="list-group-item"></li>
                <li class="list-group-item"></li>                
            </ul>
            <div class="card-body">
                <h5 class="card-title"></h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item completed">MARCAR COMO CONCLUÍDO</li>
                <li class="list-group-item delete">DELETAR O CARD</li>                
            </ul>
            `;

		// CRIANDO A DIV PRINCIPAL
		let element = document.createElement('div');
		element.classList.add('card');
		element.setAttribute('id', newId);

		// CRIANDO A LISTA UL DAS DATAS
		let ulDatas = document.createElement('ul');
		ulDatas.classList.add('list-group');
		ulDatas.classList.add('list-group-flush');

		// CRIANDO AS LI DAS DATAS
		let liData1 = document.createElement('li');
		liData1.classList.add('list-group-item');
		liData1.classList.add('datas');
		liData1.innerHTML = `Criado: ${dateFormat.format(data0)}`;

		let liData2 = document.createElement('li');
		liData2.classList.add('list-group-item');
		liData2.classList.add('datas');
		liData2.innerHTML = `Realizar até : ${dateFormat.format(data1)}`;

		let body = document.createElement('div');
		body.classList.add('card-body');
		body.innerHTML = `${inputTarefa.value}`;

		// CRIANDO A LISTA UL DAS OPCOES
		let ulOptions = document.createElement('ul');
		ulOptions.classList.add('list-group');
		ulOptions.classList.add('list-group-flush');

		// CRIANDO AS LI DAS OPCOES
		let completed = document.createElement('li');
		completed.classList.add('list-group-item');
		completed.classList.add('completed');
		completed.innerHTML = 'Marcar tarefa como completa';
		completed.onclick = (e) => {
			e.target.parentNode.removeChild(e.target);
			completedCard(newId);
		};

		let deleted = document.createElement('li');
		deleted.classList.add('list-group-item');
		deleted.classList.add('deleted');
		deleted.innerHTML = 'Deseja realmente deletar o registro?';
		deleted.onclick = () => removeCard(newId);

		ulDatas.appendChild(liData1);
		ulDatas.appendChild(liData2);

		ulOptions.appendChild(completed);
		ulOptions.appendChild(deleted);

		element.appendChild(ulDatas);
		element.appendChild(body);
		element.appendChild(ulOptions);

		cards.appendChild(element);
	}

	function removeCard(card) {
		if (window.confirm('Deseja realmente deletar este card?')) {
			document.getElementById(card).outerHTML = '';
		}
	}

	function completedCard(card) {
		let cartao = document.getElementById(card);

		cartao.classList.add('card-completed');
	}

	// LIMPANDO FORMULARIO
	function clearForm() {
		// inputLimite.value = '';
		// inputTarefa.value = '';
	}
};
