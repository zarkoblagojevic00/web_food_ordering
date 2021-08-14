package beans.users.roles.customer;

import java.util.HashMap;
import java.util.Map;

public class CustomerTypeFinder {
    Map<CustomerTypeName, CustomerType> customerTypes;

    public CustomerTypeFinder() {
        initializeCustomerTypes();
    }

    private void initializeCustomerTypes() {
        customerTypes = new HashMap<CustomerTypeName, CustomerType>() {{
            put(CustomerTypeName.BRONZE, new CustomerType(CustomerTypeName.BRONZE, 0.0, 0, 1000));
            put(CustomerTypeName.SILVER, new CustomerType(CustomerTypeName.SILVER, 0.05, 1000, 3000));
            put(CustomerTypeName.GOLD,   new CustomerType(CustomerTypeName.GOLD, 0.1, 3000, Double.POSITIVE_INFINITY));
        }};
    }

    public CustomerType getCustomerType(CustomerTypeName typeName) {
        return customerTypes.get(typeName);
    }

    private CustomerType findCustomerType(double points) {
        return customerTypes.values().stream()
                .filter(type -> type.isWithinPointsRange(points))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No customer type with " + points + " points"));
    }

    public Customer evaluateCustomerType(Customer customer) {
        CustomerTypeName typeByPoints = findCustomerType(customer.getPointsEarned()).getName();
        if (customer.isCustomerType(typeByPoints))
            return customer;
        customer.setCustomerTypeName(typeByPoints);
        return customer;
    }
}
