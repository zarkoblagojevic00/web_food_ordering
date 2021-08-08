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
}
