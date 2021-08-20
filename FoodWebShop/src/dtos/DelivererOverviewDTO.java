package dtos;

import beans.users.roles.deliverer.Deliverer;
import beans.users.roles.deliverer.DelivererActivityReport;

public class DelivererOverviewDTO extends UserOverviewDTO {
    final private DelivererActivityReport activityReport;

    public DelivererOverviewDTO(Deliverer deliverer, DelivererActivityReport activityReport) {
        super(deliverer);
        this.activityReport = activityReport;
    }
}
