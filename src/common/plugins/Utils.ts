interface CommitVersion {
  commit: string;
}
interface BranchVersion {
  branch: string;
}
interface TagVersion {
  tag: string;
}
type NamedVersion = CommitVersion | BranchVersion | TagVersion;

interface PluginState {
  commitHash: string;
  branchName?: string;
}

export async function getVersionString(
  project: GmeClasses.Project,
  pluginState: PluginState,
): Promise<string> {
  return Object.entries(await getProjectVersion(project, pluginState))
    .map(([name, value]) => name + "/" + encodeURIComponent(value))
    .pop() as string;
}

async function getProjectVersion(
  project: GmeClasses.Project,
  pluginState: PluginState,
): Promise<NamedVersion> {
  const tags = await project.getTags();
  const currentTag = Object.entries(tags).find(
    ([_tag, commit]) => commit === pluginState.commitHash,
  );

  if (currentTag) {
    return { tag: currentTag[0] };
  } else if (pluginState.branchName) {
    return { branch: pluginState.branchName };
  } else {
    return { commit: pluginState.commitHash };
  }
}
