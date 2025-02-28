//Saif-ur-Rehman
//L1S23BSSE0044

#include <iostream>
#include <stack>
using namespace std;

// Define the structure for the BST node
struct Node {
    int key;
    Node* left;
    Node* right;

    Node(int val) : key(val), left(nullptr), right(nullptr) {}
};

class BST {
private:
    Node* root;
    // Insert a key into the BST
    Node* insert(Node* root, int key) {
        if (!root) return new Node(key);

        if (key < root->key)
            root->left = insert(root->left, key);
        else if (key > root->key)
            root->right = insert(root->right, key);

        return root;
    }
    bool search(Node* root, int key)
    {
        if (!root) return false;

        if (key == root->key)
            return true;
        else if (key < root->key)
            return search(root->left, key);
        else
            return search(root->right, key);
    }
    Node* findMin(Node* root) {
        while (root && root->left)
            root = root->left;
        return root;
    }

    // Delete a node from the BST
    Node* deleteNode(Node* root, int key) {
        if (!root) return root;

        if (key < root->key)
            root->left = deleteNode(root->left, key);
        else if (key > root->key)
            root->right = deleteNode(root->right, key);
        else {
            // Node with one or no child
            if (!root->left) {
                Node* temp = root->right;
                delete root;
                return temp;
            }
            else if (!root->right) {
                Node* temp = root->left;
                delete root;
                return temp;
            }

            // Node with two children: Get the inorder successor
            Node* temp = findMin(root->right);
            root->key = temp->key;
            root->right = deleteNode(root->right, temp->key);
        }
        return root;
    }
    // Traversals
    void inorder(Node* root)
    {
        if (root) {
            inorder(root->left);
            cout << root->key << " ";
            inorder(root->right);
        }
    }
    void preorder(Node* root) {
        if (root) {
            cout << root->key << " ";
            preorder(root->left);
            preorder(root->right);
        }
    }
    void postorder(Node* root)
    {
        if (root) {
            postorder(root->left);
            postorder(root->right);
            cout << root->key << " ";
        }
    }

    int findk_th(Node* root, int& k)
    {
        if (root == nullptr) {
            return -1;
        }


        // Traverse the left subtree
        int leftResult = findk_th(root->left, k);
        if (leftResult != -1) 
        {
            return leftResult; 
        }

        // Process the current node
        k--;
        if (k == 0) 
        {
            return root->key; // k-th smallest found
        }

        // Traverse the right subtree
        return findk_th(root->right, k);
    }



   void range(Node*root,int low, int high, int& sum)
    {
        if (root == nullptr)
        {
            return ;
        }

        if (root->key < low)
        {
            range(root->right, low, high, sum);
        }

        if (root->key > high)
        {
            range(root->left, low, high, sum);
        }

        else 
        {
            sum = sum + root->key;
            range(root->left, low, high, sum);  
            range(root->right, low, high, sum);
        }

    }
   void countnode(Node* root, int& count)
   {
       if (root)
       {

           countnode(root->left, count);

           count++;

           countnode(root->right, count);
       }

   }
   void leaf(Node* root, int& sum)
   {
       if (root)
       {
           // Check if the current node is a leaf node
           if (root->left == nullptr && root->right == nullptr)
           {
               sum++; // Increment sum if it's a leaf node
           }

           // Traverse the left and right subtrees
           leaf(root->left, sum);
           leaf(root->right, sum);
       }
   }
   int absolute(int a, int b) {
       if (a > b)//a greater b 
       {
           return a - b;
       }
       else {//a smaller b
           return b - a;
       }
   }

   // Function to find the closest value in the BST
   int find_closest_value(Node* root, int target) {
       int closest = root->key; // Start with the root value as the closest

       while (root != nullptr) {
           // Update the closest value if the current node is closer to the target
           if (absolute(root->key, target) < absolute(closest, target)) {
               closest = root->key;
           }

           // Move to the left or right subtree based on the target
           if (target < root->key) {
               root = root->left;
           }
           else if (target > root->key) {
               root = root->right;
           }
           else {
               break; // Exact match found
           }
       }

       return closest;
   }

   void fullnodes(Node* root, int& count)
   {
       if (root)
       {
           if (root->left != nullptr && root->right != nullptr)
           {
               count++;
           }
           fullnodes(root->left, count);
           fullnodes(root->right, count);
       }
   }

   int findFloor(Node* root, int value) {
       int floor = -1; // Initialize floor to -1 (or any sentinel value)

       while (root) {
           if (root->key == value) {
               // If the current node's value equals the given value, return it
               return root->key;
           }
           else if (root->key < value) {
               // If the current node's value is less than the given value,
               // update floor and move to the right subtree to find a larger value
               floor = root->key;
               root = root->right;
           }
           else 
           {
               // If the current node's value is greater than the given value,
               // move to the left subtree to find a smaller value
               root = root->left;
           }
       }

       return floor; // Return the floor value (or -1 if no valid floor exists)
   }
   // Function to find the ceiling of a given value in the BST
   int findCeiling(Node* root, int value) {
       int ceiling = -1; 
       Node* current = root; 

       while (current) {
           if (current->key == value) {
               // If the current node's value matches the target, return it
               return current->key;
           }
           else if (current->key > value) {
               // If the current node's value is greater, update the ceiling
               ceiling = current->key;
               // Move to the left subtree to find a smaller value that still satisfies the condition
               current = current->left;
           }
           else {
               // If the current node's value is less, move to the right subtree
               current = current->right;
           }
       }

       // Return the ceiling value or -1 if no ceiling exists
       return ceiling;
   }
   bool isValidBST(Node* root) {
       std::stack<Node*> stack;
       Node* current = root;
       Node* prev = nullptr; // To keep track of the previous node

       while (current || !stack.empty()) {
           // Traverse to the leftmost node
           while (current) {
               stack.push(current);
               current = current->left;
           }

           // Process the current node
           current = stack.top();
           stack.pop();

           // Check if the current node's value is greater than the previous node's value
           if (prev && current->key <= prev->key) {
               return false; // Not a valid BST
           }

           prev = current; // Update the previous node
           current = current->right; // Move to the right subtree
       }

       return true; // The tree is a valid BST
   }
   int height(Node* node) {
       if (node == nullptr) {
           return 0;
       }
       int leftHeight = height(node->left);
       int rightHeight = height(node->right);
       return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
   }

   // Function to check if the tree is height-balanced
   bool isBalanced(Node* root) {
       if (root == nullptr) {
           return true; // An empty tree is balanced
       }

       int leftHeight = height(root->left);
       int rightHeight = height(root->right);

       // Check if the current node is balanced and recursively check subtrees
       if ((leftHeight - rightHeight > 1) || (rightHeight - leftHeight > 1)) {
           return false;
       }

       return isBalanced(root->left) && isBalanced(root->right);
   }
public:
    // Constructor
    BST() : root(nullptr) {}

    

    void insert(int key) {
        root = insert(root, key);
    }
  
    bool search(int key) {
        return search(root, key);
    }
    void deleteNode(int key) {
        root = deleteNode(root, key);
    }

    
    void kth_samllest(int val)
    {
        int res = findk_th(root, val);
        if (res <= -1)
        {
            cout << "not found" << endl;
        }
        else {
            cout << "Kth Smallest value is:" << res << endl;
        }
       

    }

    void sum_range(int low, int high)
    {
        int sum = 0;
        range(root, low, high, sum);

       cout << "The sum is:" << sum << endl;
    }



    void inorder() {
        inorder(root);
        cout << endl;
    }


    // Helper function to find the absolute difference
  

    void closest(int target)
    {
        int res = find_closest_value(root, target);

        cout << "The closest value to " << target << " is:" << res << endl;
    }

    void nodecounter()
    {
        int count = 0;

        countnode(root, count);

        cout << "The total number of nodes are:" << count << endl;
    }
    
    
    
    void countleaf()
    {
        int count = 0;
        leaf(root, count);
            cout << "The total number of Leaf nodes are:" << count << endl;
    }

    void countfullnodes()
    {
        int count = 0;
        fullnodes(root, count);
        cout << "The total number of Complete nodes are:" << count << endl;
    }
    void floor(int val)
    {
       int res= findFloor(root, val);
       cout << "The Floor is:" << res << endl;
    }
    void ceilling(int val)
    {
        int res = findCeiling(root, val);
        cout << "The Ceiling is:" << res << endl;
    }




 
    void checkbst()
    {

        if (isValidBST(root))
        {
            cout << "BST is valid" << endl;
        }
        else 
        {
            cout << "BST is Invalid" << endl;
        }


    }
    void checkbalance()
    {

        if (isBalanced(root))
        {
            cout << "BST is balanced" << endl;
        }
        else
        {
            cout << "BST is unbalanced" << endl;
        }


    }


   
    
};

// Main function to demonstrate the BST
int main() {
    BST bst;

    bst.insert(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(40);
    bst.insert(60);
    bst.insert(80);

    cout << "Inorder Traversal: ";
    bst.inorder();


    cout << endl;
    bst.sum_range(29, 50);
   // bst.kth_samllest(8);





   /* cout << "Preorder Traversal: ";
    bst.preorder();

    cout << "Postorder Traversal: ";
    bst.postorder();

    cout << "Search for 40: " << (bst.search(40) ? "Found" : "Not Found") << endl;

    cout << "Deleting 40" << endl;
    bst.deleteNode(40);

    cout << "Inorder Traversal after deletion: ";
    bst.inorder();*/

    return 0;
}
