// Tableau d'objets contenant les données des produits 
// ========= Produits ========= 
// La constante produit gere un tableau contenant les produits offerts
const products = [
    {
      id: 1,
      name: "Mythic Plus Keys",
      price: "1 gold",
      description: "Mythic Plus Keys from +2 to +15"
    },
    {
      id: 2,
      name: "Anurelos Flames Guidance",
      price: "7.000.000 gold",
      description: "Mythic Fyrakk Mount, Guaranteed Drop"
    },
    {
      id: 3,
      name: "Gladiator",
      price: "25.000.000 gold",
      description: "Gladiator Title unlock"
    }
  ];
  
  // ================ Fonctions =================
 // Fonction pour générer la liste des produits dans le site web. 
 // On va en premier lieu créer la liste de produit avec une boucle foreach qui va chercher les produits pour en faire une liste
 // On ajoute ensuite le contenu HTML de chaque prroduit (image, nom du produit, prix ainsi qu'une description du servcice offert)
 // On ajoute ensuite l'évènement au clic à l'élément qui va afficher les informations sous le détail du produit a droite (gérer par une seconde fonction)
 // J'ai ajouter un console.log pour valider que la liste de produit est généré correctement
function generateProductList() {
    const productList = document.getElementById('product-list');
  
    if (!productList) {
      console.error('Element with id "product-list" not found.');
      return;
    }
  
    products.forEach(product => {
      // Créer un élément de liste pour chaque produit
      const listItem = document.createElement('li');
      listItem.id = `product-${product.id}`;
  
      // Générer le chemin de l'image
      const imagePath = `../../assets/img/produits/${product.name.replace(/\s+/g, '-').toLowerCase()}.png`;
  
      // Ajouter le contenu HTML pour chaque produit
      listItem.innerHTML = `
        <img src="../../assets/img/${imagePath}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Prix: ${product.price}</p>
        <p>Description: ${product.description}</p>
      `;
  
      // Ajouter un événement de clic à l'élément de liste
      listItem.addEventListener('click', () => {
        showProductDetail(product.id);
      });
  
     // Ajouter l'élément de liste à la liste de produits
    productList.appendChild(listItem);
});
console.log('Product list generated successfully.');
}

// Fonction pour afficher les détails du produit
// Cette fonction va amener les détails du produits à droite de la page quand on clique sur un produit en question
// On met aussi en évidence l'élément cliqué en ajoutant une bordure autour du produit cliquer
// Dans le cas qu'aucun produit n'est sélectionné, la section Details du Produit reste vide.
function showProductDetail(productId) {
const product = products.find(p => p.id === productId);
if (!product) {
    productDetailSection.style.display = 'none'; // Masquer la section si aucun produit
    return;
  }

// Mettre à jour le contenu de la section aside
const productDetailContent = document.getElementById('product-detail-content');
productDetailContent.innerHTML = `
  <h3>${product.name}</h3>
  <p>Prix: ${product.price}</p>
  <p>Description: ${product.description}</p>
`;

// Mettre en évidence l'élément cliqué
const listItems = document.querySelectorAll('.product-grid li');
listItems.forEach(item => {
  item.classList.remove('highlight');
});
document.getElementById(`product-${product.id}`).classList.add('highlight');
}

// Appeler la fonction pour générer la liste des produits
generateProductList();

// Cette fonction va gerer les options de filtre sur le site directement. 
// 4 options de filtre est offert soit : Alphabétique ascendant (A à Z), alphabétique descendant(Z à A), par prix croissant et par prix décroissant
// On va regénérer la liste de produit une fois le filtre choisi via la fonction regenerateProductList en dessous
function sortProducts(criteria) {
    let sortedProducts;
  
    switch (criteria) {
      case 'alpha-asc':
        sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alpha-desc':
        sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedProducts = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        sortedProducts = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        return;
    }
  
    // Regénérer la liste des produits avec l'ordre trié
    regenerateProductList(sortedProducts);
  }
  
  // Fonction pour régénérer la liste des produits
  function regenerateProductList(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Vider la liste avant de la remplir
  
    productsToDisplay.forEach(product => {
      const listItem = document.createElement('li');
      listItem.id = `product-${product.id}`;
  
      const imagePath = `assets/img/${product.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      listItem.innerHTML = `
        <img src="${imagePath}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Prix: ${product.price}</p>
        <p>Description: ${product.description}</p>
      `;
  
      listItem.addEventListener('click', () => {
        showProductDetail(product.id);
      });
  
      productList.appendChild(listItem);
    });
  }
  
  // Appeler la fonction pour générer la liste des produits au chargement
  generateProductList();
  
  // Fonction pour trier et filtrer les produits
  function sortProducts(criteria) {
    let sortedProducts;
  
    switch (criteria) {
      case 'alpha-asc':
        sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alpha-desc':
        sortedProducts = products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sortedProducts = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        sortedProducts = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        return;
    }
  
    // Regénérer la liste des produits avec l'ordre trié
    regenerateProductList(sortedProducts);
  }
  
  // Fonction pour régénérer la liste des produits
  function regenerateProductList(productsToDisplay) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Vider la liste avant de la remplir
  
    productsToDisplay.forEach(product => {
      const listItem = document.createElement('li');
      listItem.id = `product-${product.id}`;
  
      const imagePath = `assets/img/${product.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      listItem.innerHTML = `
        <img src="${imagePath}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Prix: ${product.price}</p>
        <p>Description: ${product.description}</p>
      `;
  
      listItem.addEventListener('click', () => {
        showProductDetail(product.id);
      });
  
      productList.appendChild(listItem);
    });
  }
  
  // Appeler la fonction pour générer la liste des produits au chargement
  generateProductList();