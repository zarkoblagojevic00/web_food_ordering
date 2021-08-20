package beans.users.roles.deliverer;

import beans.ecommerce.Order;
import beans.restaurants.requests.DeliveryRequest;
import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;

import java.util.ArrayList;
import java.util.List;

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
}
