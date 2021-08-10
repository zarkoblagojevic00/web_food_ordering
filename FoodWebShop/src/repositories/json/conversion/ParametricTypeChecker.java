package repositories.json.conversion;

import beans.Entity;

public class ParametricTypeChecker {
    final private Class<?> typeParameterClass;

    public ParametricTypeChecker(Class<?> typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }

    public boolean isEntityDifferentThanT(Class<?> beanClass) {
        return Entity.class.isAssignableFrom(beanClass) &&
                !this.typeParameterClass.equals(beanClass);
    }

}
