package repositories.json.repos;

import beans.restaurants.RequestStatus;
import beans.restaurants.requests.Comment;
import repositories.interfaces.CommentRepository;
import repositories.json.repos.base.JsonFileRepository;

import java.util.Collection;
import java.util.stream.Collectors;

public class CommentJsonFileRepository extends JsonFileRepository<Comment> implements CommentRepository {

    public CommentJsonFileRepository() {
        super(Comment.class);
    }

    @Override
    public Collection<Comment> getCommentsForRestaurant(long restaurantId) {
        return getAll().stream()
                .filter(comment -> comment.belongsTo(restaurantId))
                .collect(Collectors.toList());
    }

    @Override
    public double getAverageMarkForRestaurant(long id) {
        return getCommentsForRestaurant(id).stream()
                .filter(comment -> comment.isStatus(RequestStatus.APPROVED))
                .mapToDouble(Comment::getMark)
                .average()
                .orElse(0);
    }
}
