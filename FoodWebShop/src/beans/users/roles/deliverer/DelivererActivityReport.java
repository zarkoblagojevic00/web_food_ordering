package beans.users.roles.deliverer;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;

import java.util.ArrayList;
import java.util.Collection;

public class DelivererActivityReport {
    final private long numOfDeliveredOrders;
    final private long numOfInTransportOrders;

    public DelivererActivityReport() {
        this.numOfDeliveredOrders = 0;
        this.numOfInTransportOrders = 0;
    }

    public DelivererActivityReport(Collection<Order> orders) {
        this.numOfDeliveredOrders = getNumOfOrdersWithStatus(orders, OrderStatus.DELIVERED);
        this.numOfInTransportOrders = getNumOfOrdersWithStatus(orders, OrderStatus.IN_TRANSPORT);
    }

    private long getNumOfOrdersWithStatus(Collection<Order> orders, OrderStatus status) {
        return orders.stream()
                .filter(order -> order.isStatus(status))
                .count();
    }


}
