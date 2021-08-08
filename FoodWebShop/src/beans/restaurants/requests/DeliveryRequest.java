package beans.restaurants.requests;

import beans.ecommerce.Order;
import beans.restaurants.RequestStatus;
import beans.users.roles.deliverer.Deliverer;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class DeliveryRequest implements ManagerApprovable {
    private Order order;
    private Deliverer deliverer;
    private RequestStatus status;

    @Override
    public void approve() {
        throw new NotImplementedException();
    }

    @Override
    public void reject() {
        throw new NotImplementedException();
    }

    @Override
    public RequestStatus getRequestStatus() {
        return this.status;
    }
}
