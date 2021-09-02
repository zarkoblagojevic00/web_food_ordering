package dtos;

import beans.ecommerce.ShoppingItem;

import java.util.Collection;

public class CustomerDelivererOrderOverviewDTO {
    final private OrderOverviewDTO order;
    final private Collection<ShoppingItem> items;

    public CustomerDelivererOrderOverviewDTO(OrderOverviewDTO order, Collection<ShoppingItem> items) {
        this.order = order;
        this.items = items;
    }
}
