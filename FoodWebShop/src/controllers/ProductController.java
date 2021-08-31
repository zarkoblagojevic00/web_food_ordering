package controllers;


import beans.restaurants.Product;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import services.ProductService;
import services.util.FileUploadDTO;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.util.Collection;

@Path("products")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ProductController {

    @Inject
    private ProductService productService;

    private @PathParam("restaurantId") long restaurantId;

    @GET
    public Response getProductsForRestaurant() {
        Collection<Product> products = productService.getProductsForRestaurant(restaurantId);
        return Response.ok(products).build();
    }

    @POST
    @Consumes({MediaType.MULTIPART_FORM_DATA})
    @Produces(MediaType.APPLICATION_JSON)
    public Response add(@FormDataParam("product") Product newProduct,
                        @FormDataParam("picture") InputStream fileInputStream,
                        @FormDataParam("picture") FormDataContentDisposition fileMetaData) {
        Product savedProduct = productService.saveProduct(
                newProduct,
                restaurantId,
                new FileUploadDTO(fileInputStream, fileMetaData, "restaurants", restaurantId, true));
        return Response.ok(savedProduct).build();
    }

}
