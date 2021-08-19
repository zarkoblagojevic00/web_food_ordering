package dtos;

import beans.restaurants.Location;
import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;

public class RestaurantOverviewDTO {
    final private String name;
    final private RestaurantType type;
    final private String logoPath;
    final private boolean opened;
    final private Location location;

    public RestaurantOverviewDTO(Restaurant restaurant) {
        this.name = restaurant.getName();
        this.type = restaurant.getType();
        this.logoPath = restaurant.getLogoPath();
        this.opened = restaurant.isOpened();
        this.location = restaurant.getLocation();
    }
}
