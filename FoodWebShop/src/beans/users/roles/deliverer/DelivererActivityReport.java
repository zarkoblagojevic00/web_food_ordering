package beans.users.roles.deliverer;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;

import java.util.ArrayList;
import java.util.Collection;

public class DelivererActivityReport {
    final private long numOfDeliveredOrders;
    final private long numOfInTransportOrders;
    final private Collection<Order> deliverersOrders;

    public DelivererActivityReport() {
        this.numOfDeliveredOrders = 0;
        this.numOfInTransportOrders = 0;
        this.deliverersOrders = new ArrayList<>();
    }

    public DelivererActivityReport(Collection<Order> orders) {
        this.deliverersOrders = orders;
        this.numOfDeliveredOrders = getNumOfOrdersWithStatus(OrderStatus.DELIVERED);
        this.numOfInTransportOrders = getNumOfOrdersWithStatus(OrderStatus.IN_TRANSPORT);
    }

    private long getNumOfOrdersWithStatus(OrderStatus status) {
        return deliverersOrders.stream()
                .filter(order -> order.isStatus(status))
                .count();
    }


}
