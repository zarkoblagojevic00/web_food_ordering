package dtos;

import beans.restaurants.Restaurant;
import beans.users.roles.manager.Manager;

public class ManagerOverviewDTO extends UserOverviewDTO {
    final private RestaurantOverviewDTO restaurant;

    public ManagerOverviewDTO(Manager manager) {
        super(manager);
        Restaurant restaurant = manager.getRestaurant();
        this.restaurant = (restaurant == null) ? null : new RestaurantOverviewDTO(restaurant);
    }

    public RestaurantOverviewDTO getRestaurant() {
        return restaurant;
    }
}
