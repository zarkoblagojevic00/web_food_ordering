package beans.restaurants.requests;

import beans.Entity;
import beans.restaurants.RequestStatus;
import beans.restaurants.Restaurant;
import beans.users.roles.customer.Customer;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class Comment extends Entity implements ManagerApprovable {
    private Customer author;
    private Restaurant restaurant;
    private String content;
    private int mark;
    private RequestStatus status;

    public Comment() {

    }

    public Comment(long restaurantId, Comment comment) {
        author = comment.author;
        restaurant = new Restaurant(restaurantId);
        content = comment.content;
        mark = comment.mark;
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

    public boolean belongsTo(long restaurantId) {
        return restaurantId == restaurant.getId();
    }

    public Customer getAuthor() {
        return author;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public String getContent() {
        return content;
    }

    public int getMark() {
        return mark;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public boolean isStatus(RequestStatus status) {
        return this.status == status;
    }
}
