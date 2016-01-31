'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data){
		var currentNode = new Node(data);
		if (!this.root) {
			this.root = currentNode;
		} else {
			var addNode = function (node) {
				if (currentNode.data > node.data) {
					if (!node.right) {
						node.right = currentNode;
						return;
					} else addNode(node.right);
				} else if (currentNode.data < node.data) {
					if (!node.left) {
						node.left = currentNode;
						return;
					} else addNode(node.left);
				}
			};
            addNode(this.root);
		}
	}

	contains(data) {
		var searchNode = function(node) {
			if (!node) return false;
			if (data === node.data) {
				return true;
			} else if (data > node.data) {
				return searchNode(node.right);
			} else if (data < node.data) {
				return searchNode(node.left);
			}
		};
		return(searchNode(this.root));
	}

    remove(data){
        var temp ;
        if(this.contains(data)) {
            if(this.root.data === data){
                this.root = null;
                return;
            }
            var getNodeSize = function (node) {
                if (!node) return 0;
                return node.count;
            };
            var getMinNode = function (node) {
                if (!node.left) return node;
                return getMinNode(node.left);
            };

            var deleteMinNode = function (node) {
                if (node.left == null) return node.right;
                node.left = deleteMinNode(node.left);
                node.count = 1 + getNodeSize(node.left) + getNodeSize(node.right);
                return node;
            };

            var deleteNode = function (node, data) {
                if (!node) return null;
                if (node.data > data) node.left = deleteNode(node.left, data);
                else if (node.data < data) node.right = deleteNode(node.right, data);
                else {
                    if (!node.right) return node.left;
                    if (!node.left) return node.right;
                    temp = node;
                    node = getMinNode(temp.right);
                    node.right = deleteMinNode(temp.right);
                    node.left = temp.left;
                }
                return node;
            };
            deleteNode(this.root, data);
        }
    }

    size(){
        var count = 0,
            countLeft = 0,
            countRight = 0;

         var countSize = function(node) {
            if (!node) {return null}
            if(node.left) {
                countLeft++;
                countSize(node.left);
            }
            if(node.right){
                countRight++;
                countSize(node.right);
            }
            count = 1;
            count = count + countLeft + countRight;
        };
        countSize(this.root);
        //console.log(count);
        return count;
    }

	isEmpty() {
        if(this.root === null){
            return true;
        }else return false;
   	}
}

