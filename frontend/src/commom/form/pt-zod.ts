import { z } from "zod";
import translation from "zod-i18n-map/locales/pt/zod.json";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";

i18next.init({
    lng: "pt",
    resources: {
      pt: { zod: translation }
    }
  });
  
  z.setErrorMap(zodI18nMap);
  
export { z }
  