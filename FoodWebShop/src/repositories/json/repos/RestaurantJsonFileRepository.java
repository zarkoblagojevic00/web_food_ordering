package repositories.json.repos;

import beans.restaurants.Restaurant;
import repositories.interfaces.RestaurantRepository;
import repositories.json.repos.base.JsonFileRepository;

public class RestaurantJsonFileRepository extends JsonFileRepository<Restaurant> implements RestaurantRepository {
    public RestaurantJsonFileRepository() {
        super(Restaurant.class);
    }
}
