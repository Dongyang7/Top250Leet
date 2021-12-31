class UnionFind {
  // assume there exists a graph with node from 1 to n
  constructor(n) {
    this.parent = Array(n + 1).fill(-1);
  }
  find(node) {
    if (parent[node] > 0) {
      this.parent[node] = find(this.parent[node]);
      return this.parent[node];
    }
    return node;
  }
  union(node1, node2) {
    let [root1, root2] = [find(node1), find(node2)];
    if (parent[root2] < parent[root1]) {
      parent[root2] += parent[root1];
      parent[root1] = root2;
    } else {
      parent[root1] += parent[root2];
      parent[root2] = root1;
    }
  }
}
