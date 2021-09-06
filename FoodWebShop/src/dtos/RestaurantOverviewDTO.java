package dtos;

import beans.restaurants.Location;
import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;

public class RestaurantOverviewDTO {
    final private long id;
    final private String name;
    final private RestaurantType type;
    final private String logoPath;
    final private boolean opened;
    final private Location location;
    private double averageMark;

    public RestaurantOverviewDTO(Restaurant restaurant) {
        this.id = restaurant.getId();
        this.name = restaurant.getName();
        this.type = restaurant.getType();
        this.logoPath = restaurant.getLogoPath();
        this.opened = restaurant.isOpened();
        this.location = restaurant.getLocation();
    }

    public RestaurantOverviewDTO(Restaurant restaurant, double averageMark) {
        this.id = restaurant.getId();
        this.name = restaurant.getName();
        this.type = restaurant.getType();
        this.logoPath = restaurant.getLogoPath();
        this.opened = restaurant.isOpened();
        this.location = restaurant.getLocation();
        this.averageMark = averageMark;
    }
}
