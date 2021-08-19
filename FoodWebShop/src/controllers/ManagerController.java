package controllers;

import beans.users.roles.manager.Manager;
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

    @POST
    //@RolesAllowed("ADMIN")
    public Response create(Manager newManager) {
        Manager createdManager = managerService.save(newManager);
        return Response.status(Response.Status.CREATED).entity(createdManager).build();
    }

}
