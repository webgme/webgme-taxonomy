/*globals define*/
/*eslint-env node, browser*/

define([
  "text!./metadata.json",
  "plugin/PluginBase",
  "text!./template.ejs",
  "underscore",
], function (
  pluginMetadata,
  PluginBase,
  owlTemplateText,
  _,
) {
  "use strict";

  pluginMetadata = JSON.parse(pluginMetadata);
  const owlTemplate = _.template(owlTemplateText);

  class ExportOntology extends PluginBase {
    constructor() {
      super();
      this.pluginMetadata = pluginMetadata;
    }

    async main() {
      const filename = `${this.core.getAttribute(this.activeNode, "name")}.owl`;
      const classes = await this.getClassDataFor(this.activeNode);
      const owlContents = owlTemplate({ classes });
      await this.addFile(filename, owlContents);
      this.result.setSuccess(true);
    }

    async getClassDataFor(node, parentId) {
      const id = this.core.getGuid(node);
      const clazz = {
        id,
        name: this.core.getAttribute(node, "name"),
        parentId,
      };
      const children = await this.core.loadChildren(node);
      const childClassNodes = children.filter((child) => {
        const base = this.core.getMetaType(child);
        return !this.core.getAttribute(base, "name").endsWith("Field");
      });
      const classes = (await Promise.all(
        childClassNodes.map((child) => this.getClassDataFor(child, id)),
      )).flat();
      classes.unshift(clazz);
      return classes;
    }
  }

  ExportOntology.metadata = pluginMetadata;

  return ExportOntology;
});
