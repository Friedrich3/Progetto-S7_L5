const tokenAuth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MTA3ZGI3MzAwMTU0MDYzYjEiLCJpYXQiOjE3MzM4NDk0MTAsImV4cCI6MTczNTA1OTAxMH0.kpcfqSkvy7Y1JLFfx2yJyP45AwrEQiQo-0Z1FCXPnlE";
const endPoint = "https://striveschool-api.herokuapp.com/api/product/";

let productsArray = [];

document.addEventListener("load", init());

function init(){
    fetchdata();

}

 async function fetchdata() {
        try{
            let response = await fetch(endPoint,{
                method:"GET",
                headers:{
                    "authorization": tokenAuth,
                    "Content-Type": "application/json"
                }
            });
            let data =  await response.json();
            productsArray = data;
            console.log(productsArray);
            printcards(productsArray)
            
        }catch(error){
            console.log("Error" + error);
        };  
 };


 function printcards(array){
    let cardContainer = document.getElementById("cardContainer");
    //cardContainer.innerHTML= "";

    for(let i = 0; i < array.length;i++){
        let productCard = document.createElement("div");
        let card = document.createElement("div");
        let image = document.createElement("img");
        let cardBody = document.createElement("div");
        let cardTitle = document.createElement("h5");
        let cardDescription = document.createElement("p");
        let cardBrand = document.createElement("p");
        let cardPrice = document.createElement("p");
        let btnModify = document.createElement("a");
        let btnInfo = document.createElement("a");

        productCard.setAttribute("id",`product-${i}`);
        productCard.classList.add("col-3");

        card.classList.add("card");

        image.setAttribute("src", `${array[i].imageUrl}`);
        image.setAttribute("alt", "Immagine Prodotto");
        image.classList.add("card-img-top", "img-fluid");

        cardBody.classList.add("card-body");
        
        cardTitle.classList.add("card-title");
        cardTitle.innerText = `${array[i].name}`;

        cardDescription.classList.add("card-text");
        cardDescription.innerText = `${array[i].description}`;
        
        cardBrand.classList.add("card-text");
        cardBrand.innerText = `Brand: ${array[i].brand}`;

        cardPrice.classList.add("card-text");
        cardPrice.innerText = `${array[i].price} €`;

        btnModify.classList.add("btn", "btn-warning" ,"fw-bold");
        btnModify.innerText = "Modifica";
        btnModify.setAttribute("href",`backoffice.html?id=${array[i]._id}`);

        btnInfo.classList.add("btn", "btn-info", "fw-bold");
        btnInfo.innerText = "More Info";
        btnInfo.setAttribute("href",`details.html?id=${array[i]._id}`);


        cardBody.append(cardTitle,cardDescription,cardBrand,cardPrice,btnModify,btnInfo);
        card.append(image, cardBody);
        productCard.appendChild(card);
        cardContainer.appendChild(productCard);
    };
 };


//  {
//     "_id": "675c04f7d220710015de2f65",
//     "name": "Iphone 15",
//     "description": "Cellphone",
//     "brand": "Apple",
//     "imageUrl": "https://urlplaceholder.jpg",
//     "price": 99,
//     "userId": "6758714107db7300154063b1",
//     "createdAt": "2024-12-13T09:57:11.780Z",
//     "updatedAt": "2024-12-13T09:57:11.780Z",
//     "__v": 0
// }