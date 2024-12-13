const tokenAuth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MTA3ZGI3MzAwMTU0MDYzYjEiLCJpYXQiOjE3MzM4NDk0MTAsImV4cCI6MTczNTA1OTAxMH0.kpcfqSkvy7Y1JLFfx2yJyP45AwrEQiQo-0Z1FCXPnlE";
const endPoint = "https://striveschool-api.herokuapp.com/api/product/";

let formSection = document.getElementById("formSection");
let btnDelete = document.getElementById("productDelete");
let backofficeTitle = document.getElementById("backofficeTitle");
let btnManage = document.getElementById("productManage");


const title = document.getElementById("productName");
const description = document.getElementById("productDescription");
const brand = document.getElementById("productBrand");
const imageUrl = document.getElementById("productUrl");
const price = document.getElementById("productPrice");

let boolean; //Valore booleano che verrà gestito se è presente o meno l'id nell URL
let singleProduct = {};


const param = new URLSearchParams(window.location.search).get("id");
const url = endPoint + param;

class Prodotto {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
    };
}


document.addEventListener("load", init());

function init() {
    if (!param) {
        //SE non è presente (Aggiungere controllo sul bottone)
        btnDelete.classList.add("d-none");
        boolean = true;
    } else {
        btnDelete.classList.remove("d-none");
        backofficeTitle.innerText = "Modifica prodotto";
        btnManage.innerText = "EDIT";
        boolean = false;
        getData();
        buttonDelete();
    };
    checkBtnManage();
    formSubmit(boolean);
};

function formSubmit(boolean) {
    btnManage.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(boolean);//QUA ENTRA TRUE
        if (boolean) {
            postData();
        } else {
            putData();
        }
    });

};

async function postData() {
    let product = new Prodotto(title.value, description.value, brand.value, imageUrl.value, parseInt(price.value));
    try {
        await fetch(endPoint, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "authorization": tokenAuth,
                "Content-Type": "application/json",
            }
        });
    } catch (error) {
        console.log("ERROR: " + error);
    }
    formSection.reset();
}

async function getData() {
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "authorization": tokenAuth,
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        singleProduct = data;
        //console.log(singleProduct); ARRIVA l'oggetto desiderato
        printForm(singleProduct);
    } catch (error) {
        console.log("errore: " + error);
    }
};

function printForm(oggetto) {
    title.value = oggetto.name;
    brand.value = oggetto.brand;
    price.value = oggetto.price;
    imageUrl.value = oggetto.imageUrl;
    description.value = oggetto.description;
};

async function putData() {
    let product = new Prodotto(title.value, description.value, brand.value, imageUrl.value, parseInt(price.value));
    try {
        await fetch(url, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                "authorization": tokenAuth,
                "Content-Type": "application/json",
            }
        });
    } catch (error) {

    };

}

function buttonDelete() {
    btnDelete.addEventListener("click", function (e) {
        e.preventDefault();
        let conferma = confirm("Vuoi procedere all'eliminazione del prodotto?");
        if (conferma) {
            let realConferma = confirm("SEI VERAMENTE SICURO DI VOLER CANCELLARE I DATI?");
            if (realConferma) {
                deleteData();
            } else {
                return;
            }
        } else {
            return;
        };
    });
};

async function deleteData() {
    try {
        await fetch(url, {
            method: "DELETE",
            headers: {
                "authorization": tokenAuth,
                "Content-Type": "application/json",
            }
        })
    } catch (error) {
        console.log("errore: " + error);
    }
    window.location = "backoffice.html";
}

function checkBtnManage() {
    formSection.addEventListener("keyup", function () {
        if (title.value != "" && description.value != "" && brand.value != "" && imageUrl.value != "" && price.value != "") {
            console.log("ENABLED")
            btnManage.removeAttribute("disabled");

        } else {
            console.log("DIsabled")
            btnManage.setAttribute("disabled", "true");
        }
    });

}

//SE si sta aggiungendo un elemento il form si resetterà e basta, se il form è nella configurazione "modifica" il reset non azzererà i campi ma riporterà il tutto all'oggetto presente nel db
function resetform() {
    let conferma = confirm("Stai per resettare il form");
    if (conferma) {
        if (boolean) {
            formSection.reset();
        } else {
            getData();
        }
    } else {
        return;
    }
};
