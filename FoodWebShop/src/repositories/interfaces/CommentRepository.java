package repositories.interfaces;

import beans.restaurants.requests.Comment;
import repositories.interfaces.base.Repository;

import java.util.Collection;

public interface CommentRepository extends Repository<Comment> {
    public Collection<Comment> getCommentsForRestaurant(long restaurantId);
}
