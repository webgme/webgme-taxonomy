import type { FilterTag } from "./tags";

export default function generateGremlinQuery(tags: FilterTag[]): string {

  const queryParts = ["g.V()"];

  let cnt = 0;

  for (const tag of tags) {
    if (cnt > 0) {
      queryParts.push(".repeat(out()).until(");
    } else {
      queryParts.push(".");
    }

    switch (tag.type) {
      case "TextField":
        queryParts.push(`has('tagId', '${tag.id}').has('value', '${tag.value}')`);
        break;
      case "IntegerField":
        queryParts.push(`has('tagId', '${tag.id}').has('value', ${tag.value})`);
        break;
      case "EnumField":
        if (!tag.value) {
          alert(tag.type + ' must have a value selected!');
          return "";
        }

        queryParts.push(`has('tagId', '${tag.value}')`);
        break;
      default:
        alert('Tag type not supported "' + tag.type + '"');
        return "";
    }

    if (cnt > 0) {
      queryParts.push(")");
    }

    queryParts.push(".repeat(in()).until(hasLabel('Content'))");
    cnt += 1;
  }

  if (cnt === 0) {
    return "";
  }

  queryParts.push(".repeat(out()).until(has('tagId', '09999adc-c431-4f1e-c2bf-e24b47aead92'))");

  return queryParts.join('');
}