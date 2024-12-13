const tokenAuth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MTA3ZGI3MzAwMTU0MDYzYjEiLCJpYXQiOjE3MzM4NDk0MTAsImV4cCI6MTczNTA1OTAxMH0.kpcfqSkvy7Y1JLFfx2yJyP45AwrEQiQo-0Z1FCXPnlE";
const endPoint = "https://striveschool-api.herokuapp.com/api/product/";

const param = new URLSearchParams(window.location.search).get("id");

let singleProduct = {};


document.addEventListener("load", init());

function init() {
    getProduct();
};


async function getProduct() {
    let url = endPoint + param;
    try{
        let response = await fetch(url,{
            method:"GET",
            headers:{
                "authorization": tokenAuth,
                "Content-Type": "application/json" 
        }
    });
    let data = await response.json();
    singleProduct = data;
    console.log(singleProduct);
    printProduct(singleProduct);
    }catch(error){
        console.log("errore"+ error);
    }
};


function printProduct(prodotto){
    let imageDetail = document.getElementById("imageDetail");
    let productImage = document.createElement("img");
    
    let productDetail = document.getElementById("productDetail");
    let productBrand = document.createElement("p");
    let productTitle = document.createElement("h4");
    let productPrice = document.createElement("p");
    let productDescription = document.createElement("p");

    productImage.setAttribute("src", `${prodotto.imageUrl}`);
    productImage.setAttribute("alt", "Immagine Prodotto Selezionato");
    productImage.classList.add("img-fluid");
    imageDetail.appendChild(productImage);

    productBrand.innerText = `${prodotto.brand}`;
    productTitle.innerText = `${prodotto.name}`;
    productPrice.innerText = `${prodotto.price}€`;
    productPrice.classList.add("fw-bold","pb-4");
    productDescription.innerText = `${prodotto.description}`;

    productDetail.append(productBrand,productTitle,productPrice,productDescription);
};