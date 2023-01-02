const ingresar = ()=>{
    let jugador1 = document.querySelector('#usuario1').value
    let jugador2 = document.querySelector('#usuario2').value
    
        sessionStorage.setItem('usuario1', jugador1)
        sessionStorage.setItem('usuario2', jugador2)
        
		window.location = "../pages/juego.html"
    
}
const mostrarNombres=()=>{
    const caja1 = document.querySelector('#caja1')
    const caja2 = document.querySelector('#caja2')

    
	let nombre1 = sessionStorage.getItem('usuario1')
    let nombre2 = sessionStorage.getItem('usuario2')
    
    caja1.innerHTML = nombre1
    caja2.innerHTML = nombre2
}
 mostrarNombres()



let turno= 1;
let jugadas = [];
let modo = 'jugadorvsjugador';
let ultimaSelect;

buttonpulsado = (id) => {
	if (!hayGanador()) {
		if (modo === 'jugadorvsjugador') {
			juegaHumano(id);
		} else {
			juegaHumano(id);
			if (turno <= 6 ) {
				juegaCPU();
			} else if (turno > 6  && jugadas.length === 6 && 
				((turno % 2 == 1 && modo === 'cpuvsjugador' ) 
				|| (turno % 2 == 0 && modo === 'jugadorvscpu'))) 
			{
				juegaCPU();
				juegaCPU();
			}
		}
	}
	
	let ganador = hayGanador();
	if (ganador) {
		document.getElementById('ganador').innerHTML = ganador;
	}

	if (modo === 'jugadorvsjugador') {
		document.getElementById('turno').innerHTML = turno % 2 ? 'Turno X' : 'Turno O';
	} else if (modo === 'jugadorvscpu') { 
		document.getElementById('turno').innerHTML = 'Turno X';
	} else if (modo === 'cpuvsjugador' ) { 
		document.getElementById('turno').innerHTML = 'Turno O';
	}
	
}

juegaHumano = (id) => {
	if (turno <= 6 && jugadas.find(casilla => id == casilla.id ) === undefined) {
    	document.querySelector(`.casilla${id}`).innerHTML = turno % 2 ? '<img src="../img/x.png" width="50" height="50">' : '<img src="../img/O.png" width="50" height="50">';
		jugadas.push({ id: id, jugador: turno % 2  ? 1: 0 });
		turno = turno + 1;
	} else if (turno > 6 ) {
		if (jugadas.length === 6) {
			if (jugadas.find(casilla => id === casilla.id && casilla.jugador == turno % 2)) { //que la jugada sea mia//
				jugadas = jugadas.filter(casilla => casilla.id !== id); //elimino de la logica//
				document.querySelector(`.casilla${id}`).innerHTML= '<img src="../img/white.png" width="50" height="50">';
				//la elimino visualmente//
			}
		} else {
			document.querySelector(`.casilla${id}`).innerHTML = turno % 2 ? '<img src="../img/x.png" width="50" height="50">' : '<img src="../img/O.png" width="50" height="50">';
			jugadas.push({ id: id, jugador: turno % 2 ? 1: 0 }); //guardo el id y el turno//
			turno = turno + 1; 
		}
	}
}

juegaCPU = () => {
	let posiblesJugadas = calcularPosibleJugadas(); //da todas las posibles jugadas //
	let id = posiblesJugadas[ Math.floor(Math.random() * posiblesJugadas.length)]; //da una jugada random//
	juegaHumano(id); //la computadora juega igual que el humano//
	ultimaSelect = id; //con esto guardamos la ultima jugada de la CPU//
}

calcularPosibleJugadas = () => {
	let posibleJugadas = []; //es un array de las posibles jugadas de la CPU//

	if (turno <= 6 ) {
		if (jugadas.length > 0) {  //si ya se ha jugado al menos una vez//
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
		if (jugadas.length === 6) { //tamaño array es exactamente igual a 6//
			jugadas.forEach(jugada => { //recorro todo el array//
				if (jugada.jugador === turno % 2) { //si la jugada es mia//
					posibleJugadas.push(jugada.id); //la agrego como una posible jugada//
				}
			});
		} else {
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
	let playerGanador;
	for (let jugadaGanadora of ganador) {
		let jugada1 = jugadas.find(jugada => jugadaGanadora[0] == jugada.id);
		let jugada2 = jugadas.find(jugada => jugadaGanadora[1] == jugada.id);
		let jugada3 = jugadas.find(jugada => jugadaGanadora[2] == jugada.id);
		if (jugada1 && jugada2 && jugada3) {
			result = jugada1.jugador == jugada2.jugador && jugada3.jugador == jugada1.jugador
			playerGanador = jugada1.jugador ? 'Ganador X' : 'Ganador O';
		}
		
		if (result) {
			window.location = `../pages/ganador.html?ganador=${jugada1.jugador}`;
 			break;
		}	
	}
	return result ? playerGanador : false;
	
}


reset = () => {
	turno = 1;
	jugadas = [];
	document.getElementById('ganador').innerHTML = '';
	document.getElementById('turno').innerHTML = '';

	for (let i = 1; i <= 9; i++) {
		document.querySelector(`.casilla${i}`).innerHTML = '<img src="../img/white.png" width="50" height="50">'
	}

	if (modo === 'jugadorvsjugador' || modo === 'jugadorvscpu') {
		document.getElementById('turno').innerHTML = 'Turno X';
	} else if (modo === 'cpuvsjugador' ) {
		juegaCPU();
		document.getElementById('turno').innerHTML = 'Turno O';
	}
}

jugadorvsjugador = () => {
	modo = 'jugadorvsjugador';
	document.querySelector('.JugadorvsJugador').style.backgroundColor = '#e2b205';
	document.querySelector('.JugadorvsJugador').style.color = 'black';

	document.querySelector('.JugadorvsCpu').style.backgroundColor = 'transparent';
	document.querySelector('.JugadorvsCpu').style.color = '#ffc107';
	document.querySelector('.CpuvsJugador').style.backgroundColor = 'transparent';
	document.querySelector('.CpuvsJugador').style.color = '#ffc107';
	reset();
}

jugadorvscpu = () => {
	modo = 'jugadorvscpu';
	document.querySelector('.JugadorvsCpu').style.backgroundColor = '#e2b205';
	document.querySelector('.JugadorvsCpu').style.color = 'black';
	
	document.querySelector('.JugadorvsJugador').style.backgroundColor = 'transparent';
	document.querySelector('.JugadorvsJugador').style.color = '#ffc107';
	document.querySelector('.CpuvsJugador').style.backgroundColor = 'transparent';
	document.querySelector('.CpuvsJugador').style.color = '#ffc107';
	reset();
}

cpuvsjugador = () => {
	modo = 'cpuvsjugador';
	document.querySelector('.CpuvsJugador').style.backgroundColor = '#e2b205';
	document.querySelector('.CpuvsJugador').style.color = 'black';
	
	document.querySelector('.JugadorvsJugador').style.backgroundColor = 'transparent';
	document.querySelector('.JugadorvsJugador').style.color = '#ffc107';
	document.querySelector('.JugadorvsCpu').style.backgroundColor = 'transparent';
	document.querySelector('.JugadorvsCpu').style.color = '#ffc107';
	reset();
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


