package controllers;

import beans.ecommerce.Order;
import beans.restaurants.Restaurant;
import dtos.RestaurantCreationDTO;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import services.RestaurantService;
import services.util.FileUploadDTO;

import javax.inject.Inject;
import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;

@Path("restaurants")
public class RestaurantController {
    @Inject
    private RestaurantService restaurantService;
    @Inject
    private ProductController productController;
    @Inject
    private CommentController commentController;
    @Inject
    private OrderController orderController;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        return Response.ok(restaurantService.getAll()).build();
    }

    @GET
    @Path("types")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTypes() {
        return Response.ok(restaurantService.getTypes()).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRestaurant(@PathParam("id") long restaurantId) {
        return Response.ok(restaurantService.getRestaurantOverview(restaurantId)).build();
    }

    @POST
    @Consumes({MediaType.MULTIPART_FORM_DATA})
    @Produces(MediaType.APPLICATION_JSON)
    public Response add(@FormDataParam("restaurant") Restaurant restaurant,
                        @FormDataParam("logoPicture") InputStream fileInputStream,
                        @FormDataParam("logoPicture") FormDataContentDisposition fileMetaData,
                        @FormDataParam("selectedManagerId") long managerId) {
        FileUploadDTO fileUploadDto = new FileUploadDTO(
          fileInputStream,
          fileMetaData,
          "restaurants",
          false
        );
        Restaurant savedRestaurant = restaurantService.saveRestaurant(restaurant, managerId, fileUploadDto);
        return Response.ok(savedRestaurant).build();
    }

    @Path("{restaurantId}/products")
    public ProductController getProductController() {
        return productController;
    }

    @Path("{restaurantId}/comments")
    public CommentController getCommentController() { return commentController;}

    @Path("{restaurantId}/orders")
    public OrderController getOrderController() { return orderController;}
}
