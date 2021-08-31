package beans.restaurants;

import beans.Entity;

public class Product extends Entity {
    private String name;
    private double price;
    private ProductType type;
    private Restaurant restaurant;
    private double portion;
    private String description;
    private String picturePath;

    public Product() {
        super();
    }

    public Product(Product newProduct, String picturePath, long restaurantId) {
        this.name = newProduct.name;
        this.price = newProduct.price;
        this.type = newProduct.type;
        this.portion = newProduct.portion;
        this.description = newProduct.description;
        this.picturePath = picturePath;
        this.restaurant = new Restaurant(restaurantId);

    }

    public boolean belongsTo(long restaurantId) {
        return restaurant.getId() == restaurantId;
    }

    public String getName() {
        return this.name;
    }
}
