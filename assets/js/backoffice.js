const tokenAuth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MTA3ZGI3MzAwMTU0MDYzYjEiLCJpYXQiOjE3MzM4NDk0MTAsImV4cCI6MTczNTA1OTAxMH0.kpcfqSkvy7Y1JLFfx2yJyP45AwrEQiQo-0Z1FCXPnlE";
const endPoint = "https://striveschool-api.herokuapp.com/api/product/";

let btnDelete = document.getElementById("productDelete");
let backofficeTitle = document.getElementById("backofficeTitle");
let btnManage = document.getElementById("productManage");



const param = new URLSearchParams(window.location.search).get("id");

class Prodotto{
    constructor(_name,_description,_brand,_imageUrl,_price){  
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
    };
}


document.addEventListener("load", init());

function init(){
    if(!param){
        //SE non è presente FACCIO SCOMPARIRE IL BOTTONE E AGGIUNGO UN EVENT LISTENER SUL CLICK DEL FORM (Aggiungere controllo sul bottone), DOPO IL CLICK VIENE ESEGUITA UNA POST sull API per andare a inserire il prodotto , e poi verrà resettato il form
        btnDelete.classList.add("d-none");
    }else{
        //SE e' PRESENTE Faccio comparire il bottone di delete e cambio il titolo in modifica prodotto-> GEt sui dati del singolo prodotto -> popolo il campi.value con i valori del prodotto selezionato, ->
        //->creo due eventListner sul btn Delete e quello insert, l'insert fara una PUT con i nuovi dati inseriti, la delete fara una DELETE dell'oggetto dal api con un alert-> reset form;
        fetchProduct();
        btnDelete.classList.remove("d-none");
        backofficeTitle.innerText ="Modifica prodotto";
        btnManage.innerText = "EDIT";
        
        
    }
};








async function fetchProduct() {
    
}