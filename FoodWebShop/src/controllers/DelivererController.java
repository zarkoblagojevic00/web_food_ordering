package controllers;

import dtos.DelivererOverviewDTO;
import services.DelivererService;
import services.OrderService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;

@Path("/deliverers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DelivererController {
    @Inject
    private DelivererService delivererService;
    @Inject
    private OrderService orderService;

    @GET
    @Path("overview")
    @RolesAllowed("ADMIN")
    public Response getAll() {
        Collection<DelivererOverviewDTO> deliverers = delivererService.getDeliverersOverview();
        return Response.ok(deliverers).build();
    }

    @PUT
    @Path("ban")
    @RolesAllowed("ADMIN")
    public Response ban(String username) {
        delivererService.banDeliverer(username);
        return Response.noContent().build();
    }

    @DELETE
    @Path("{username}")
    @RolesAllowed("ADMIN")
    public Response delete(@PathParam("username") String username) {
        delivererService.deleteDeliverer(username);
        return Response.noContent().build();
    }

    @GET
    @Path("{id}/orders")
    public Response getOrdersForDeliverer(@PathParam("id") long id) {
        return Response.ok(orderService.getOrdersForDeliverer(id)).build();
    }

    @GET
    @Path("{id}/orders/available")
    public Response getAvailableOrdersForDeliverer(@PathParam("id") long id) {
        return Response.ok(orderService.getAvailableOrdersForDeliverer(id)).build();
    }
}