import type { WebgmeContext } from '../../../common/types';

export default class ContextFacade {
  constructor(protected context: WebgmeContext) {}

  async getContentTypeNodes() {
    const { core, root } = this.context;
    const metanodes = core.getAllMetaNodes(root);
    const contentTypeMetanodes = Object.values(metanodes)
      .filter(node => core.getAttribute(node, 'name') === 'Content Type');
    const children = await core.loadChildren(root);
    return children.filter(child => contentTypeMetanodes.some(mn => core.isTypeOf(child, mn)));
  }
  
  getScopedUrl(node: Core.Node) {
    const { projectVersion, core } = this.context;
    const path = node ? [core.getPath(node)] : [];
    const { id, branch, tag, commitHash } = projectVersion;
    const version = !commitHash ? !tag ? ['branch', branch!] : ['tag', tag] : ['commit', commitHash];
    const scope = [id, ...version, ...path].map(encodeURIComponent);
    return ['/routers/Search', ...scope, 'static/'].join('/');
  }
  
  async getProjectInfo() {
    const { project: { projectName }, core } = this.context;
    const contentTypeNodes = await this.getContentTypeNodes();
    return {
      name: projectName,
      contentTypes: contentTypeNodes.map(node => ({
        name: core.getAttribute(node, 'name'),
        path: core.getPath(node),
        url: this.getScopedUrl(node)
      }))
    };
  }
}
