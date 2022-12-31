
let turno= 1;
let jugadas = [];
let modo = 'jvj';
let ultimaSelect;

buttonpulsado = (id) => {
	if (!hayGanador()) {
		if (modo === 'jvj') {
			juegaHumano(id);
		} else {
			juegaHumano(id);
			if (turno <= 6 ) {
				juegaCPU();
			} else if (turno > 6  && jugadas.length === 6 && 
				((turno % 2 == 1 && modo === 'cvj' ) 
				|| (turno % 2 == 0 && modo === 'jvc'))) 
			{
				juegaCPU();
				juegaCPU();
			}
		}
	}
	
	if (hayGanador()) {
		document.getElementById('ganador').innerHTML = turno % 2 ? 'Ganador X' : 'Ganador O';
	}
	document.getElementById('turno').innerHTML = turno % 2 ? 'Turno X' : 'Turno O';
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
}

juegaCPU = () => {
	let posiblesJugadas = calcularPosibleJugadas();
	let id = posiblesJugadas[ Math.floor(Math.random() * posiblesJugadas.length)];
	juegaHumano(id);
	ultimaSelect = id;
}

calcularPosibleJugadas = () => {
	let posibleJugadas = [];

	if (turno <= 6 ) {
		if (jugadas.length > 0) {
			[1,2,3,4,5,6,7,8,9].forEach(posi => {
				let juga = jugadas.find(jugada => posi === jugada.id);
				if (!juga) {
					posibleJugadas.push(posi);
				}
			})
		} else {
			return [1,2,3,4,5,6,7,8,9]
		}
		
	} else {
		if (jugadas.length === 6) {
			jugadas.forEach(jugada => {
				if (jugada.jugador === turno % 2) {
					posibleJugadas.push(jugada.id);
				}
			});
		} else {
			// ultimaSelect
			[1,2,3,4,5,6,7,8,9].forEach(posi => {
				let juga = jugadas.find(jugada => posi === jugada.id);
				if (!juga && ultimaSelect != posi ) {
					posibleJugadas.push(posi);
				}
			})
		}
	}

	return posibleJugadas;
}

hayGanador = () => {
	let result = false;
	for (let jugadaGanadora of ganador) {
		let jugada1 = jugadas.find(jugada => jugadaGanadora[0] == jugada.id);
		let jugada2 = jugadas.find(jugada => jugadaGanadora[1] == jugada.id);
		let jugada3 = jugadas.find(jugada => jugadaGanadora[2] == jugada.id);
		console.log('jugadaGanadora :', jugadaGanadora);
		console.log('jugada1 :', jugada1);
		console.log('jugada2 :', jugada2);
		console.log('jugada3 :', jugada3);
		console.log('---------\n');
		if (jugada1 && jugada2 && jugada3) {
			result = jugada1.jugador == jugada2.jugador && jugada3.jugador == jugada1.jugador
		}
		
		if (result) {
			break;
		}	
	}
	console.log('result: ', result);
	return result;
}


reset = () => {
	turno = 1;
	jugadas = [];
	for (let i = 1; i <= 9; i++) {
		document.querySelector(`.casilla${i}`).style.background = 'white'
	}

	if ( modo === 'cvj') {
		juegaCPU();
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
	[1, 2, 3], 
	[4, 5, 6], 
	[7, 8, 9], 
	[1, 4, 7], 
	[2, 5, 8], 
	[3, 6, 9], 
	[1, 5, 9], 
	[3, 5, 7]
];


