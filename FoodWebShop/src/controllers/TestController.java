package controllers;

import beans.TestUser;
import beans.users.base.*;
import beans.users.roles.admin.Admin;
import beans.users.roles.customer.CustomerType;
import beans.users.roles.customer.CustomerTypeFinder;
import beans.users.roles.customer.CustomerTypeName;
import repositories.interfaces.AdminRepository;
import repositories.json.repos.AdminJsonFileRepository;
import services.TestService;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.util.Date;

@Path("/test")
@PermitAll
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

	@Path("/repo")
	@RolesAllowed("ADMIN")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Admin saveAdmin(@Context SecurityContext sc) {
		User user = (User) sc.getUserPrincipal();
		System.out.println(user.getName());
		boolean update = true;
		boolean delete = true;
		boolean updateFail = true;
		boolean deleteFail = true;

		AdminRepository repo = new AdminJsonFileRepository();
		PersonalData info = new PersonalData("Test", "Test", Gender.MALE, new Date());
		Credentials creds = new Credentials("test", "test");
		Admin admin = new Admin(creds, info);
		Admin createdAdmin = repo.save(admin);

		if (update) {
			//createdAdmin.setCredentials(new Credentials("Change", "Changed"));
			repo.update(createdAdmin);
		}

		if (delete) {
			repo.delete(createdAdmin.getId());
		}

		if (updateFail) {
			try {
				repo.update(createdAdmin);
			} catch (RuntimeException e){
				System.out.println("Failed to update! " + e.getMessage());
			}
		}

		if (deleteFail) {
			try {
				repo.delete(createdAdmin.getId());
			} catch (RuntimeException e){
				System.out.println("Failed to delete! " + e.getMessage());
			}
		}

		return createdAdmin;

	}

	@Path("/typefinder/{points}")
	@GET
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public CustomerType getType(@PathParam("points") double points) {
		return new CustomerTypeFinder().getCustomerType(CustomerTypeName.GOLD);
	}
}
