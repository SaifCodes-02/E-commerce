#include <iostream>
using namespace std;

// Node structure for Linked List
struct Node {
    int data;
    Node* next;

    Node(int value) { // Constructor
        data = value;
        next = nullptr;
    }
};

// Hash Table class with Chaining
class HashTable {
private:
    int size; // Fixed hash table size
    Node** table; // Array of linked list pointers

public:
    // Constructor: Initialize all slots as empty (nullptr)
    HashTable(int size) 
    {
        this->size = size;
        table = new Node*[size];

        for (int i = 0; i < size; i++) {
            table[i] = nullptr;
        }
    }

    // Hash function
    int hashFunction(int key) {
        return key % size;
    }

    // Insert function with Chaining
    void insert(int key) 
    {
        int index = hashFunction(key);
        Node* newnode = new Node(key);
        if (table[index] == nullptr)
        {
            table[index] = newnode;
        }
        else
        {
            Node* temp = table[index];

            while (temp->next != nullptr)
            {
                temp = temp->next;
            }
            temp->next = newnode;


        }
        
    }

    // Search function
    bool search(int key)
    {
        int index = hashFunction(key);
        Node* temp = table[index];

        while (temp->next != nullptr)
        {

            if (temp->data == key)
            {
                cout << "Found..!" << endl;
                return;
            }
            temp = temp->next;
        }
        cout << "Not found..!" << endl;
        return;




    }

    // Display function to print Hash Table
    void display() {
        for (int i = 0; i < size; i++) {
            cout << "Index " << i << ": ";
            Node* temp = table[i];

            if (temp == nullptr) {
                cout << "Empty" << endl;
                continue;
            }

            // Print linked list at each index
            while (temp != nullptr) {
                cout << temp->data << " -> ";
                temp = temp->next;
            }
            cout << "NULL" << endl;
        }
    }

    // Destructor to free memory
    ~HashTable() {
        for (int i = 0; i < size; i++) {
            Node* temp = table[i];
            while (temp != nullptr) {
                Node* toDelete = temp;
                temp = temp->next;
                delete toDelete;
            }
        }
    }
};

// Main function
int main() {
    HashTable ht(13);

    // Insert elements
    ht.insert(50);
    ht.insert(51);
    ht.insert(56);
    ht.insert(63);
    ht.insert(52);
    ht.insert(69);
    ht.insert(72);

    // Display Hash Table
    ht.display();

    // Search for elements
    cout << "Searching for 51: " << (ht.search(51) ? "Found" : "Not Found") << endl;
    cout << "Searching for 100: " << (ht.search(100) ? "Found" : "Not Found") << endl;

    return 0;
}
