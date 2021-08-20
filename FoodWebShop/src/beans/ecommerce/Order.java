package beans.ecommerce;

import beans.Entity;
import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;

import java.util.Date;
import java.util.List;

public class Order extends Entity {
    private String code;
    private List<ShoppingItem> items;
    private Restaurant restaurant;
    private Date creationDate;
    private Customer customer;
    private OrderStatus status;

    public boolean isStatus(OrderStatus status) {
        return this.status.equals(status);
    }
}
