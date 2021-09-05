package beans.users.roles.deliverer;

import beans.Entity;
import beans.ecommerce.Order;
import beans.restaurants.requests.DeliveryRequest;
import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class Deliverer extends User {
    List<Order> orders;
    List<DeliveryRequest> deliveryRequests;

    public Deliverer() {
        super(Role.DELIVERER);
        initCollections();
    }

    public Deliverer(Credentials credentials, PersonalData personalData) {
        super(credentials, personalData, Role.DELIVERER);
        initCollections();
    }

    public List<Order> getOrders() {
        return orders;
    }

    public List<DeliveryRequest> getDeliveryRequests() {
        return deliveryRequests;
    }

    private void initCollections() {
        this.orders = new ArrayList<>();
        this.deliveryRequests = new ArrayList<>();
    }

    public Collection<Long> getOrdersIds () {
        return orders.stream()
                .map(Entity::getId)
                .collect(Collectors.toList());
    }

    public Collection<Long> getDeliveryRequestIds () {
        return deliveryRequests.stream()
                .map(Entity::getId)
                .collect(Collectors.toList());
    }

    public void addRequest(DeliveryRequest saved) {
        deliveryRequests.add(saved);
    }

    public void addOrder(Order order) {
        orders.add(order);
    }
}
