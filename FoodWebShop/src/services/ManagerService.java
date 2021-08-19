package services;

import beans.restaurants.Restaurant;
import beans.users.roles.manager.Manager;
import dtos.ManagerOverviewDTO;
import repositories.interfaces.ManagerRepository;
import repositories.interfaces.RestaurantRepository;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class ManagerService {
    final private ManagerRepository managerRepo;
    final private RestaurantRepository restaurantRepo;

    @Inject
    public ManagerService(ManagerRepository managerRepo, RestaurantRepository restaurantRepo) {
        this.managerRepo = managerRepo;
        this.restaurantRepo = restaurantRepo;
    }

    public Collection<ManagerOverviewDTO> getManagersOverview() {
        return managerRepo.getAll().stream()
                .map(this::createManagerOverviewDTO)
                .collect(Collectors.toList());
    }

    private ManagerOverviewDTO createManagerOverviewDTO(Manager manager) {
        try {
            Restaurant restaurant = restaurantRepo.get(manager.getRestaurant().getId());
            manager.setRestaurant(restaurant);
        } catch (NullPointerException ignored) {
        }
        return new ManagerOverviewDTO(manager);
    }

    public Manager save(Manager manager) {
        return managerRepo.save(manager);
    }
}
