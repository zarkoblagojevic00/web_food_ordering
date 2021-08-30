package controllers;

import beans.users.base.Credentials;
import beans.users.base.User;
import services.auth.RegistrationData;
import services.auth.AuthenticationResponse;
import services.auth.AuthenticationService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthenticationController {
    @Inject
    AuthenticationService authService;

    @POST
    @Path("login")
    public Response login(Credentials credentials) {
        AuthenticationResponse authResponse = authService.login(credentials);
        return Response.status(Response.Status.OK).entity(authResponse).build();
    }

    @POST
    @Path("signup")
    public Response signup(RegistrationData regData) {
        AuthenticationResponse authResponse = authService.signup(regData);
        return Response.status(Response.Status.CREATED).entity(authResponse).build();
    }

    @PUT
    @Path("profile")
    public Response editProfile(User user) {
        AuthenticationResponse authResponse = authService.editProfile(user);
        return Response.ok(authResponse).build();
    }



}
