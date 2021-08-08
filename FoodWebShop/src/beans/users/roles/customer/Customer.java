package beans.users.roles.customer;

import beans.ecommerce.ShoppingCart;
import beans.users.base.Credentials;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.base.User;

public class Customer extends User {
    private CustomerType type;
    private ShoppingCart cart;

    public Customer() {
        super(Role.CUSTOMER);
    }

    public Customer(Credentials credentials, PersonalData personalData) {
        super(credentials, personalData, Role.CUSTOMER);
    }

    public CustomerType getType() {
        return type;
    }

    public void setType(CustomerType type) {
        this.type = type;
    }

    public ShoppingCart getCart() {
        return cart;
    }
}
