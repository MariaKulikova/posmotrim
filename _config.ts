import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import favicon from "lume/plugins/favicon.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import jsx from "lume/plugins/jsx.ts";


const site = lume({
  location: new URL("https://posmotrim.design/"),
});

site.use(googleFonts({
  fonts:
    "https://fonts.google.com/share?selection.family=Geologica:wght@100..900",
}));
site.use(sass(/* Options */));
site.use(jsx(/* Options */));

site.copy(".html");
site.copy(".js");
site.add("assets");
site.add("js");
site.add("styles/main.scss");
site.use(favicon({
  input: "assets/images/favicon.svg",
}));


export default site;