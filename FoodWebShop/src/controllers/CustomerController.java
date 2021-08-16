package controllers;

import dtos.CustomerOverviewDTO;
import services.CustomerService;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;

@Path("/customers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomerController {
    @Inject
    CustomerService customerService;

    @GET
    @Path("overview")
//    @RolesAllowed("ADMIN")
    public Response getAll() {
        Collection<CustomerOverviewDTO> customers = customerService.getCustomersOverview();
        return Response.ok(customers).build();
    }
}
