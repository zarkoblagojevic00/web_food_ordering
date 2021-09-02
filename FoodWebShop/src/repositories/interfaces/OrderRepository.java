package repositories.interfaces;

import beans.ecommerce.Order;
import repositories.interfaces.base.Repository;

import java.util.Collection;

public interface OrderRepository extends Repository<Order> {
    public Collection<Order> getOrdersForRestaurant(long restaurantId);
}
