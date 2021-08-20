package controllers;

import dtos.ManagerOverviewDTO;
import services.ManagerService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;

@Path("/managers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ManagerController {
    @Inject
    private ManagerService managerService;

    @GET
    @Path("overview")
    //@RolesAllowed("ADMIN")
    public Response getAll() {
        Collection<ManagerOverviewDTO> managers = managerService.getManagersOverview();
        return Response.ok(managers).build();
    }

    @PUT
    @Path("ban")
    public Response ban(String username) {
        managerService.banManager(username);
        return Response.noContent().build();
    }

    @DELETE
    @Path("{username}")
    public Response delete(@PathParam("username") String username) {
        managerService.deleteManager(username);
        return Response.noContent().build();
    }
}
