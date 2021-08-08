package beans.ecommerce;

import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;

import java.util.Date;
import java.util.List;

public class Order {
    private String code;
    private List<ShoppingItem> items;
    private Restaurant restaurant;
    private Date creationDate;
    private Customer customer;
    private OrderStatus status;

}
