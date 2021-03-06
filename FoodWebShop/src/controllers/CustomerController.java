package controllers;

import dtos.CustomerOverviewDTO;
import services.CustomerService;
import services.OrderService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;

@Path("/customers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomerController {
    @Inject
    private CustomerService customerService;

    @Inject
    private OrderService orderService;

    @GET
    @Path("overview")
    @RolesAllowed("ADMIN")
    public Response getAll() {
        Collection<CustomerOverviewDTO> customers = customerService.getCustomersOverview();
        return Response.ok(customers).build();
    }

    // should be patch, but it's not supported
    @PUT
    @Path("ban")
    @RolesAllowed("ADMIN")
    public Response ban(String username) {
        customerService.banCustomer(username);
        return Response.noContent().build();
    }

    @GET
    @Path("{id}/orders")
    public Response getOrdersForCustomer(@PathParam("id") long id) {
        return Response.ok(orderService.getOrdersForCustomer(id)).build();
    }
}
