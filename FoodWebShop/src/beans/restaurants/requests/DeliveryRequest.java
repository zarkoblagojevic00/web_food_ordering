package beans.restaurants.requests;

import beans.Entity;
import beans.ecommerce.Order;
import beans.restaurants.RequestStatus;
import beans.users.roles.deliverer.Deliverer;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class DeliveryRequest extends Entity implements ManagerApprovable {
    private Order order;
    private Deliverer deliverer;
    private RequestStatus status;

    public DeliveryRequest() {
        status = RequestStatus.PENDING;
    }

    @Override
    public void approve() {
        status = RequestStatus.APPROVED;
    }

    @Override
    public void reject() {
        status = RequestStatus.REJECTED;
    }

    @Override
    public RequestStatus getRequestStatus() {
        return this.status;
    }

    public Order getOrder() {
        return order;
    }

    public Deliverer getDeliverer() {
        return deliverer;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public boolean belongsToOrder(long orderId) {
        return order.getId() == orderId;
    }

    public boolean belongsToDeliverer(long delivererId) {
        return deliverer.getId() == delivererId;
    }

}
