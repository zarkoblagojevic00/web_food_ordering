package controllers;

import dtos.ManagerOverviewDTO;
import services.ManagerService;

import javax.annotation.security.RolesAllowed;
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
    @RolesAllowed({"ADMIN", "MANAGER"})
    public Response getAll() {
        Collection<ManagerOverviewDTO> managers = managerService.getManagersOverview();
        return Response.ok(managers).build();
    }

    @GET
    @Path("overview/{id}")
    public Response get(@PathParam("id") long managerId) {
        return Response.ok(managerService.getManagerOverview(managerId)).build();
    }

    @GET
    @Path("available")
    @RolesAllowed("ADMIN")
    public Response getAvailable() {
        Collection<ManagerOverviewDTO> availableManagers = managerService.getAvailableManagers();
        return Response.ok(availableManagers).build();
    }

    @PUT
    @Path("ban")
    @RolesAllowed("ADMIN")
    public Response ban(String username) {
        managerService.banManager(username);
        return Response.noContent().build();
    }

    @DELETE
    @Path("{username}")
    @RolesAllowed("ADMIN")
    public Response delete(@PathParam("username") String username) {
        managerService.deleteManager(username);
        return Response.noContent().build();
    }
}
