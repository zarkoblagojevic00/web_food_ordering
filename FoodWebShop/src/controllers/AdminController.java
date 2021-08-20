package controllers;

import dtos.AdminOverviewDTO;
import services.AdminService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;

@Path("/admins")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AdminController {
    @Inject
    private AdminService adminService;

    @GET
    @Path("overview")
    @RolesAllowed("ADMIN")
    public Response getAll() {
        Collection<AdminOverviewDTO> managers = adminService.getAdminsOverview();
        return Response.ok(managers).build();
    }
}
