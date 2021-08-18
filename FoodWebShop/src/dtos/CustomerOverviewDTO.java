package dtos;

import beans.users.roles.customer.CustomerActivityReport;
import beans.users.roles.customer.Customer;
import beans.users.roles.customer.CustomerTypeName;
import beans.users.roles.customer.UserActivityStatus;

public class CustomerOverviewDTO extends UserOverviewDTO {
    final private UserActivityStatus activityStatus;
    final private CustomerActivityReport activityReport;
    final private CustomerTypeName type;
    final private int pointsEarned;

    public CustomerOverviewDTO(Customer customer, CustomerActivityReport activityReport) {
        super(customer);
        this.activityStatus = customer.getActivityStatus();
        this.type = customer.getCustomerTypeName();
        this.pointsEarned = customer.getPointsEarned();
        this.activityReport = activityReport;
    }
}
