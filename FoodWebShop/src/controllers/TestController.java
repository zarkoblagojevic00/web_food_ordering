package controllers;

import beans.TestUser;
import services.TestService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/test")
public class TestController {
	@Inject
	private TestService testService;

	public TestController() {

	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public TestUser getDefault() {
		return testService.getUser(25);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public TestUser saveDefault(TestUser user) {
		return testService.saveUser(user);
	}
}
