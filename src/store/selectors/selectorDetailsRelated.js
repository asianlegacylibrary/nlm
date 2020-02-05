import { bdrcResources } from '../../tools/ontology/bdrcResources'

export function selectorDetailsRelated(itemResources, label = null) {
    let resources = null
    if (itemResources.length > 0) {
        resources = bdrcResources(itemResources, label)
    }
    return resources
}
