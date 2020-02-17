var isValidBST = function(root) {
    const helper = (node, lower, upper) => {
        if (node === null) return true
        const l = node.left
        const r = node.right
        const val = node.val
        if (val <= lower || val >= upper)
            return false
        return helper(l, lower, val) && helper(r, val, upper)
    }
    return helper(root, -Number.MAX_VALUE, Number.MAX_VALUE)
};
/* 虽然是DFS/递归的应用，但里面这个最大最小数值的夹逼逻辑有点双指针的味道了，
记得要灵活运用啊*/