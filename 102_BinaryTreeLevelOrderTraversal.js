var levelOrder = function(root) {
    if (root === null) return []
    let newLevelArr = [root]
    const resArr = [[root.val]]
    while (newLevelArr.length !== 0) {
        const newArr = []
        const resNewArr = []
        for (let i=0; i< newLevelArr.length; i+=1) {
            let node = newLevelArr[i]
            if(node.left) {
                newArr.push(node.left)
                resNewArr.push(node.left.val)
            }
            if(node.right){
                newArr.push(node.right)
                resNewArr.push(node.right.val)
            }
        }
        newLevelArr = newArr
        if (resNewArr.length !==0) resArr.push(resNewArr)
    }
    return resArr
};
/* 很直白的BFS，BFS经常用到的结构就是while loop，判断条件在本题中就是当前层是否还存在节点，
有些题目比如迷宫最短路径问题中就是当前层是否含有终点。也可以用queue代替arr存储当前层的node，但arr实现更方便 */