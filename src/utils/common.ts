/* 导出一个包含数字、小写字母的随机字符串 */
export const randomString = (length: number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

/* 将平状数据转换为树状数据 */
export const flatToTree = (data: any[], id: string, parentId: string, children: string, maxDepth = 10): any[] => {
    const map: { [key: string]: any } = {};
    const tree: any[] = [];

    // Create a map of all items with their IDs as keys
    data.forEach((item) => {
        map[item[id]] = item;
    });

    // Iterate through the data again to build the tree structure
    data.forEach((item) => {
        const parent = map[item[parentId]];

        // If there's no parent, it's a root node
        if (!parent) {
            tree.push(item);
        } else {
            // Otherwise, add it to the parent's children array
            (parent[children] = parent[children] || []).push(item);
        }
    });

    // Recursively find all children for each node, up to maxDepth
    const getChildren = (node: any, depth: number = 0): any[] => {
        if (depth >= maxDepth) {
            return [];
        }
        const childNodes = node[children];
        if (childNodes && childNodes.length > 0) {
            return childNodes.map(child => ({
                ...child,
                children: getChildren(child, depth + 1)
            }));
        }
        return [];
    };

    // Apply the getChildren function to each root node
    tree.forEach(root => {
        root.children = getChildren(root);
    });

    return tree;
};