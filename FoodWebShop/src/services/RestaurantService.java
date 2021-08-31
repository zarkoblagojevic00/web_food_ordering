package services;

import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;
import beans.users.roles.manager.Manager;
import dtos.RestaurantCreationDTO;
import repositories.interfaces.ManagerRepository;
import repositories.interfaces.RestaurantRepository;
import services.util.FileUploadDTO;
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

    public Restaurant saveRestaurant(Restaurant restaurant, long selectedManagerId, FileUploadDTO fileUploadDTO) {
        Restaurant savedRestaurant = restaurantRepo.save(restaurant);
        employManager(selectedManagerId, savedRestaurant);
        return getRestaurantWithSavedLogo(fileUploadDTO, savedRestaurant);
    }

    private void employManager(long managerId, Restaurant restaurant) {
        Manager manager = managerRepo.get(managerId);
        manager.setRestaurant(restaurant);
        managerRepo.update(manager);
    }

    private Restaurant getRestaurantWithSavedLogo(FileUploadDTO fileUploadDTO, Restaurant savedRestaurant) {
        fileUploadDTO.setResourceSubfolderName(savedRestaurant.getId());
        String logoPath = ioProxy.saveImage(fileUploadDTO);
        savedRestaurant.setLogoPath(logoPath);
        return restaurantRepo.update(savedRestaurant);
    }
}
