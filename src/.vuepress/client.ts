/* eslint-disable node/no-unpublished-import */
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  setup() {
    // Mermaid 11.x now supports classDef natively for classDiagram
    // No custom styling needed - use classDef syntax in Mermaid code blocks
  },
});
