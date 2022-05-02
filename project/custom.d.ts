declare module "*.svg" {
  import * as React from "react";

  const src: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  export default src;
}
