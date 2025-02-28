
//Name: Saif-ur-Rehman
//Roll#: L1S23BSSE0044

#include <iostream>
#include <string>
using namespace std;

struct node {
    int id;
    string name;
    float price;
    int stock;
    string catoegory;
    node* left;
    node* right;

    node(int id, string name, float price, int stock, string catoegory)
        : id(id), name(name), price(price), stock(stock), catoegory(catoegory), left(nullptr), right(nullptr) {}
};

class bst {
    node* root;

    // Helper for insertion
    node* add(node* root, node* newproduct) {
        if (root == nullptr) {
            return newproduct;
        }

        if (newproduct->id < root->id) {
            root->left = add(root->left, newproduct);
        }
        else if (newproduct->id > root->id) {
            root->right = add(root->right, newproduct);
        }
        return root;
    }

    // Helper for printing in-order
    void inorder(node* root) {
        if (root) {
            inorder(root->left);

            cout << "Product ID:" << root->id << endl;
            cout << "Product Name:" << root->name << endl;
            cout << "Product Price: " << "Pkr." << root->price << "/-" << endl;
            cout << "Product Category:" << root->catoegory << endl;
            cout << "Product in Stock:" << root->stock << endl;
            cout << endl;

            inorder(root->right);
        }
    }

    // Helper for searching by product ID
    node* find(node* root, int id) {
        if (root == nullptr || root->id == id) {
            return root;
        }
        else if (id < root->id) {
            return find(root->left, id);
        }
        else {
            return find(root->right, id);
        }
    }

    // Display a single product
    void showsingle(node* root) {
        cout << "*-----Product Available-----*" << endl;
        cout << "Product ID:" << root->id << endl;
        cout << "Product Name:" << root->name << endl;
        cout << "Product Price: " << "Pkr." << root->price << "/-" << endl;
        cout << "Product Category:" << root->catoegory << endl;
        cout << "Product in Stock:" << root->stock << endl;
        cout << endl;
    }

    // Helper to find the smallest node in a subtree
    node* findMin(node* root) {
        while (root && root->left)
            root = root->left;
        return root;
    }

    // Helper for deletion
    node* del(node* root, int id) {
        if (root == nullptr) {
            return nullptr;
        }

        if (id < root->id) {
            root->left = del(root->left, id);
        }
        else if (id > root->id) {
            root->right = del(root->right, id);
        }
        else {
            // Node to be deleted found
            if (root->left == nullptr) {
                node* temp = root->right;
                delete root;
                cout << "*-----Product Removed-----*" << endl;
                return temp;
            }
            else if (root->right == nullptr) {
                node* temp = root->left;
                delete root;
                cout << "*-----Product Removed-----*" << endl;
                return temp;
            }
            else {
                node* temp = findMin(root->right);
                root->id = temp->id;
                root->name = temp->name;
                root->price = temp->price;
                root->stock = temp->stock;
                root->catoegory = temp->catoegory;
                root->right = del(root->right, temp->id);
            }
        }
        return root;
    }

    // Helper for filtering by category
    void Filter_category(node* root, string category) {
        if (root) {
            Filter_category(root->left, category);

            if (category == root->catoegory) {
                showsingle(root);
            }

            Filter_category(root->right, category);
        }
    }

    // Helper for filtering by price range
    void Filterrange(node* root, int low, int high, bool& found) {
        if (root == nullptr) {
            return;
        }

        Filterrange(root->left, low, high, found);

        if (root->price >= low && root->price <= high) {
            found = true;
            showsingle(root);
        }

        Filterrange(root->right, low, high, found);
    }

    node* findbyname(node* root, const string& name) {
        if (root) {
          
            if (root->name == name) {
                return root;
            }

           
            node* leftResult = findbyname(root->left, name);
            if (leftResult) return leftResult;

        
            return findbyname(root->right, name);
        }
        return nullptr;
    }

    
    void related(node* root, const string& P_name, const string& cat) {
        if (root == nullptr) {
            return;
        }

       
        if (root->name == P_name) {
            showsingle(root);
        }

        
        if (root->catoegory == cat && root->name != P_name) {
            showsingle(root); 
        }

    
        related(root->left, P_name, cat);
        related(root->right, P_name, cat);
    }

public:
    bst() : root(nullptr) {}

    
    void prnt() {
        inorder(root);
    }

   
    void insert(int id, string name, float price, int stock, string catoegory) {
        node* existingProduct = find(root, id);

        if (existingProduct) {
            
            existingProduct->stock += stock;
            if (existingProduct->stock < 0) {
                existingProduct->stock = 0;
            }
            cout << "*-----Product already exists stock updated-----*" << endl;
        }
        else {
         
            node* newnode = new node(id, name, price, stock, catoegory);
            root = add(root, newnode);
        }
    }

 
    void search(int id) {
        node* newnode = find(root, id);
        if (newnode) {
            showsingle(newnode);
        }
        else {
            cout << "Product not available" << endl;
        }
    }

   
    void remove(int id) {
        root = del(root, id);
    }

    
    void updateStock(int id, int quantity) {
        node* targetNode = find(root, id);
        if (targetNode) {
            targetNode->stock += quantity;
            if (targetNode->stock < 0) {
                targetNode->stock = 0;
            }
            cout << "*-----Stock Updated-----*" << endl;
            showsingle(targetNode);
        }
        else {
            cout << "Product not available" << endl;
        }
    }

   
    void FindCategory(string category) {
        Filter_category(root, category);
    }


    void FindRange(int low, int high) {
        bool found = false;
        Filterrange(root, low, high, found);

        if (!found) {
            cout << "No products found in the price range [" << low << ", " << high << "]." << endl;
        }
    }

   
    void FindRelated(string name, string cat) {
        related(root, name, cat);
    }

   
    void searchAndDisplayRelated(const string& P_name, const string& cat) {
        node* target = findbyname(root, P_name); 

        if (target) {
           
            related(root, P_name, cat);
        }
        else {
           
            cout << "Product not found by name. Displaying products from the category: " << cat << endl;
            related(root, "", cat); 
        }
    }
};

int main() {
    bst tree;
    tree.insert(2201, "Mobile", 42000, 10, "Gadgets");
    tree.insert(2202, "Laptop", 50000, 17, "Gadgets");
    tree.insert(2203, "iPad", 20000, 30, "Gadgets");
  tree.insert(2204, "Machines", 15000, 4, "Electronics");
   tree.insert(2205, "Refrigerators", 70000, 9, "Electronics");
    tree.insert(2206, "Lamps", 1800, 28, "Home Decor");
    tree.insert(2207, "ACs", 90000, 55, "Electronics");
    tree.insert(2208, "Jackets", 2000, 100, "Clothing");
    tree.insert(2209, "Cupboards", 25000, 76, "Home Decor");
    tree.insert(2210, "Mirrors", 5000, 66, "Home Decor");
    tree.insert(2211, "Pants", 1000, 10, "Clothing");
    tree.insert(2212, "Shirts", 1200, 50, "Clothing");

    

   

   // tree.prnt();
    //tree.remove(2203);
   // tree.prnt();
    //tree.search(2208);

    //tree.FindRange(1200, 5000);

    //tree.FindCategory("Clothing");
  // tree.updateStock(2211, 12);
   
   //tree.searchAndDisplayRelated("Mobile", "Gadgets");  

    return 0;
}
