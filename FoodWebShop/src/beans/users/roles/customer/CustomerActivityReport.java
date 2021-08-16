package beans.users.roles.customer;

public class CustomerActivityReport {
    final private long numOfCanceledOrdersInPastMonth;

    public CustomerActivityReport(long numOfCanceledOrdersInPastMonth) {
        this.numOfCanceledOrdersInPastMonth = numOfCanceledOrdersInPastMonth;
    }

}
