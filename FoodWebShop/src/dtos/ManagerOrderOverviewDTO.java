package dtos;

import beans.ecommerce.ShoppingItem;

import java.util.Collection;

public class ManagerOrderOverviewDTO {
    CustomerDelivererOrderOverviewDTO base;
    // TODO: Should get DeliveryRequests also

    public ManagerOrderOverviewDTO(OrderOverviewDTO order, Collection<ShoppingItem> items) {
        base = new CustomerDelivererOrderOverviewDTO(order, items);
    }
}
