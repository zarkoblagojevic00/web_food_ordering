package controllers;

import beans.ecommerce.ShoppingItem;
import services.ShoppingCartService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Path("cart")
public class ShoppingCartController {
    @Inject
    private ShoppingCartService cartService;

    @GET
    @Path("customer-cart/{customerId}")
    public Response getCartForCustomer(@PathParam("customerId") long customerId) {
        return Response.ok(cartService.getCartForCustomer(customerId)).build();
    }

    @PUT
    @Path("add/{customerId}")
    public Response addShoppingItemToCart(@PathParam("customerId") long customerId, ShoppingItem shoppingItem) {
        cartService.addShoppingItemToCart(customerId, shoppingItem);
        return Response.noContent().build();
    }

    @PUT
    @Path("remove/{customerId}/{itemId}")
    public Response addShoppingItemToCart(@PathParam("customerId") long customerId,
                                          @PathParam("itemId") long itemId) {
        cartService.removeItemFromCart(customerId, itemId);
        return Response.noContent().build();
    }

    @POST
    @Path("create/{customerId}")
    public Response createOrderForCart(@PathParam("customerId") long customerId) {
        cartService.createOrderForCart(customerId);
        return Response.noContent().build();
    }
}
