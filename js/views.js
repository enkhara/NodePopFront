

export const productView = (product) => {
    return `<div class="image">
        <img src=${product.image}  alt="">
        </div>
        <div class="product-info">
        <h2 class="product-price">${product.price} €</h2>
        <p class="product-name"> ${product.name} </p>
        <p class="product-option">${product.transactionType} </p>
        </div>
        <div class="product-tags">
        <p class="tag">${product.tags} </p>
        </div>`;
}

export const errorView = (errorMessage) => {
    return ` <div class="error-window">
                <button class="error-button">x</button>
                <h1 class="error-title">Warning</h1>
                <p class="error-message">${errorMessage}</p>
            </div>`; 
}

export const noneProductsView = () => {
    return `
            <h1 class="all-sale">¡¡Todo vendido!!</h1>
            <h2 class= "add-products">Añade tus productos</h2>
            <button class= "button-add">+</button>
            `;
}
export const oneProductView = (product) => {
    return`<div class="image">
        <img src=${product.image}  alt="">
        </div>
        <h2 class="product-price">${product.price} €</h2>
        <p class="product-name"> ${product.name} </p>
        <p class="product-option">${product.transactionType} </p>
        <div class="product-tags">
        <p class="tag">${product.tags} </p>
        </div>`;
}
export const productMissingView = () =>{
    return` <h1 class="all-sale">¡¡ Oooopsss!!</h1>
            <h2 class= "add-products">Este producto ya no existe</h2>
            <a href="/index.html" class="button-missingProduct">Volver a inicio</a>
            `;
}