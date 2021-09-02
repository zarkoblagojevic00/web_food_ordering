package beans.ecommerce;

import beans.Entity;
import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;

import java.util.*;
import java.util.stream.Collectors;

public class Order extends Entity {
    private String code;
    private Collection<ShoppingItem> items;
    private Restaurant restaurant;
    private Date creationDate;
    private Customer customer;
    private double totalPrice;
    private OrderStatus status;

    public Order() {

    }

    public Order(long restaurantId, Order newOrder, Collection<ShoppingItem> savedItems) {
        code = generateRandomAlphanumericString(10);
        items = savedItems;
        restaurant = new Restaurant(restaurantId);
        creationDate = new Date();
        customer = newOrder.customer;
        totalPrice = newOrder.totalPrice;
        status = OrderStatus.PROCESSING;
    }

    public String getCode() {
        return code;
    }

    public Collection<ShoppingItem> getItems() {
        return items;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public boolean isStatus(OrderStatus status) {
        return this.status == status;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public boolean belongsTo(long restaurantId) {
        return restaurant.getId() == restaurantId;
    }

    private String generateRandomAlphanumericString(long length) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public Collection<Long> getItemsIds() {
        return items.stream().map(Entity::getId).collect(Collectors.toList());
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
