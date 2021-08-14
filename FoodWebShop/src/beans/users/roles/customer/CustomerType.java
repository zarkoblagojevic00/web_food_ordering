package beans.users.roles.customer;

public class CustomerType {

    final private CustomerTypeName name;
    final private double discount;
    final private double pointsLowerLimit;
    final private double pointsUpperLimit;


    public CustomerType(CustomerTypeName name,
                        double discount,
                        double pointsLowerLimit,
                        double pointsUpperLimit) {
        this.name = name;
        this.discount = discount;
        this.pointsLowerLimit = pointsLowerLimit;
        this.pointsUpperLimit = pointsUpperLimit;
    }

    public double calculateDiscountedPrice(double initialPrice) {
        return initialPrice * (1. - discount);
    }

    public boolean isCustomerTypeName(CustomerTypeName name) {
        return this.name.equals(name);
    }

    public CustomerTypeName getName() {
        return name;
    }

    public boolean isWithinPointsRange(double points) {
        return pointsLowerLimit <= points && points <= pointsUpperLimit;
    }
}
