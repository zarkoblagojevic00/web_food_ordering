package controllers;

import beans.restaurants.Restaurant;
import beans.restaurants.RestaurantType;
import dtos.RestaurantCreationDTO;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import services.RestaurantService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.Collection;

@Path("restaurants")
public class RestaurantController {
    @Inject
    private RestaurantService restaurantService;

    @GET
    @Path("types")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTypes() {
        return Response.ok(restaurantService.getTypes()).build();
    }

    @POST
    @Consumes({MediaType.MULTIPART_FORM_DATA})
    @Produces(MediaType.APPLICATION_JSON)
    public Response add(@FormDataParam("restaurant") Restaurant restaurant,
                        @FormDataParam("logoPicture") InputStream fileInputStream,
                        @FormDataParam("logoPicture") FormDataContentDisposition fileMetaData,
                        @FormDataParam("selectedManagerId") long managerId) {
        RestaurantCreationDTO dto = new RestaurantCreationDTO(
                restaurant,
                fileInputStream,
                fileMetaData.getFileName(),
                managerId);
        Restaurant savedRestaurant = restaurantService.saveRestaurant(dto);
        return Response.ok(savedRestaurant).build();
    }

}
