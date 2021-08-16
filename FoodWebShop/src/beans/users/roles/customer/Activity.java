package beans.users.roles.customer;

import beans.Entity;

import java.util.Date;

public class Activity extends Entity {
    private ActivityType type;
    private Date dateOccurred;
    private Customer user;

    public Activity() {

    }

    public Activity(ActivityType type, Date dateOccurred, Customer user) {
        this.type = type;
        this.dateOccurred = dateOccurred;
        this.user = user;
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
