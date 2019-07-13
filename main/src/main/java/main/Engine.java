package main;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.stream.Stream;
import org.json.JSONObject;

public class Engine {

    private static InputStream is;
    private static BufferedReader buf;
    private static String line;
    private static StringBuilder sb;

    ///// read partial fils and ret obj
    private static Map<String, String> getPartialsMap(Stream<Path> paths, Map<String, String> varMap) {

        Map<String, String> partMap = new HashMap();

        paths.forEach(path -> {

            try {

                is = new FileInputStream(path.toString());
                buf = new BufferedReader(new InputStreamReader(is));
                line = buf.readLine();
                sb = new StringBuilder();

                while (line != null) {
                    if (line.contains("$")) {
                        varMap.forEach((key, val) -> {
                            line = line.replace("$" + key, val);
                        });
                    }

                    sb.append(line).append("\n");
                    line = buf.readLine();
                }

                String fileAsString = sb.toString();
                partMap.put("{" + path.toString().substring(path.toString().lastIndexOf("/") + 1,
                        path.toString().lastIndexOf(".")) + "}", fileAsString);

            } catch (Exception e) {

                System.out.println("try1:");
                System.out.println(e);
            }

        });

        return partMap;

    }

    /////////////////////////// load index page
    private static String loadIndex(String ThemePath, Map<String, String> partMap) {

        try {
            is = new FileInputStream(ThemePath + "/index.html");
            buf = new BufferedReader(new InputStreamReader(is));
            line = buf.readLine();
            sb = new StringBuilder();

            while (line != null) {
                if (line.contains("$")) {
                    partMap.forEach((key, val) -> {
                        line = line.replace("$" + key, val);
                    });
                }

                sb.append(line).append("\n");
                line = buf.readLine();
            }

            String fileAsString = sb.toString();
            return fileAsString;

        } catch (Exception e) {

            System.out.println(e);
        }

        return null;
    }

    //////////////////////// generate all .js files
    private static String scriptGenerator(String ThemePath) {

        StringBuilder scripts = new StringBuilder();
        try (Stream<Path> paths = Files.walk(Paths.get(ThemePath + "/scripts/"))) {

            paths.forEach(path -> {

                try {
                    is = new FileInputStream(path.toString());
                    buf = new BufferedReader(new InputStreamReader(is));
                    line = buf.readLine();
                    sb = new StringBuilder();
                    while (line != null) {
                        sb.append(line).append("\n");
                        line = buf.readLine();
                    }
                    String fileAsString = sb.toString();
                    scripts.append("\n").append(fileAsString);

                } catch (Exception e) {
                    System.out.println(e);
                }

            });

            System.out.println("Contents : " + scripts);

        } catch (Exception e) {

            System.out.println(e);

        }
        return scripts.toString();
    }

    /////////////////////// generate all styles(css)
    private static String styleGenerator(User user, String ThemePath) {

        JSONObject parsedStyle = new JSONObject(user.getBlog().getStyle());
        StringBuilder styleBuild = new StringBuilder();
        String styleAsString = "";

        // user custom styles
        for (Iterator<String> keys = parsedStyle.keys(); keys.hasNext();) {

            String key = keys.next();
            if (key.equals("body")) {
                styleAsString += key + "{" + parsedStyle.getString(key) + "}";
            } else {
                styleAsString += "." + key + "{" + parsedStyle.getString(key) + "}";
            }

        }

        // default styles
        try (Stream<Path> paths = Files.walk(Paths.get(ThemePath + "/styles/"))) {

            paths.forEach(path -> {

                try {
                    is = new FileInputStream(path.toString());
                    buf = new BufferedReader(new InputStreamReader(is));
                    line = buf.readLine();
                    sb = new StringBuilder();
                    while (line != null) {
                        sb.append(line).append("\n");
                        line = buf.readLine();
                    }
                    String fileAsString = sb.toString();
                    styleBuild.append("\n").append(fileAsString);

                } catch (Exception e) {
                    System.out.println(e);
                }

            });
            styleAsString += styleAsString + "\n" + styleBuild.toString();

        } catch (Exception e) {

            System.out.println(e);

        }

        return styleAsString;
    }

    ///////////////////////
    ///////////////////////
    public static String BLOG_Generator(User user, String ThemePath) {

        Map<String, String> varMap = new HashMap();
        Map<String, String> partMap = new HashMap();

        varMap.put("{Name}", user.getName());
        varMap.put("{Title}", user.getBlog().getTitle());
        varMap.put("{Biography}", user.getBlog().getBio().getContent());
        varMap.put("{CVLink}", user.getBlog().getBio().getCVLink());
        varMap.put("{Linkedin}", user.getBlog().getContact().getLinkedin());
        varMap.put("{Email}", user.getBlog().getContact().getEmail());
        varMap.put("{Phone}", user.getBlog().getContact().getPhone());
        /** You can add custom user scripts and styles in here */
        varMap.put("{Style}", styleGenerator(user, ThemePath) + ""/** custom style by user */
        );
        varMap.put("{Script}", scriptGenerator(ThemePath) /** custom script by user */
        );

        try (Stream<Path> paths = Files.walk(Paths.get(ThemePath + "/partials/"))) {

            partMap = getPartialsMap(paths, varMap);
            String index = loadIndex(ThemePath, partMap);

            return index;
        } catch (Exception e) {
            System.out.println("try2:");
            System.out.println(e);
            return e.toString();
        }

    }

}
