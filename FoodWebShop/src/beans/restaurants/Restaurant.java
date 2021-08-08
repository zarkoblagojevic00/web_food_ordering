package beans.restaurants;

import beans.restaurants.requests.Comment;

import java.util.List;

public class Restaurant {
    private String name;
    private RestaurantType type;
    private String logoPath;
    private boolean opened;
    private Location location;
    private List<Product> products;
    private List<Comment> comments;
}
