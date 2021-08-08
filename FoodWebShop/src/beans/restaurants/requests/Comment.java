package beans.restaurants.requests;

import beans.restaurants.RequestStatus;
import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class Comment implements ManagerApprovable {
    private Customer author;
    private Restaurant restaurant;
    private String content;
    private int mark;
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
