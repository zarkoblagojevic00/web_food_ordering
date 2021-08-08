package beans.users.roles.customer;

import java.util.Arrays;
import java.util.List;

public class CustomerTypeFinder {
    List<CustomerType> customerTypes;

    public CustomerTypeFinder() {
        initializeCustomerTypes();
    }

    private void initializeCustomerTypes() {
        customerTypes = Arrays.asList(
                new CustomerType(CustomerTypeName.BRONZE, 0.0, 0, 1000),
                new CustomerType(CustomerTypeName.SILVER, 0.05, 1000, 3000),
                new CustomerType(CustomerTypeName.GOLD, 0.1, 3000, Double.POSITIVE_INFINITY)
        );
    }
    
    public CustomerType findCustomerType(double points) {
        return customerTypes.stream()
                .filter(type -> type.isWithinPointsRange(points))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No customer type with " + points + " points"));
    }
}
