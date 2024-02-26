// Recuperation des pieces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

//Recuperation de la section fiches
const sectionFiches = document.querySelector(".fiches");
document.querySelector(".fiches").innerHTML = "";

function generePieces(pieces){
//Afficher les pieces
    for (const piece of pieces) {

        //Creation des elements article, img, h2, p
        const pieceElement = document.createElement("article");
        const imgElement = document.createElement("img");
        imgElement.src = piece.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = piece.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix : ${piece.prix} € (${piece.prix < 35 ? "€" : "€€"})`;
        document.body.appendChild(prixElement);
        const categorieElement = document.createElement("p");
        categorieElement.innerText = piece.categorie ?? "(Aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = piece.description ?? "(Aucune description)";
        const stockElement = document.createElement("p");
        stockElement.innerText = piece.disponnibilite ? "En stock" : "Rupture de stock";
        //Ajout des elements dans la section fiches
        sectionFiches.appendChild(pieceElement);
        //Ajout des elements dans l'article
        pieceElement.appendChild(imgElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }
}
generePieces(pieces);

// Tri des pieces
const boutonTrierAsc = document.querySelector(".btn-trier-asc");
boutonTrierAsc.innerHTML = "Trier par prix croissant";
boutonTrierAsc.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        //Croissant
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesOrdonnees);
});
boutonTrierAsc.appendChild(document.createElement("br"));

const boutonTrierDesc = document.querySelector(".btn-trier-desc");
boutonTrierDesc.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        //Decroissant
        return b.prix - a.prix;
    });
    console.log(piecesOrdonnees);
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesOrdonnees);
});
boutonTrierDesc.appendChild(document.createElement("br"));

// Filtrage des pieces
const boutonFilter = document.querySelector(".btn-filter");
boutonFilter.addEventListener("click", function() {
    const piecesFilter = pieces.filter(function(piece){
        //Pieces de moins de 35€
        return piece.prix <=35;
    });
    console.log(piecesFilter);
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesFilter);
});
boutonFilter.appendChild(document.createElement("br"));

const boutonDescription = document.querySelector(".btn-desc");
boutonDescription.addEventListener("click", function() {
    const piecesDescription = pieces.filter(function(piece){
        //Description disponible
        return piece.description;
    });
    console.log(piecesDescription);
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesDescription);
});
boutonDescription.appendChild(document.createElement("br"));

const filtreSection = document.querySelector(".filtres");
const inputRange = document.createElement("input");
inputRange.innerText = "Prix : " + inputRange.value + "€";
inputRange.type="range";
inputRange.min = 0;
inputRange.max = 60;
inputRange.step = 5
inputRange.name = "prix";
filtreSection.appendChild(inputRange);

inputRange.addEventListener("input", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputRange.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    generePieces(piecesFiltrees);
});

filtreSection.appendChild(document.createElement("br"));

//Affichage la listes des noms des pieces
const noms = pieces.map(function(piece){
    return piece.nom;
});
console.log(noms);
for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
console.log(noms);
//Création de liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(const nom of noms){
    //Création de l'élément li
    const nomElement = document.createElement('li');
    //Ajout du nom dans le texte de l'élément li
    nomElement.innerText = nom;
    //Ajout de l'élément li à la liste ul
    abordablesElements.appendChild(nomElement);
}
//Création de l'entête
const abordablesHeader = document.createElement('h2');
abordablesHeader.innerText = "Pieces abordables :"
const abordables = document.querySelector('.abordables');
sectionFiches.appendChild(abordables);
abordables.appendChild(abordablesHeader);
abordables.appendChild(abordablesElements);

//Affichage de la liste des pieces en stock
const names = pieces.map(function(piece){
    return piece.nom;
});
const prices = pieces.map(function(piece){
    return piece.prix;
});

for(let i = pieces.length - 1; i >= 0; i--){
    if(pieces.disponibilite[i] == false){
        names.splice(i,1);
        prices.splice(i,1);
    }
    if(names[i] === "Balai d'essuie-glace"){
        names.splice(i,1);
        prices.splice(i,1);
    }
}
console.log(names);
console.log(prices);

const enStockElements = document.createElement('ul');
for(let i = 0; i < names.length; i++){
    const enStockElement = document.createElement('li');
    enStockElement.innerText = `${names[i]} : ${prices[i]} €`;
    enStockElements.appendChild(enStockElement);
}
const enStockHeader = document.createElement('h2');
enStockHeader.innerText = "Pieces en stock :"
const enStock = document.querySelector('.disponible');
sectionFiches.appendChild(enStock);
enStock.appendChild(enStockHeader);
enStock.appendChild(enStockElements);
