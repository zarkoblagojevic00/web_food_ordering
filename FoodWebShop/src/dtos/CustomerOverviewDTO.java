package dtos;

import beans.users.roles.customer.CustomerActivityReport;
import beans.users.roles.customer.Customer;
import beans.users.roles.customer.CustomerTypeName;
import beans.users.roles.customer.UserActivityStatus;

public class CustomerOverviewDTO extends UserOverviewDTO {
    private CustomerActivityReport activityReport;
    final private CustomerTypeName type;
    final private int pointsEarned;

    public CustomerOverviewDTO(Customer customer) {
        super(customer);
        this.type = customer.getCustomerTypeName();
        this.pointsEarned = customer.getPointsEarned();
    }

    public CustomerOverviewDTO(Customer customer, CustomerActivityReport activityReport) {
        super(customer);
        this.type = customer.getCustomerTypeName();
        this.pointsEarned = customer.getPointsEarned();
        this.activityReport = activityReport;
    }
}
