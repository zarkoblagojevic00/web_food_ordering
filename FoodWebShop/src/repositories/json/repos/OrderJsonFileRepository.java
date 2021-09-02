package repositories.json.repos;

import beans.ecommerce.Order;
import repositories.interfaces.OrderRepository;
import repositories.json.repos.base.JsonFileRepository;

import java.util.Collection;
import java.util.stream.Collectors;

public class OrderJsonFileRepository extends JsonFileRepository<Order> implements OrderRepository {
    public OrderJsonFileRepository() {
        super(Order.class);
    }

    @Override
    public Collection<Order> getOrdersForRestaurant(long restaurantId) {
        return getAll().stream()
                .filter(order -> order.belongsTo(restaurantId))
                .collect(Collectors.toList());
    }
}
