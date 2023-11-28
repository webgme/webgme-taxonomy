/*globals define*/
/*eslint-env node, browser*/

import PluginBase from "plugin/PluginBase";
import pluginMetadata from "./metadata.json";
import { template } from "underscore";
import { toString } from "../../common/Utils";
import { GmeCore } from "../../common/types";

const owlTemplate = template(`
<?xml version="1.0"?>
<rdf:RDF xmlns="urn:webprotege:ontology:530beb6b-c2a0-45d4-a6c4-f594082c5c1c#"
     xml:base="urn:webprotege:ontology:530beb6b-c2a0-45d4-a6c4-f594082c5c1c"
     xmlns:owl="http://www.w3.org/2002/07/owl#"
     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:xml="http://www.w3.org/XML/1998/namespace"
     xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
     xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">
    <owl:Ontology rdf:about="urn:webprotege:ontology:530beb6b-c2a0-45d4-a6c4-f594082c5c1c"/>

	<% classes.forEach(clazz => {%>
	<owl:Class rdf:about="http://webgme.leap.vanderbilt.edu/<%= clazz.id %>">
	<% if (clazz.parentId) { %>
        <rdfs:subClassOf rdf:resource="http://webgme.leap.vanderbilt.edu/<%= clazz.parentId %>"/>
	<% } %>
		<rdfs:label rdf:datatype="http://www.w3.org/2001/XMLSchema#string"><%= clazz.name %></rdfs:label>
    </owl:Class>
    
	<% }) %>
</rdf:RDF>
`);

interface ClassData {
  id: string;
  name: string;
  parentId?: string;
}

export default class ExportOntology extends PluginBase {
  static metadata: GmeCommon.Metadata;

  constructor() {
    super();
    this.pluginMetadata = pluginMetadata;
  }

  async main() {
    const filename = `${this.core.getAttribute(this.activeNode, "name")}.owl`;
    const classes = await this.getClassDataFor(this.activeNode);
    const owlContents = owlTemplate({ classes });
    /// @ts-ignore
    await this.addFile(filename, owlContents);
    this.result.setSuccess(true);
  }

  async getClassDataFor(
    node: Core.Node,
    parentId?: string,
  ): Promise<ClassData[]> {
    const core = this.core as GmeCore;
    const id = core.getGuid(node);
    const clazz = {
      id,
      name: toString(core.getAttribute(node, "name")),
      parentId,
    };
    const children = await core.loadChildren(node);
    const childClassNodes = children.filter((child) => {
      const base = core.getMetaType(child);
      return !toString(core.getAttribute(base, "name")).endsWith("Field");
    });
    const classes = (await Promise.all(
      childClassNodes.map((child) => this.getClassDataFor(child, id)),
    )).flat();
    classes.unshift(clazz);
    return classes;
  }
}

ExportOntology.metadata = pluginMetadata;
