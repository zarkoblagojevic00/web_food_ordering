package dtos;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;
import beans.users.roles.customer.Customer;
import beans.users.roles.customer.CustomerTypeName;

import java.util.Date;

public class OrderOverviewDTO {
    final private long id;
    final private String code;
    final private Date creationDate;
    final private String customerFullName;
    final private CustomerTypeName customerType;
    final private double totalPrice;
    final private OrderStatus status;
    final private RestaurantOverviewDTO restaurant;

    public OrderOverviewDTO(Order order, Customer customer, Restaurant restaurant) {
        id = order.getId();
        code = order.getCode();
        creationDate = order.getCreationDate();
        customerFullName = customer.getFirstName() + " "  + customer.getLastName();
        customerType = customer.getCustomerTypeName();
        totalPrice = order.getTotalPrice();
        status = order.getStatus();
        this.restaurant = new RestaurantOverviewDTO(restaurant);
    }
}
