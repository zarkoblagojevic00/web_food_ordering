package controllers;

import beans.TestUser;
import beans.users.base.Credentials;
import beans.users.base.Gender;
import beans.users.base.PersonalData;
import beans.users.base.Role;
import beans.users.roles.admin.Admin;
import beans.users.roles.customer.CustomerType;
import beans.users.roles.customer.CustomerTypeFinder;
import services.TestService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Date;

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

	@Path("/mapper")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Credentials getCreds(Credentials creds) {
		if (creds.isMyIdentity(new Credentials("test", "test"))) {
			return new Credentials("hej", "hej");
		}
		return creds;
	}

	@Path("/admin")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Admin getAdmin() {
		PersonalData info = new PersonalData("Test", "Testic", Gender.MALE, new Date());
		Credentials creds = new Credentials("test", "test");
		Admin admin = new Admin(creds, info);
		if (admin.hasAuthority(Role.ADMIN))
			System.out.println("I'm admin!");
		return admin;
	}

	@Path("/typefinder/{points}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public CustomerType getType(@PathParam("points") double points) {
		return new CustomerTypeFinder().findCustomerType(points);
	}
}
