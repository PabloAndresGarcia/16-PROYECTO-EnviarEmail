document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }


    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')


    //Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);


    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    })
    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        
        spinner.classList.remove('hidden');

    }

    


    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
    }
    
    function mostrarAlerta(mensaje, referencia){
        //Comprueba si ya existe una alerta
        limpiarAlerta(referencia);
        //GENERAR ALERTA
        const error= document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
            //inyectar el error al form
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
})
