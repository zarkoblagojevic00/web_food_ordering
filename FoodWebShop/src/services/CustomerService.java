package services;

import beans.users.roles.customer.Customer;
import beans.users.roles.customer.CustomerActivityReport;
import dtos.CustomerOverviewDTO;
import repositories.interfaces.CustomerRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class CustomerService {
    final private CustomerRepository customerRepo;
    final private ActivityService activityService;

    @Inject
    public CustomerService(CustomerRepository customerRepo, ActivityService activityService) {
        this.customerRepo = customerRepo;
        this.activityService = activityService;
    }

    public Collection<CustomerOverviewDTO> getCustomersOverview() {
        return customerRepo.getAll().stream()
                .map(this::createCustomerOverviewDTO)
                .collect(Collectors.toList());
    }

    private CustomerOverviewDTO createCustomerOverviewDTO(Customer customer) {
        CustomerActivityReport report = activityService.createCustomerActivityReport(customer);
        return new CustomerOverviewDTO(customer, report);
    }


}
