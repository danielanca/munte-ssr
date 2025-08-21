declare module "shards-react";

declare module "html-react-parser" {
  import { ReactNode } from "react";

  export interface HTMLReactParserOptions {
    replace?: (domNode: any) => ReactNode;
    trim?: boolean;
  }

  export default function parse(html: string, options?: HTMLReactParserOptions): ReactNode;
}
