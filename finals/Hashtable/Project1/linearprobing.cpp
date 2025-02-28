#include<iostream>
using namespace std;
class hashtable {
	int size;
	int *table;
public:
	hashtable(int size)
	{
		this->size = size;
		table = new int[size];

		for (int i = 0; i < size; i++)
		{
			table[i] = -1;
		}

	}

	int find_hash(int key)
	{
		return (key % size);
	}
	void inseert_linear(int value)
	{
		int index = find_hash(value);
		int start = index;
		while (table[index] != -1)
		{
			index = (index + 1) % size;
			if (index == start)
			{
				cout << "Table is full" << endl;
				break;
			}
		}
		table[index] = value;

	}

	void search(int key)
	{
		int index = find_hash(key);
		int start = index;


		while (table[index] != -1)
		{
			if (table[index] == key)
			{
				cout << "Value found..!" << endl;
				return;
			}
			index = (index + 1) % size;
			if (index == start)
			{
				break;
			}

		}
		cout << "Value not found..!" << endl;
		return;




	}



	void display()
	{
		cout << "The array is:";
		for (int i = 0; i < size; i++)
		{
			cout << table[i] << " ";
		}
		cout << endl;

	}

};

int main()
{
	hashtable ht(5);

	ht.inseert_linear(20);
	ht.inseert_linear(7);
	ht.inseert_linear(15);
	ht.inseert_linear(5);
	ht.inseert_linear(18);

	ht.display();

	ht.search(30);

}
