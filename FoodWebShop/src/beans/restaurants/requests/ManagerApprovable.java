package beans.restaurants.requests;

import beans.restaurants.RequestStatus;

public interface ManagerApprovable {
    public void approve();
    public void reject();
    public RequestStatus getRequestStatus();
}
