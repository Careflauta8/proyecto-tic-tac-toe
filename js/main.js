
let turno= 1;
let jugadas = [];
let modo = 'jvj';


buttonpulsado = (id) => {
   	if (modo === 'jvj') {
		juegaHumano(id);
	} else {
		juegaHumano(id);
		juegaCPU();
	} 
}

juegaHumano = (id) => {
	if (turno <= 6 && jugadas.find(casilla => id == casilla.id ) === undefined) {
    	document.querySelector(`.casilla${id}`).style.background = turno % 2 ? '#3ccc73' : '#01ffea';
		jugadas.push({ id: id, jugador: turno % 2 ? 1: 0 });
		turno = turno + 1;
	} else if (turno > 6 ) {
		if (jugadas.length === 6) {
			if (jugadas.find(casilla => id === casilla.id && casilla.jugador == turno % 2)) {
				jugadas = jugadas.filter(casilla => casilla.id !== id);
				document.querySelector(`.casilla${id}`).style.background = 'white';
			}
		} else {
			document.querySelector(`.casilla${id}`).style.background = turno % 2 ? '#3ccc73' : '#01ffea';
			jugadas.push({ id: id, jugador: turno % 2 ? 1: 0 });
			turno = turno + 1;
		}
	}
	console.log('---------------');
}

juegaCPU = () => {
	let posiblesJugadas = calcularPosibleJugadas();
	console.log('posiblesJugadas: ', posiblesJugadas);

	let id = posiblesJugadas[ Math.floor(Math.random() * posiblesJugadas.length)];
	console.log('id: ', id);
	juegaHumano(id);
}

calcularPosibleJugadas = () => {
	let posibleJugadas = [1,2,3,4,5,6,7,8,9];
	if (turno <= 6 ) {
		posibleJugadas = posibleJugadas.filter(pos => jugadas.find(jugada => jugada.id !== pos));
	} else {
		if (jugadas.length === 6) { 
			posibleJugadas = [];
			jugadas.forEach(jugada => {
				if (jugada.jugador === turno % 2) {
					posibleJugadas.push(jugada.id);
				}
			});
		} else {
			posibleJugadas = posibleJugadas.filter(pos => jugadas.find(jugada => jugada.id !== pos));
		}
	}

	return posibleJugadas;
}



reset = () => {
	turno = 1;
	jugadas = [];
	if ( modo === 'cvj') {
		juegaCPU();
	}
	for (let i = 1; i <= 9; i++) {
		document.querySelector(`.casilla${i}`).style.background = 'white'
	}
}

jvj = () => {
	modo = 'jvj';
}

jvc = () => {
	modo = 'jvc';
}

cvj = () => {
	modo = 'cvj';
}




const ganador = [
	[0, 1, 2], 
	[3, 4, 5], 
	[6, 7, 8], 
	[0, 3, 6], 
	[1, 4, 7], 
	[2, 5, 8], 
	[0, 4, 8], 
	[2, 4, 6]
];


