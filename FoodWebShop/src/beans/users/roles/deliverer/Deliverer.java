package beans.users.roles.deliverer;

import beans.restaurants.requests.DeliveryRequest;
import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;
import org.glassfish.jersey.model.internal.RankedComparator;

import java.util.List;

public class Deliverer extends User {
    List<RankedComparator.Order> orders;
    List<DeliveryRequest> deliveryRequests;

    public Deliverer() {
        super(Role.DELIVERER);
    }

    public Deliverer(Credentials credentials, PersonalData personalData) {
        super(credentials, personalData, Role.DELIVERER);
    }
}
