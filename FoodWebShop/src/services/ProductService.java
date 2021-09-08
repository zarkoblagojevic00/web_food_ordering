package services;

import beans.restaurants.Product;
import beans.restaurants.Restaurant;
import repositories.interfaces.ProductRepository;
import repositories.interfaces.RestaurantRepository;
import services.util.FileUploadDTO;
import services.util.ImageFileIOProxy;

import javax.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;

public class ProductService {
    final private ProductRepository productRepo;
    final private RestaurantRepository restaurantRepo;
    final private ImageFileIOProxy ioProxy;

    @Inject
    public ProductService(ProductRepository productRepo, RestaurantRepository restaurantRepo) {
        this.productRepo = productRepo;
        this.restaurantRepo = restaurantRepo;
        this.ioProxy = new ImageFileIOProxy();
    }

    public Collection<Product> getProductsForRestaurant(long restaurantId) {
        Restaurant restaurant = restaurantRepo.get(restaurantId);
        return productRepo.getProductsForRestaurant(restaurantId).stream()
            .peek(product -> product.setRestaurant(restaurant))
            .collect(Collectors.toList());
    }

    public Product saveProduct(Product newProduct, long restaurantId, FileUploadDTO fileUploadDto) {
        productRepo.checkUniqueName(restaurantId, newProduct.getName());
        String picturePath = ioProxy.saveImage(fileUploadDto);
        Product toBeSaved = new Product(-1, newProduct, picturePath, restaurantId);
        return productRepo.save(toBeSaved);
    }

    public Product updateProduct(long productId, Product product, long restaurantId, FileUploadDTO fileUploadDTO) {
        Product existing = productRepo.get(productId);
        String productName = product.getName();
        if (!existing.getName().equals(productName)) {
            productRepo.checkUniqueName(restaurantId, productName);
        }
        String newPath = ioProxy.replaceImage(existing.getPicturePath(), fileUploadDTO);
        return productRepo.update(new Product(existing.getId(), product, newPath, restaurantId));
    }

    public Product getProduct(long productId) {
        return productRepo.get(productId);
    }
}
