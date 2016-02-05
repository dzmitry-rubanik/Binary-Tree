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
                    !node.right ? node.right = currentNode : addNode(node.right);
                }
                if (currentNode.data < node.data) {
                    !node.left ? node.left = currentNode : addNode(node.left);
                }
            };
            addNode(this.root);
        }
    }

    contains(data) {
        var searchNode = function(node) {
            if (!node) return false;
            if (data === node.data) return true;
            if (data > node.data) return searchNode(node.right);
            if (data < node.data) return searchNode(node.left);
        };
        return(searchNode(this.root));
    }

    remove(data){
        if(this.contains(data)) {
            if(this.root.data === data){
                this.root = null;
                return;
            }
            var getMin = function (node) {
                if (!node.left) return node;
                return getMin(node.left);
            };
            var deleteMin = function (node) {
                if (node.left == null) return node.right;
                node.left = deleteMin(node.left);
                return node;
            };
            var deleteNode = function (node, data) {
                if (!node) return null;
                if (node.data > data) node.left = deleteNode(node.left, data);
                else if (node.data < data) node.right = deleteNode(node.right, data);
                else {
                    if (!node.right) return node.left;
                    if (!node.left) return node.right;
                    var temp = node;
                    node = getMin(temp.right);
                    node.right = deleteMin(temp.right);
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
            count += countLeft + countRight;
        };
        countSize(this.root);
        return count;
    }

    isEmpty() {
        return this.root === null ? true : false;
    }
}
