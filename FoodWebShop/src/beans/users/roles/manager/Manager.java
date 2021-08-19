package beans.users.roles.manager;

import beans.restaurants.Restaurant;
import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;

public class Manager extends User {
    private Restaurant restaurant;

    public Manager() {
        super(Role.MANAGER);
    }

    public Manager(Credentials credentials, PersonalData personalData) {
        super(credentials, personalData, Role.MANAGER);
    }

    public Restaurant getRestaurant() {
        return this.restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
}
