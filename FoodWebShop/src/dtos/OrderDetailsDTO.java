package dtos;

import beans.ecommerce.ShoppingItem;

import java.util.Collection;

public class OrderDetailsDTO {
    CustomerDelivererOrderOverviewDTO base;
    // TODO: Should get DeliveryRequests also

    public OrderDetailsDTO(OrderOverviewDTO order, Collection<ShoppingItem> items) {
        base = new CustomerDelivererOrderOverviewDTO(order, items);
    }
}
