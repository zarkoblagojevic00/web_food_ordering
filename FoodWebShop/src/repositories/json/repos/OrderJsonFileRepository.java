package repositories.json.repos;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
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
                .filter(order -> order.belongsToRestaurant(restaurantId))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<Order> getOrdersForCustomer(long customerId) {
        return getAll().stream()
                .filter(order -> order.belongsToCustomer(customerId))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<Order> getOrdersByStatus(OrderStatus status) {
        return getAll().stream()
                .filter(order -> order.isStatus(status))
                .collect(Collectors.toList());
    }
}
