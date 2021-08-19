package beans.restaurants;

import beans.Entity;
import beans.restaurants.requests.Comment;

import java.util.List;

public class Restaurant extends Entity {
    private String name;
    private RestaurantType type;
    private String logoPath;
    private boolean opened;
    private Location location;
    private List<Product> products;
    private List<Comment> comments;

    public String getName() {
        return name;
    }

    public RestaurantType getType() {
        return type;
    }

    public String getLogoPath() {
        return logoPath;
    }

    public boolean isOpened() {
        return opened;
    }

    public Location getLocation() {
        return location;
    }

    public List<Product> getProducts() {
        return products;
    }

    public List<Comment> getComments() {
        return comments;
    }
}
