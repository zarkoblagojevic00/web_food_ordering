package repositories.interfaces.base;

import beans.restaurants.requests.DeliveryRequest;

import java.util.Collection;

public interface DeliveryRequestRepository extends Repository<DeliveryRequest>{
    Collection<DeliveryRequest> getRequestsForOrder(long orderId);
}
