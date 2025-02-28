#include<iostream>
using namespace std;

struct node
{
	int value;
	node* left;
	node* right;

	node(int value) : value(value), left(nullptr), right(nullptr){}

};
class bst
{
	node* root;

public:

	bst():root(nullptr){}

	node* insertnode(node *root,int data)
	{
		if (root == nullptr)
		{
			return new node(data);
		}
	if (data < root->value)
		{
			root->left = insertnode(root->left, data);
		}
	else if (data > root->value)
	{
		root->right = insertnode(root->right, data);
	}

	return root;

	}

	void insert(int data)
	{
		root = insertnode(root, data);

	}

	void inorder(node* root) {
		if (root) {
			inorder(root->left);
			cout << root->value << " ";
			inorder(root->right);
		}
	}

	void prnt() {
		inorder(root);
		cout << endl;
	}
	bool search(node* root, int target)
	{

		if (root==nullptr)
		{
			return 0;
		}
		 else if (root->value== target)
		{
			return 1;
		}
		 else if (target < root->value)
		{
			return search(root->left, target);
		}
		else if (target > root->value)
		{
			return search(root->right, target);
		}

	}

	void find(int target)
	{
		if (search(root, target) == true)
		{
			cout << "Found" << endl;
		}
		else
		{
			cout << "not present" << endl;
		}

	}


	node* deletenode(node* root, int target)
	{
		if (root == nullptr)
		{
			return root;

		}

		else if(target<root->value)
		{
			root->left = deletenode(root->left, target);

		}
		else if (target > root->value)
		{
			root->right = deletenode(root->right, target);

		}
		else
		{
			if (!root->left)
			{
				node* temp = root->right;
				delete root;
				return temp;
			}
			else if (!root->right)
			{
				node* temp = root->left;
				delete root;
				return temp;

			}
			else {

			}


		}


	}

};
int main()
{


	bst tree1;

	tree1.insert(60);
	tree1.insert(33);
	tree1.insert(34);
	tree1.insert(90);
	tree1.insert(75);
	tree1.insert(2);
	tree1.insert(21);
	tree1.insert(21);


	tree1.prnt();


	tree1.find(2);
	tree1.find(90);
	tree1.find(102);
	tree1.find(222);


}



