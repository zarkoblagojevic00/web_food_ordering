package config;


import java.io.File;
import java.util.regex.Matcher;

public class PathFinder {
    final private String CURRENT_SYSTEM_SEPARATOR;
    final private String SYSTEM_SEPARATOR_REGEX;
    final private String UNIX_SEPARATOR;
    final private String root;
    final private String subRoot;
    private String appendedToSubRoot;

    public PathFinder(String... subRootParams) {
        this.CURRENT_SYSTEM_SEPARATOR = File.separator;
        this.SYSTEM_SEPARATOR_REGEX = "[/\\\\]";
        this.UNIX_SEPARATOR = "/";
        this.root = findRoot();
        this.subRoot = appendedTo(root, subRootParams);
        this.appendedToSubRoot = "";
    }

    public String getAppendedToSubRootCurrentSys() {
        return appendedToSubRoot.replaceFirst(SYSTEM_SEPARATOR_REGEX, "");
    }

    public String getAppendedToSubRootUnix() {
        return replaceSeparators(getAppendedToSubRootCurrentSys(), UNIX_SEPARATOR);
    }

    public String getCurrentPath() {
        return subRoot + appendedToSubRoot;
    }

    public void appendToCurrentPath(String... paths) {
        appendedToSubRoot = appendedTo(appendedToSubRoot, paths);
    }

    private String appendedTo(String base, String... paths) {
        StringBuilder retVal = new StringBuilder(base);
        for (String path: paths) {
            String currSystemPath = replaceSeparators(path, CURRENT_SYSTEM_SEPARATOR);
            retVal.append(CURRENT_SYSTEM_SEPARATOR).append(currSystemPath);
        }
        return retVal.toString();
    }

    private String replaceSeparators(String path, String separator) {

        return path.replaceAll(SYSTEM_SEPARATOR_REGEX, Matcher.quoteReplacement(separator));

    }

    private String findRoot() {
        // TODO: Change to relative path - write on startup from one controller (context.getRealPath and write to file, read it from there)
        return "D:\\FTN\\E2 Predavanja - Vezbe\\3. godina\\2. semestar\\Web\\Projekat\\web_food_ordering";
    }
}
