package controllers;

import beans.users.base.User;
import dtos.PasswordUpdateDTO;
import dtos.UserOverviewDTO;
import services.UserService;
import services.auth.RegistrationData;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserController {
    @Inject
    private UserService userService;

    @POST
    @Path("add")
    public Response add(RegistrationData regData) {
        User addedUser = userService.addUser(regData);
        return Response.status(Response.Status.CREATED).entity(addedUser).build();
    }

    @PUT
    @Path("password")
    public Response updatePassword(PasswordUpdateDTO dto) {
        userService.updatePassword(dto);
        return Response.noContent().build();
    }

    @GET
    @Path("profile/{username}")
    public Response getProfile(@PathParam("username") String username) {
        UserOverviewDTO dto = userService.getUserProfile(username);
        return Response.ok(dto).build();
    }
}
