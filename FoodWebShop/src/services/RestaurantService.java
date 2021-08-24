package services;

import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;
import beans.users.roles.manager.Manager;
import dtos.RestaurantCreationDTO;
import repositories.interfaces.ManagerRepository;
import repositories.interfaces.RestaurantRepository;
import services.util.ImageFileIOProxy;

import javax.inject.Inject;

public class RestaurantService {
    final private RestaurantRepository restaurantRepo;
    final private ManagerRepository managerRepo;
    final private ImageFileIOProxy ioProxy;

    @Inject
    public RestaurantService(RestaurantRepository restaurantRepo, ManagerRepository managerRepo) {
        this.restaurantRepo = restaurantRepo;
        this.managerRepo = managerRepo;
        this.ioProxy = new ImageFileIOProxy();
    }

    public RestaurantType[] getTypes() {
        return RestaurantType.values();
    }

    public Restaurant saveRestaurant(RestaurantCreationDTO creationDTO) {
        Restaurant savedRestaurant = restaurantRepo.save(creationDTO.getRestaurant());
        employManager(creationDTO.getSelectedManagerId(), savedRestaurant);
        return getRestaurantWithSavedLogo(creationDTO, savedRestaurant);
    }

    private void employManager(long managerId, Restaurant restaurant) {
        Manager manager = managerRepo.get(managerId);
        manager.setRestaurant(restaurant);
        managerRepo.update(manager);
    }

    private Restaurant getRestaurantWithSavedLogo(RestaurantCreationDTO creationDTO, Restaurant savedRestaurant) {
        String logoPath = ioProxy.saveImage(
                creationDTO.getFileInputStream(),
                "restaurants",
                savedRestaurant.getId(),
                creationDTO.getFilename());
        savedRestaurant.setLogoPath(logoPath);
        return restaurantRepo.update(savedRestaurant);
    }
}
