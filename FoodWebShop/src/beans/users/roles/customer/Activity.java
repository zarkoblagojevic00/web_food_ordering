package beans.users.roles.customer;

import beans.Entity;

import java.util.Date;

public class Activity extends Entity {
    private ActivityType type;
    private Date dateOccurred;
    private Customer user;

    public Activity() {

    }

    public Activity(ActivityType type, Customer user) {
        this.type = type;
        this.user = user;
        this.dateOccurred = new Date();
    }

    public ActivityType getType() {
        return type;
    }

    public Date getDateOccurred() {
        return dateOccurred;
    }

    public Customer getUser() {
        return user;
    }

    public boolean isResponsible(long userId) {
        return userId == user.getId();
    }
}
