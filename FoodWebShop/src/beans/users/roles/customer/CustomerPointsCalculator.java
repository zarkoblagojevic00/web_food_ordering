package beans.users.roles.customer;

public class CustomerPointsCalculator {
    final private static int NUMERATOR = 133;
    final private static int DENOMINATOR = 1000;
    final private static int PENALTY = 4;

    public int getPointsEarned(double orderPrice) {
        return getRounded((orderPrice * NUMERATOR) / DENOMINATOR);
    }

    public int getPointsLost(double orderPrice) {
        return getRounded(getPointsEarned(orderPrice) * PENALTY);
    }

    private int getRounded(double points) {
        return (int) Math.round(points);
    }
}
