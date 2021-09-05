package controllers;

import beans.ecommerce.Order;
import beans.ecommerce.OrderStatus;
import services.OrderService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("orders")
public class OrderController {
    @Inject
    private OrderService orderService;

    private @PathParam("restaurantId") long restaurantId;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersForRestaurant() {
        return Response.ok(orderService.getOrdersForRestaurant(restaurantId)).build();
    }

    @GET
    @Path("customers")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRestaurantCustomersOverview() {
        return Response.ok(orderService.getRestaurantCustomersOverview(restaurantId)).build();
    }

    @GET
    @Path("{orderId}/details")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderDetails(@PathParam("orderId") long orderId) {
        return Response.ok(orderService.getOrderDetails(orderId)).build();
    }

    @GET
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByStatus(@QueryParam("status") OrderStatus status) {
        return Response.ok(orderService.getOrdersByStatus(status)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response postOrder(Order newOrder) {
        Order posted = orderService.postOrder(restaurantId, newOrder);
        return Response.ok(posted).build();
    }

    @PUT
    @Path("{orderId}/status")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response changeOrderStatus(@PathParam("orderId") long orderId, OrderStatus status) {
        Order changed = orderService.changeOrderStatus(orderId, status);
        return Response.ok(changed).build();
    }
}
