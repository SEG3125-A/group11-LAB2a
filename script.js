function openInfo(evt, tabName) {

	content = document.getElementsByClassName("content");
	for (i = 0; i < content.length; i++) {
		content[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}
	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
    var s1 = document.getElementById(slct1);
    var s2 = document.getElementById(slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, s1.value);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {
			
		var productName = optionArray[i];
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		s2.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = productName;
		label.appendChild(document.createTextNode(productName));
		s2.appendChild(label);
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));    
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is  $" + getTotalPrice(chosenProducts)));
		
}

var products = [
	{
		name: "broccoli",
		vegetarian: true,
		glutenFree: true,
		price: 1.99
	},
	{
		name: "rye bread",
		vegetarian: true,
		glutenFree: false,
		price: 2.35
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		price: 10.00
	},
    {
		name: "raw milk",
		vegetarian: false,
		glutenFree: true,
		price: 5.50
	},
    {
		name: "steak",
		vegetarian: false,
		glutenFree: true,
		price: 30.00
	},
    {
		name: "butter",
		vegetarian: false,
		glutenFree: true,
		price: 8.25
	},
    {
		name: "herring",
		vegetarian: false,
		glutenFree: true,
		price: 5.10
	},
    {
		name: "beans",
		vegetarian: true,
		glutenFree: true,
		price: 3.50
	},
    {
		name: "cabbage",
		vegetarian: true,
		glutenFree: true,
		price: 4.30
	},
    {
		name: "spaghetti",
		vegetarian: true,
		glutenFree: false,
		price: 10.00
	},
    {
		name: "tomatoes",
		vegetarian: true,
		glutenFree: true,
		price: 10.00
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
    let product_price = [];
    let product_concat = [];
	
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "Vegetarian") && (prods[i].vegetarian == true)){
			product_names.push(prods[i].name);
            product_price.push(prods[i].price);
		}
		else if ((restriction == "GlutenFree") && (prods[i].glutenFree == true)){
			product_names.push(prods[i].name);
            product_price.push(prods[i].price);
		}
		else if (restriction == "None"){
			product_names.push(prods[i].name);
            product_price.push(prods[i].price);
		}
	}
    for (let j=0; j<prods.length; j+=1) {
		if ((restriction == "Vegetarian") && (prods[j].vegetarian == true)){
            product_price.push(prods[j].price);
		}
		else if ((restriction == "GlutenFree") && (prods[j].glutenFree == true)){
            product_price.push(prods[j].price);
		}
		else if (restriction == "None"){
            product_price.push(prods[j].price);
		}
	}
    for (let k=0; k<prods.length; k+=1){
            product_concat.push(product_names[k] + "  $" + product_price[k]);
    }
	return product_concat ;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<chosenProducts.length; i+=1) {
		
			totalPrice += chosenProducts[i].price;
		
	}
	return totalPrice;
}
