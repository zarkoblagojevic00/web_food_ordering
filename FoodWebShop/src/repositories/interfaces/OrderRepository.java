package repositories.interfaces;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
import dtos.OrderOverviewDTO;
import repositories.interfaces.base.Repository;

import java.util.Collection;

public interface OrderRepository extends Repository<Order> {
    public Collection<Order> getOrdersForRestaurant(long restaurantId);

    public Collection<Order> getOrdersForCustomer(long customerId);

    Collection<Order> getOrdersByStatus(OrderStatus status);
}
