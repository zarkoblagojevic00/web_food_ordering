package services;

import beans.Entity;
import beans.users.roles.customer.UserActivityStatus;
import beans.users.roles.deliverer.Deliverer;
import beans.users.roles.deliverer.DelivererActivityReport;
import dtos.DelivererOverviewDTO;
import dtos.OrderOverviewDTO;
import repositories.interfaces.DelivererRepository;
import repositories.interfaces.OrderRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class DelivererService {
    final private DelivererRepository delivererRepo;
    final private OrderRepository orderRepo;

    @Inject
    public DelivererService(DelivererRepository delivererRepo, OrderRepository orderRepo) {
        this.delivererRepo = delivererRepo;
        this.orderRepo = orderRepo;
    }

    public Collection<DelivererOverviewDTO> getDeliverersOverview() {
        return delivererRepo.getAll().stream()
                .map(this::createDelivererOverviewDTO)
                .collect(Collectors.toList());
    }

    private DelivererOverviewDTO createDelivererOverviewDTO(Deliverer deliverer) {
        Collection<Long> orderIds = deliverer.getOrders().stream()
                .map(Entity::getId)
                .collect(Collectors.toList());
        DelivererActivityReport activityReport = new DelivererActivityReport(orderRepo.getMultiple(orderIds));
        return new DelivererOverviewDTO(deliverer, activityReport);
    }

    public void banDeliverer(String username) {
        Deliverer deliverer = delivererRepo.getUserByUsername(username);
        deliverer.setActivityStatus(UserActivityStatus.BANNED);
        delivererRepo.update(deliverer);
    }

    public void deleteDeliverer(String username) {
        Deliverer deliverer = delivererRepo.getUserByUsername(username);
        delivererRepo.delete(deliverer.getId());
    }
}
