// variable
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = []

// event listener
eventListener();
function eventListener() {
    // when user add new click
    formulario.addEventListener('submit', agregarTweet);

    // when document is ready
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || []; 
        createHTML();
    })
}


// funciones

function agregarTweet( e ) {
    e.preventDefault();
    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value?.trim();

    // validacion..
    if( tweet === '' ) {
        showError(' Un mensaje no puede ir vacio')
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet,
    }

    // add to [] of tweets
    tweets = [...tweets, tweetObj]

    // once added create HTML
    createHTML();

    // recharge form
    formulario.reset()
    
}

// mostrar mensaje de error
function showError( error ) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild( mensajeError )

    // delet alert after time
    setTimeout(() => {
        mensajeError.remove();
    }, 3000)

}

// show a list of tweets
function createHTML() {

    cleanHTML();
    
    if( tweets.length > 0 ) {
        tweets.forEach( tweet => {

            // create Btn to delete
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('borrar-tweet'); 
            deleteBtn.innerText = 'X'

            // add to function delet
            deleteBtn.onclick = e => {
                borrarTweet(tweet?.id);
            }
            
            // create HTML
            const li = document.createElement('li');
            
            // add text
            li.textContent = tweet.tweet;

            // asign btn
            li.appendChild( deleteBtn );
            
            // insert in HTML
            listaTweets.appendChild( li );
        })
    }

    syncStorage()
}

// add currents tweets to local storage
function syncStorage() {
    localStorage.setItem('tweets', JSON.stringify( tweets ));
}

// delete TWEET
function borrarTweet( id ) {
    tweets = tweets.filter( tweet => tweet.id !== id );
    createHTML();
}

// limpiar HTML
function cleanHTML() {
    while( listaTweets.firstChild ) {
        console.log(listaTweets.firstChild)
        listaTweets.removeChild(listaTweets.firstChild)
    }
}