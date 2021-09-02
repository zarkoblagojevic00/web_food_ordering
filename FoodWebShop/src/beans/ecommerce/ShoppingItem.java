package beans.ecommerce;

import beans.Entity;
import beans.restaurants.Product;

public class ShoppingItem extends Entity {
    private Product product;
    private int quantity;

    public ShoppingItem() {

    }

    public ShoppingItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public ShoppingItem(Product product, ShoppingItem shoppingItem) {
        super(shoppingItem.getId());
        this.product = product;
        this.quantity = shoppingItem.quantity;
    }

    public Product getProduct() {
        return product;
    }

    public int getQuantity() {
        return quantity;
    }
}
