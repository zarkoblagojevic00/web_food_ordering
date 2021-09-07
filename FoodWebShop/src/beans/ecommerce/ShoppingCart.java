package beans.ecommerce;

import beans.Entity;
import beans.users.base.User;
import beans.users.roles.customer.Customer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class ShoppingCart extends Entity {
    private Collection<ShoppingItem> items;
    private Customer customer;
    private double totalPrice;

    public ShoppingCart() {

    }

    public ShoppingCart(long customerId) {
        customer = new Customer(customerId);
        items = new ArrayList<>();
        totalPrice = 0;
    }

    public ShoppingCart(Collection<ShoppingItem> items) {
        this.items = items;
    }

    public boolean belongsToUser(long userId) {
        return customer.getId() == userId;
    }

    public void add(ShoppingItem shoppingItem) {
        items.add(shoppingItem);
    }

    public Collection<ShoppingItem> getItems() {
        return items;
    }

    public Collection<Long> getItemsIds() {
        return items.stream()
                .map(Entity::getId)
                .collect(Collectors.toList());
    }

    public double getPrice() {
        return items.stream().mapToDouble(ShoppingItem::getPrice).sum();
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ShoppingItem getItemWithProduct(long productId) {
        return items.stream()
                .filter(item -> item.hasProduct(productId))
                .findFirst()
                .orElse(null);
    }

    public void setItems(Collection<ShoppingItem> items) {
        this.items = items;
    }

    public void remove(long itemId) {
        items.removeIf(item -> item.getId() == itemId);
    }
}
