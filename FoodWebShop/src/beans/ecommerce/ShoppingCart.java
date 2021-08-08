package beans.ecommerce;

import beans.users.roles.customer.Customer;

import java.util.List;

public class ShoppingCart {
    private List<ShoppingItem> items;
    private Customer customer;
    private double totalPrice;
}
