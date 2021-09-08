package beans.users.roles.customer;

import beans.ecommerce.ShoppingCart;
import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;

public class Customer extends User {
    private int pointsEarned;
    private CustomerTypeName type;
    private ShoppingCart cart;

    public Customer() {
        super(Role.CUSTOMER);
        pointsEarned = 0;
        type = CustomerTypeName.BRONZE;
    }

    public Customer(Credentials credentials, PersonalData personalData) {
        super(credentials, personalData, Role.CUSTOMER);
        pointsEarned = 0;
        type = CustomerTypeName.BRONZE;
    }

    public Customer(long customerId) {
        super(Role.CUSTOMER, customerId);
    }

    public ShoppingCart getCart() {
        return cart;
    }

    public int getPointsEarned() {
        return pointsEarned;
    }

    public CustomerTypeName getCustomerTypeName() {
        return type;
    }

    public void setCustomerTypeName(CustomerTypeName type) {
        this.type = type;
    }

    public boolean isCustomerType(CustomerTypeName type) {
        return this.type.equals(type);
    }

    public void addPointsEarned(int newPointsEarned) {
        pointsEarned += newPointsEarned;
        if (pointsEarned < 0) {
            pointsEarned = 0;
        }
    }
}
