const quoteContainer=document.getElementById("quote-container");
const quote=document.getElementById("quote");
const author=document.getElementById("author");
const twitterBtn=document.getElementById("twitter");
const newQuoteBtn=document.getElementById("new-quote");
const loader=document.getElementById("loader");

// Show Loading
function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// Hide Loading
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// Get Quote from API
async function getQuoteFromApi(){
    showLoadingSpinner();
    const proxyUrl='https://whispering-tor-04671.herokuapp.com/';
    const urlApi='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';;
    
    try{
        const response=await fetch(proxyUrl+urlApi);
        const data=await response.json();
        // Check if author is empty and replace it with unknown
        if(data.quoteAuthor===""){
            author.innerText="Unknown";
        }else{
            author.innerText=data.quoteAuthor;
        }
        // Reduce the size of long quotes
        if(data.quoteText.length>120){
            quote.classList.add("long-quote");
        }else{
            quote.classList.remove("long-quote");
        }
        quote.innerText=data.quoteText;
        removeLoadingSpinner();
    } catch(error){
        getQuoteFromApi();
        
    }
}

function tweetQuote(){
    const tweetQuote=quote.innerText;
    const tweetAuthor=author.innerText;
    const tweetUrl=`https://twitter.com/intent/tweet?text=${tweetQuote} -${tweetAuthor}`;
    window.open(tweetUrl, '_blank');
}   

newQuoteBtn.addEventListener('click',getQuoteFromApi);
twitterBtn.addEventListener('click',tweetQuote);
getQuoteFromApi();