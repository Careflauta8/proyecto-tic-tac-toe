
let params = (new URL(document.location)).searchParams;
let ganador = params.get("ganador");
    
        document.querySelector('.ganador').innerHTML = parseInt(ganador) ? 'X' : 'O';