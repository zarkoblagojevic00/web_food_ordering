package services;

import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;
import beans.users.roles.manager.Manager;
import dtos.RestaurantOverviewDTO;
import repositories.interfaces.CommentRepository;
import repositories.interfaces.ManagerRepository;
import repositories.interfaces.RestaurantRepository;
import services.util.FileUploadDTO;
import services.util.ImageFileIOProxy;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class RestaurantService {
    final private RestaurantRepository restaurantRepo;
    final private ManagerRepository managerRepo;
    final private CommentRepository commentRepo;
    final private ImageFileIOProxy ioProxy;

    @Inject
    public RestaurantService(RestaurantRepository restaurantRepo,
                             ManagerRepository managerRepo,
                             CommentRepository commentRepo) {
        this.restaurantRepo = restaurantRepo;
        this.managerRepo = managerRepo;
        this.commentRepo = commentRepo;
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

    public RestaurantOverviewDTO getRestaurantOverview(long restaurantId) {
        return new RestaurantOverviewDTO(restaurantRepo.get(restaurantId));
    }

    public Collection<RestaurantOverviewDTO> getAll() {
        return restaurantRepo.getAll().stream()
                .map(this::createRestaurantOverviewWithAvgMark)
                .collect(Collectors.toList());
    }

    private RestaurantOverviewDTO createRestaurantOverviewWithAvgMark(Restaurant restaurant) {
        double averageMark = commentRepo.getAverageMarkForRestaurant(restaurant.getId());
        return new RestaurantOverviewDTO(restaurant, averageMark);
    }
}
