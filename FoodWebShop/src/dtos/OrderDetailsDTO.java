package dtos;

import beans.ecommerce.ShoppingItem;

import java.util.Collection;

public class OrderDetailsDTO {
    private final CustomerDelivererOrderOverviewDTO base;
    private final Collection<DeliveryRequestDTO> deliveryRequests;

    public OrderDetailsDTO(OrderOverviewDTO order, Collection<ShoppingItem> items, Collection<DeliveryRequestDTO> deliveryRequestsForOrder) {
        base = new CustomerDelivererOrderOverviewDTO(order, items);
        deliveryRequests = deliveryRequestsForOrder;
    }
}
