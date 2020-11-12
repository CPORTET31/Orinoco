
//Fonction permettant de récupérer un paramètre dans l'URL
function $_GET(param) {
	let vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}


//getProductsFromAPI --> Renvoie une liste de produits de type "nameProduct" et les met en page sur index.html
function getProductsFromAPI (nameProduct) {
    fetch ('http://localhost:3000/api/'+ nameProduct).then(function(response) {
        return response.json();
    }).then(function(products){
        products.forEach(product => {
            let divProducts = document.getElementById(nameProduct);
            
            let divProduct = document.createElement("div");
            divProduct.setAttribute("id", product._id);
            divProduct.setAttribute("class", "col-lg-4 col-md-6 mb-4");
    
                let divCard = document.createElement("div");
                divCard.setAttribute("class", "card h-100");
    
                    let img = document.createElement("img");
                    img.setAttribute("class", "card-img-top");
                    img.setAttribute("src", product.imageUrl);
                    img.setAttribute("alt", product.name);
    
                    let divCardBody = document.createElement("div");
                    divCardBody.setAttribute("class", "card-body");
    
                        let h4 = document.createElement("h4");
                        h4.setAttribute("class", "card-title");
    
                            let a = document.createElement("a");
                            a.setAttribute("href", "./product.html?type="+nameProduct+"&id="+product._id);
                            a.textContent = product.name;
    
                        h4.appendChild(a);
    
                        let h5 = document.createElement("h5");
                        h5.textContent = (parseFloat(product.price) / 100) + " €" ;
    
                        let p = document.createElement("p");
                        p.setAttribute("class", "card-text");
                        p.textContent = product.description;
                    
                    divCardBody.appendChild(h4);
                    divCardBody.appendChild(h5);
                    divCardBody.appendChild(p);
    
                divCard.appendChild(img);
                divCard.appendChild(divCardBody);
    
            divProduct.appendChild(divCard);
    
            divProducts.appendChild(divProduct);
        });
    }) ;
}

//getProductFromAPI --> Renvoie le détail d'un produit du type "nameProduct" et d'id "id" et le met en page sur product.html
function getProductFromAPI (nameProduct, id) {
    fetch ('http://localhost:3000/api/'+ nameProduct + "/" + id).then(function(response) {
        return response.json();
    }).then(function(product){

            let divProduct = document.getElementById('product');
    
            let img = document.createElement("img");
            img.setAttribute("class", "card-img-top img-fluid img-custom");
            img.setAttribute("id", "imgProduct");
            img.setAttribute("src", product.imageUrl);
            img.setAttribute("alt", product.name);
    
            let divCardBody = document.createElement("div");
            divCardBody.setAttribute("class", "card-body");
    
                let h3 = document.createElement("h3");
                h3.setAttribute("class", "card-title");
                h3.setAttribute("id", "nameProduct");
                h3.textContent = product.name;

                let pId = document.createElement("p");
                pId.hidden = true;
                pId.setAttribute("id", "idProduct");
                pId.textContent = id;
    
                let h4 = document.createElement("h4");
                h4.setAttribute("id", "priceProduct");
                h4.textContent = (parseFloat(product.price) / 100) + " €" ;
    
                let p = document.createElement("p");
                p.setAttribute("class", "card-text");
                p.textContent = product.description;

                let divDropdown = document.createElement("div");
                divDropdown.setAttribute("class", "dropdown");
                    let divDropdownButton = document.createElement("button");
                    divDropdownButton.setAttribute("id", "attributeSelected");
                    divDropdownButton.setAttribute("class", "dropbtn");
                    let divDropdownContent = document.createElement("div");
                    divDropdownContent.setAttribute("class", "dropdown-content");
                    if(nameProduct == 'teddies') {
                        divDropdownButton.textContent = "Couleurs ";
                        for(let i = 0; i < product.colors.length; i++) {
                            let aDropdownContentAttribute = document.createElement("a");
                            aDropdownContentAttribute.setAttribute("onClick", "document.getElementById('attributeSelected').textContent = this.textContent;");
                            aDropdownContentAttribute.textContent = product.colors[i];
                            divDropdownContent.appendChild(aDropdownContentAttribute);
                        }
                        document.getElementById('addButton').hidden = false;
                    } 
/*                    
                    else if(nameProduct == 'cameras') {
                        divDropdownButton.textContent = "Lentilles ";
                        for(let i = 0; i < product.lenses.length; i++) {
                            let aDropdownContentAttribute = document.createElement("a");
                            aDropdownContentAttribute.setAttribute("onClick", "document.getElementById('attributeSelected').textContent = this.textContent;");
                            aDropdownContentAttribute.textContent = product.lenses[i];
                            divDropdownContent.appendChild(aDropdownContentAttribute);
                        }
                    } else if(nameProduct == 'furniture') {
                        divDropdownButton.textContent = "Vernis ";
                        for(let i = 0; i < product.varnish.length; i++) {
                            let aDropdownContentAttribute = document.createElement("a");
                            aDropdownContentAttribute.setAttribute("onClick", "document.getElementById('attributeSelected').textContent = this.textContent;");
                            aDropdownContentAttribute.textContent = product.varnish[i];
                            divDropdownContent.appendChild(aDropdownContentAttribute);
                        }
                    }
*/
                divDropdown.appendChild(divDropdownButton);
                divDropdown.appendChild(divDropdownContent);
    
            divCardBody.appendChild(h3);
            divCardBody.appendChild(pId);
            divCardBody.appendChild(h4);
            divCardBody.appendChild(p);
            divCardBody.appendChild(divDropdown);
    
        divProduct.appendChild(img);
        divProduct.appendChild(divCardBody);

    }) ;
}

// addProductToPanier --> Ajoute le produit sélectionné au localStorage depuis la page product.html
function addProductToPanier() {

    if(document.getElementById('attributeSelected').textContent == "Couleurs ") {
        alert("Veuillez selectionner une couleur avant de pouvoir ajouter le produit au panier.");
    } else {
        let panier;
        if(localStorage.getItem("panier")) {
            panier = JSON.parse(localStorage.getItem("panier"));
        } else {
            panier = [];
        }

        let id = document.getElementById("idProduct").textContent;
        let name = document.getElementById("nameProduct").textContent;
        let price = document.getElementById("priceProduct").textContent;
        let color = document.getElementById('attributeSelected').textContent;
        let img = document.getElementById("imgProduct").getAttribute("src");
        panier.push({id: id, name : name, price : price, color: color, img: img});

        localStorage.setItem("panier", JSON.stringify(panier));

        setSizePanierLink();
    }
}
// deleteProductToPanier --> Supprime le produit sélectionné du localStorage depuis la page panier.html
function deleteProductToPanier(indice) {
    let panier = JSON.parse(localStorage.getItem("panier"));
    panier.splice(indice, 1);
    localStorage.setItem("panier", JSON.stringify(panier));

    setPanierPage();
    setSizePanierLink();
}
// redirectToPanier --> Redirige vers la page panier si elle n'est pas vide, sinon affiche une alerte.
function redirectToPanier() {
    if(localStorage.getItem('panier')) {
        if(JSON.parse(localStorage.getItem('panier')).length > 0) {
            document.location.href="panier.html";
            return;
        }
    }
    alert("Le panier est vide. Veuillez ajouter un produit avant de le consulter.");
}
// setSizePanierLink --> Initialise et met à jour le nombre d'article dans le panier visible dans le lien "Panier" du menu ("linkToPanier" id)
function setSizePanierLink() {
    if(localStorage.getItem('panier')) {
        document.getElementById('linkToPanier').textContent = "Panier (" + JSON.parse(localStorage.getItem('panier')).length + ")";
    } else {
        document.getElementById('linkToPanier').textContent = "Panier (0)";
    }
}
// setPanierPage --> Initialise et met à jour les articles dans la page panier.html
function setPanierPage() {
    if(!localStorage.getItem('panier')) {
        document.location.href="index.html";
        return;
    }
    if(JSON.parse(localStorage.getItem('panier')).length == 0) {
        document.location.href="index.html";
        return;
    }

    let panier = JSON.parse(localStorage.getItem("panier"));
    let total = 0;
    let listProduct = document.getElementById('listProduct');
    listProduct.innerHTML = "";
    for(let i = 0; i < panier.length; i++) {
        let lignePanier = document.createElement("tr");
            let imgCasePanier = document.createElement("td");
                let imgPanier = document.createElement("img");
                imgPanier.setAttribute("class", "small-img-custom");
                imgPanier.setAttribute("src", panier[i].img);
                imgPanier.setAttribute("alt", panier[i].name);
            imgCasePanier.appendChild(imgPanier);
            let nameCasePanier = document.createElement("td");
            nameCasePanier.textContent = panier[i].name + " (" + panier[i].color + ")";
            let priceCasePanier = document.createElement("td");
            priceCasePanier.setAttribute("class", "text-right");
            priceCasePanier.textContent = panier[i].price;
            let deleteButtonCasePanier = document.createElement("td");
            deleteButtonCasePanier.setAttribute("class", "text-right");
                let deleteButtonPanier = document.createElement("button");
                deleteButtonPanier.setAttribute("class", "btn btn-sm btn-danger");
                deleteButtonPanier.setAttribute("onclick", "deleteProductToPanier("+i+")");
                    let iconDeleteButtonPanier = document.createElement("i");
                    iconDeleteButtonPanier.setAttribute("class", "fa fa-trash");
                deleteButtonPanier.appendChild(iconDeleteButtonPanier);
            deleteButtonCasePanier.appendChild(deleteButtonPanier);
        lignePanier.appendChild(imgCasePanier);
        lignePanier.appendChild(nameCasePanier);
        lignePanier.appendChild(priceCasePanier);
        lignePanier.appendChild(deleteButtonCasePanier);

        listProduct.appendChild(lignePanier);

        total += parseFloat(panier[i].price);
    }
    document.getElementById('totalPrice').textContent = total + " €";
}


//commandTeddiesFromAPI --> Renvoie l'id de la commande
function commandTeddiesFromAPI() {
    let panier = JSON.parse(localStorage.getItem("panier"));
    let products = [];
    for(let i = 0; i < panier.length; i++) {
        products.push(panier[i].id);
    }
    let data = {
        "contact":{
           "firstName": document.getElementById("firstNameInput")["value"],
           "lastName": document.getElementById("lastNameInput")["value"],
           "address": document.getElementById("addressInput")["value"],
           "city": document.getElementById("cityInput")["value"],
           "email": document.getElementById("emailInput")["value"]
        },
        "products": products
    };

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch ('http://localhost:3000/api/teddies/order', {method: "POST", headers: myHeaders, body: JSON.stringify(data)}).then(function(response) {   
        return response.json();
    }).then(function(order){
        localStorage.clear();
        localStorage.setItem("order", JSON.stringify(order));
        document.location.href="confirm.html";
    }) ;
}
//setConfirmPage --> Initialise la page confirm.html avec les infos de retour de commande
function setConfirmPage() {
    if(localStorage.getItem('order')) {
        let order = JSON.parse(localStorage.getItem('order'));
        document.getElementById('nameClient').textContent = order.contact.firstName + " " + order.contact.lastName;
        document.getElementById('idOrder').textContent = order.orderId;
    }
}