package services;

import beans.restaurants.Product;
import repositories.interfaces.ProductRepository;
import services.util.FileUploadDTO;
import services.util.ImageFileIOProxy;

import javax.inject.Inject;
import java.io.InputStream;
import java.util.Collection;
import java.util.UUID;
import java.util.stream.Collectors;

public class ProductService {
    final private ProductRepository productRepo;
    final private ImageFileIOProxy ioProxy;

    @Inject
    public ProductService(ProductRepository productRepo) {
        this.productRepo = productRepo;
        this.ioProxy = new ImageFileIOProxy();
    }

    public Collection<Product> getProductsForRestaurant(long restaurantId) {
        return productRepo.getProductsForRestaurant(restaurantId);
    }

    public Product saveProduct(Product newProduct, long restaurantId, FileUploadDTO fileUploadDto) {
        productRepo.checkUniqueName(newProduct.getName());
        String picturePath = ioProxy.saveImage(fileUploadDto);
        Product toBeSaved = new Product(-1, newProduct, picturePath, restaurantId);
        return productRepo.save(toBeSaved);
    }

    public Product updateProduct(long productId, Product product, long restaurantId, FileUploadDTO fileUploadDTO) {
        Product existing = productRepo.get(productId);
        String productName = product.getName();
        if (!existing.getName().equals(productName)) {
            productRepo.checkUniqueName(productName);
        }
        String newPath = ioProxy.replaceImage(existing.getPicturePath(), fileUploadDTO);
        return productRepo.update(new Product(existing.getId(), product, newPath, restaurantId));
    }
}
