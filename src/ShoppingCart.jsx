import React, { Component } from "react";
import Product from "./mainlaylout/Product";

export default class ShoppingCart extends Component {
  state = {
    products: [],
    rawmaterials: [],
  };

  render() {
    return (
      <div>
        <h4>Shopping Cart</h4>

        <div className="row">
          {this.state.products.map((prod) => {
            return (
              <Product
                key={prod.id}
                product={prod}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="btn btn-primary">Buy Now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }

  handleIncrement = (product, maxValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;
      this.setState({ product: allProducts });
    }
  };

  handleDecrement = (product, minValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;
      this.setState({ product: allProducts });
    }
  };

  handleDelete = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    allProducts.splice(index, 1);

    this.setState({ products: allProducts });
  };

  componentDidMount = async () => {
    document.title = "ShoppingCart - LazaDaks";

    var response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });
    var prods = await response.json();

    console.log(prods);

    this.setState({ products: prods });
  };

  // componentDidMount() {

  //     var promise = fetch("https://localhost:44342/api/RawMaterial/GetAllActiveRawMaterials", {method : "GET"});
  //     promise.then((response) => {console.log(response);

  //     var promise2 = response.json();
  //     promise2.then((prods) => { console.log(prods);

  //       this.setState({rawmaterials : prods});

  //       });
  //   });
  // }
}
