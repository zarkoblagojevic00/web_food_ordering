package controllers;

import beans.users.base.Credentials;
import beans.users.roles.customer.Customer;
import services.auth.AuthenticationResponse;
import services.auth.AuthenticationService;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthenticationController {
    @Inject
    AuthenticationService authService;

    @POST
    @Path("/login")
    public Response login(Credentials credentials) {
        AuthenticationResponse authResponse = authService.login(credentials);
        return Response.status(Response.Status.OK).entity(authResponse).build();
    }

    @POST
    @Path("/signup")
    public Response signup(Customer newCustomer) {
        AuthenticationResponse authResponse = authService.createCustomer(newCustomer);
        return Response.status(Response.Status.OK).entity(authResponse).build();
    }

}
