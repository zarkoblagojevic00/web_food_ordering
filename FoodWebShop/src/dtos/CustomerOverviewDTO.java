package dtos;

import beans.users.roles.customer.CustomerActivityReport;
import beans.users.roles.customer.Customer;
import beans.users.roles.customer.UserActivityStatus;

public class CustomerOverviewDTO extends UserOverviewDTO {
    final private UserActivityStatus activityStatus;
    final private CustomerActivityReport activityReport;

    public CustomerOverviewDTO(Customer customer, CustomerActivityReport activityReport) {
        super(customer);
        this.activityStatus = customer.getActivityStatus();
        this.activityReport = activityReport;
    }
}
